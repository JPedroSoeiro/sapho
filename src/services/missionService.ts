import { HelicopterMission } from '@/types/mission';
import { HelicopterPart } from '@/types/part';
import { WearLedgerEntry } from '@/types/wearLedger';
import { INITIAL_MISSIONS_MOCK } from '@/lib/mock/initialMissionsMock';
import { partService } from './partService';
import { getPartWearFactor } from '@/utils/wearFactor';
import { calculatePartStatus } from '@/utils/partStatus';

let missionsCache: HelicopterMission[] = [...INITIAL_MISSIONS_MOCK];
let nextId = INITIAL_MISSIONS_MOCK.length + 1;

let wearLedger: WearLedgerEntry[] = [];
let nextLedgerId = 1;

function sortByDateDesc(missions: HelicopterMission[]): HelicopterMission[] {
  return [...missions].sort((a, b) => b.date.getTime() - a.date.getTime());
}

interface MissionRef {
  id: string;
  title: string;
}

/**
 * Aplica um delta de horas (positivo ao criar/aumentar, negativo ao
 * editar-para-menos/deletar) a TODAS as peças da aeronave, ponderado pelo
 * wearFactor de cada uma, recalcula o status oficial de cada peça afetada,
 * e registra cada contribuição no ledger de desgaste (para rastreabilidade
 * peça↔missão).
 *
 * Delta positivo e negativo são simétricos por construção: deletar uma
 * missão sempre reverte exatamente o que sua criação havia aplicado.
 */
async function applyWearDelta(aircraftId: string, hoursDelta: number, mission: MissionRef): Promise<HelicopterPart[]> {
  if (hoursDelta === 0) return [];

  const aircraftParts = await partService.getByAircraft(aircraftId);
  const now = new Date();

  const updates = aircraftParts.map((part) => {
    const wearFactor = getPartWearFactor(part);
    const hoursApplied = hoursDelta * wearFactor;
    const newFlightHours = Math.max(0, part.currentFlightHours + hoursApplied);
    const newStatus = calculatePartStatus({
      installDate: part.installDate,
      maxLifespanDays: part.maxLifespanDays,
      currentFlightHours: newFlightHours,
      maxFlightHoursTBO: part.maxFlightHoursTBO,
    });

    wearLedger.push({
      id: `ledger-${String(nextLedgerId++).padStart(5, '0')}`,
      partId: part.id,
      missionId: mission.id,
      missionTitle: mission.title,
      hoursApplied: Number(hoursApplied.toFixed(2)),
      wearFactor,
      appliedAt: now,
    });

    return {
      id: part.id,
      data: {
        currentFlightHours: Number(newFlightHours.toFixed(2)),
        status: newStatus,
      },
    };
  });

  return partService.bulkUpdate(updates);
}

export const missionService = {
  async getAll(): Promise<HelicopterMission[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(sortByDateDesc(missionsCache)), 250);
    });
  },

  async getMissionsByAircraft(aircraftId: string): Promise<HelicopterMission[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const missions = sortByDateDesc(missionsCache.filter((m) => m.aircraftId === aircraftId));
        resolve(missions.map((m) => ({ ...m })));
      }, 250);
    });
  },

  /**
   * Histórico de contribuições de desgaste para uma peça específica, mais
   * recente primeiro — responde "quais missões causaram o estado atual
   * desta peça?". Só reflete missões criadas/editadas/deletadas nesta
   * sessão: o desgaste inicial dos dados mock não gera entradas no ledger.
   */
  async getWearContributionsForPart(partId: string): Promise<WearLedgerEntry[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const entries = wearLedger
          .filter((entry) => entry.partId === partId)
          .sort((a, b) => b.appliedAt.getTime() - a.appliedAt.getTime());
        resolve(entries.map((e) => ({ ...e })));
      }, 150);
    });
  },

  async createMission(
    data: Omit<HelicopterMission, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<{ mission: HelicopterMission; updatedParts: HelicopterPart[] }> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const now = new Date();
    const mission: HelicopterMission = {
      ...data,
      id: `mission-${String(nextId++).padStart(4, '0')}`,
      createdAt: now,
      updatedAt: now,
    };

    missionsCache.push(mission);

    const updatedParts = await applyWearDelta(mission.aircraftId, mission.durationHours, {
      id: mission.id,
      title: mission.title,
    });

    return { mission, updatedParts };
  },

  async updateMission(
    id: string,
    data: Partial<Omit<HelicopterMission, 'id' | 'createdAt'>>
  ): Promise<{ mission: HelicopterMission; updatedParts: HelicopterPart[] } | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const index = missionsCache.findIndex((m) => m.id === id);
    if (index === -1) return null;

    const previous = missionsCache[index];
    const updated: HelicopterMission = {
      ...previous,
      ...data,
      updatedAt: new Date(),
    };
    missionsCache[index] = updated;

    const missionRef = { id: updated.id, title: updated.title };
    let updatedParts: HelicopterPart[] = [];

    if (previous.aircraftId === updated.aircraftId) {
      // Mesma aeronave: aplica apenas a diferença de horas.
      const delta = updated.durationHours - previous.durationHours;
      updatedParts = await applyWearDelta(updated.aircraftId, delta, missionRef);
    } else {
      // Missão reatribuída a outra aeronave: reverte na antiga, aplica na nova.
      const reverted = await applyWearDelta(previous.aircraftId, -previous.durationHours, missionRef);
      const applied = await applyWearDelta(updated.aircraftId, updated.durationHours, missionRef);
      updatedParts = [...reverted, ...applied];
    }

    return { mission: updated, updatedParts };
  },

  async deleteMission(id: string): Promise<{ success: boolean; updatedParts: HelicopterPart[] }> {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const index = missionsCache.findIndex((m) => m.id === id);
    if (index === -1) return { success: false, updatedParts: [] };

    const [removed] = missionsCache.splice(index, 1);
    const updatedParts = await applyWearDelta(removed.aircraftId, -removed.durationHours, {
      id: removed.id,
      title: removed.title,
    });

    return { success: true, updatedParts };
  },

  async reset(): Promise<void> {
    missionsCache = [...INITIAL_MISSIONS_MOCK];
    nextId = INITIAL_MISSIONS_MOCK.length + 1;
    wearLedger = [];
    nextLedgerId = 1;
  },
};
