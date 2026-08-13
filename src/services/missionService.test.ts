import { describe, it, expect, beforeEach } from 'vitest';
import { missionService } from './missionService';
import { partService } from './partService';
import { getPartWearFactor } from '@/utils/wearFactor';
import { calculatePartStatus } from '@/utils/partStatus';
import { HelicopterMission } from '@/types/mission';

const AIRCRAFT_ID = 'ac-001'; // PT-HBM

function buildMissionInput(
  overrides: Partial<Omit<HelicopterMission, 'id' | 'createdAt' | 'updatedAt'>> = {}
): Omit<HelicopterMission, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    aircraftId: AIRCRAFT_ID,
    title: 'Missão de Teste',
    date: new Date(),
    durationHours: 10,
    missionType: 'Treinamento',
    pilotInCommand: 'Piloto de Teste',
    notes: '',
    ...overrides,
  };
}

beforeEach(async () => {
  await partService.reset();
  await missionService.reset();
});

describe('missionService — motor de desgaste', () => {
  it('createMission soma horas ponderadas pelo wearFactor a todas as peças da aeronave', async () => {
    const before = await partService.getByAircraft(AIRCRAFT_ID);
    const rotor = before.find((p) => p.category === 'Rotor Principal')!;
    const fuselage = before.find((p) => p.category === 'Fuselagem')!;
    const motor = before.find((p) => p.category === 'Motor')!;

    const result = await missionService.createMission(buildMissionInput({ durationHours: 10 }));

    const rotorAfter = result.updatedParts.find((p) => p.id === rotor.id)!;
    const fuselageAfter = result.updatedParts.find((p) => p.id === fuselage.id)!;
    const motorAfter = result.updatedParts.find((p) => p.id === motor.id)!;

    expect(rotorAfter.currentFlightHours - rotor.currentFlightHours).toBeCloseTo(12, 2); // 10h × 1.2
    expect(fuselageAfter.currentFlightHours - fuselage.currentFlightHours).toBeCloseTo(1.5, 2); // 10h × 0.15
    expect(motorAfter.currentFlightHours - motor.currentFlightHours).toBeCloseTo(10, 2); // 10h × 1.0

    expect(rotorAfter.currentFlightHours - rotor.currentFlightHours).toBeGreaterThan(
      fuselageAfter.currentFlightHours - fuselage.currentFlightHours
    );
  });

  it('não afeta peças de outra aeronave', async () => {
    const otherBefore = await partService.getByAircraft('ac-002');

    const result = await missionService.createMission(buildMissionInput());

    const leaked = otherBefore.some((p) => result.updatedParts.some((u) => u.id === p.id));
    expect(leaked).toBe(false);
  });

  it('deleteMission reverte exatamente o delta aplicado por createMission', async () => {
    const before = await partService.getByAircraft(AIRCRAFT_ID);
    const target = before[0];

    const created = await missionService.createMission(buildMissionInput({ durationHours: 25 }));
    const deleteResult = await missionService.deleteMission(created.mission.id);

    expect(deleteResult.success).toBe(true);
    const targetAfterDelete = deleteResult.updatedParts.find((p) => p.id === target.id)!;
    expect(targetAfterDelete.currentFlightHours).toBeCloseTo(target.currentFlightHours, 2);
  });

  it('updateMission aplica apenas o delta entre a duração antiga e a nova', async () => {
    const created = await missionService.createMission(buildMissionInput({ durationHours: 10 }));
    const rotorAfterCreate = created.updatedParts.find((p) => p.category === 'Rotor Principal')!;
    const wf = getPartWearFactor(rotorAfterCreate);

    const updated = await missionService.updateMission(created.mission.id, { durationHours: 20 });
    const rotorAfterUpdate = updated!.updatedParts.find((p) => p.id === rotorAfterCreate.id)!;

    expect(rotorAfterUpdate.currentFlightHours - rotorAfterCreate.currentFlightHours).toBeCloseTo(10 * wf, 2);
  });

  it('força status para CRITICAL_AOG quando as horas ultrapassam o TBO', async () => {
    const before = await partService.getByAircraft(AIRCRAFT_ID);
    const rotor = before.find((p) => p.category === 'Rotor Principal')!;
    const wf = getPartWearFactor(rotor);
    const hoursNeeded = (rotor.maxFlightHoursTBO - rotor.currentFlightHours) / wf + 5;

    const result = await missionService.createMission(buildMissionInput({ durationHours: hoursNeeded }));
    const rotorAfter = result.updatedParts.find((p) => p.id === rotor.id)!;

    expect(rotorAfter.currentFlightHours).toBeGreaterThanOrEqual(rotorAfter.maxFlightHoursTBO);
    expect(rotorAfter.status).toBe('CRITICAL_AOG');
  });

  it('o status persistido de toda peça afetada bate com calculatePartStatus', async () => {
    const result = await missionService.createMission(buildMissionInput({ durationHours: 50 }));

    for (const part of result.updatedParts) {
      expect(part.status).toBe(calculatePartStatus(part));
    }
  });

  it('updateMission reatribuindo a missão para outra aeronave reverte na antiga e aplica na nova', async () => {
    const before1 = await partService.getByAircraft(AIRCRAFT_ID);
    const target1 = before1[0];
    const before2 = await partService.getByAircraft('ac-002');
    const target2 = before2[0];

    const created = await missionService.createMission(buildMissionInput({ durationHours: 10 }));

    const updated = await missionService.updateMission(created.mission.id, {
      aircraftId: 'ac-002',
      durationHours: 10,
    });

    const target1After = updated!.updatedParts.find((p) => p.id === target1.id)!;
    const target2After = updated!.updatedParts.find((p) => p.id === target2.id)!;

    expect(target1After.currentFlightHours).toBeCloseTo(target1.currentFlightHours, 2);
    expect(target2After.currentFlightHours).toBeGreaterThan(target2.currentFlightHours);
  });
});

describe('missionService — ledger de desgaste (rastreabilidade peça↔missão)', () => {
  it('registra uma entrada de ledger por peça ao criar uma missão', async () => {
    const before = await partService.getByAircraft(AIRCRAFT_ID);
    const target = before[0];
    const wf = getPartWearFactor(target);

    const created = await missionService.createMission(
      buildMissionInput({ title: 'Missão Rastreável', durationHours: 8 })
    );

    const ledger = await missionService.getWearContributionsForPart(target.id);
    expect(ledger).toHaveLength(1);
    expect(ledger[0].missionId).toBe(created.mission.id);
    expect(ledger[0].missionTitle).toBe('Missão Rastreável');
    expect(ledger[0].hoursApplied).toBeCloseTo(8 * wf, 2);
  });

  it('deletar a missão soma uma entrada de reversão, preservando a entrada original (histórico não é apagado)', async () => {
    const before = await partService.getByAircraft(AIRCRAFT_ID);
    const target = before[0];

    const created = await missionService.createMission(buildMissionInput({ durationHours: 8 }));
    await missionService.deleteMission(created.mission.id);

    const ledger = await missionService.getWearContributionsForPart(target.id);
    expect(ledger).toHaveLength(2);

    const sum = ledger.reduce((acc, e) => acc + e.hoursApplied, 0);
    expect(sum).toBeCloseTo(0, 2);
  });

  it('editar a duração soma uma nova entrada com o delta, sem substituir a anterior', async () => {
    const before = await partService.getByAircraft(AIRCRAFT_ID);
    const target = before[0];
    const wf = getPartWearFactor(target);

    const created = await missionService.createMission(buildMissionInput({ durationHours: 10 }));
    await missionService.updateMission(created.mission.id, { durationHours: 15 });

    const ledger = await missionService.getWearContributionsForPart(target.id);
    expect(ledger).toHaveLength(2);
    expect(ledger.some((e) => Math.abs(e.hoursApplied - 10 * wf) < 0.05)).toBe(true);
    expect(ledger.some((e) => Math.abs(e.hoursApplied - 5 * wf) < 0.05)).toBe(true);
  });

  it('não mistura contribuições de peças diferentes', async () => {
    const before = await partService.getByAircraft(AIRCRAFT_ID);
    const [partA, partB] = before;

    await missionService.createMission(buildMissionInput({ durationHours: 10 }));

    const ledgerA = await missionService.getWearContributionsForPart(partA.id);
    const ledgerB = await missionService.getWearContributionsForPart(partB.id);

    expect(ledgerA.length).toBeGreaterThan(0);
    expect(ledgerA.every((e) => e.partId === partA.id)).toBe(true);
    expect(ledgerB.every((e) => e.partId === partB.id)).toBe(true);
  });

  it('peça sem nenhuma missão registrada nesta sessão retorna histórico vazio', async () => {
    const before = await partService.getByAircraft(AIRCRAFT_ID);
    const ledger = await missionService.getWearContributionsForPart(before[0].id);
    expect(ledger).toEqual([]);
  });
});
