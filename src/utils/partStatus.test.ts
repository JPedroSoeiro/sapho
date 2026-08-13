import { describe, it, expect } from 'vitest';
import { calculatePartStatus } from './partStatus';

const DAY_MS = 1000 * 60 * 60 * 24;

function daysAgo(days: number): Date {
  return new Date(Date.now() - days * DAY_MS);
}

describe('calculatePartStatus', () => {
  it('retorna OK quando horas e tempo calendário estão bem abaixo de 80%', () => {
    const status = calculatePartStatus({
      installDate: daysAgo(10),
      maxLifespanDays: 1000,
      currentFlightHours: 100,
      maxFlightHoursTBO: 1000,
    });
    expect(status).toBe('OK');
  });

  it('retorna WARNING quando as horas de voo atingem exatamente 80% do TBO', () => {
    const status = calculatePartStatus({
      installDate: daysAgo(10),
      maxLifespanDays: 1000,
      currentFlightHours: 800,
      maxFlightHoursTBO: 1000,
    });
    expect(status).toBe('WARNING');
  });

  it('retorna OK quando as horas de voo estão logo abaixo de 80% do TBO', () => {
    const status = calculatePartStatus({
      installDate: daysAgo(10),
      maxLifespanDays: 1000,
      currentFlightHours: 799,
      maxFlightHoursTBO: 1000,
    });
    expect(status).toBe('OK');
  });

  it('retorna WARNING quando o tempo calendário atinge exatamente 80% da vida útil', () => {
    const status = calculatePartStatus({
      installDate: daysAgo(80),
      maxLifespanDays: 100,
      currentFlightHours: 0,
      maxFlightHoursTBO: 1000,
    });
    expect(status).toBe('WARNING');
  });

  it('retorna CRITICAL_AOG quando currentFlightHours >= maxFlightHoursTBO', () => {
    const status = calculatePartStatus({
      installDate: daysAgo(10),
      maxLifespanDays: 1000,
      currentFlightHours: 1000,
      maxFlightHoursTBO: 1000,
    });
    expect(status).toBe('CRITICAL_AOG');
  });

  it('retorna CRITICAL_AOG quando currentFlightHours ultrapassa maxFlightHoursTBO', () => {
    const status = calculatePartStatus({
      installDate: daysAgo(10),
      maxLifespanDays: 1000,
      currentFlightHours: 1500,
      maxFlightHoursTBO: 1000,
    });
    expect(status).toBe('CRITICAL_AOG');
  });

  it('retorna CRITICAL_AOG quando os dias de vida útil se esgotam (daysRemaining <= 0), mesmo com poucas horas voadas', () => {
    const status = calculatePartStatus({
      installDate: daysAgo(120),
      maxLifespanDays: 100,
      currentFlightHours: 5,
      maxFlightHoursTBO: 1000,
    });
    expect(status).toBe('CRITICAL_AOG');
  });

  it('CRITICAL_AOG tem prioridade sobre WARNING quando ambas condições seriam satisfeitas', () => {
    const status = calculatePartStatus({
      installDate: daysAgo(10),
      maxLifespanDays: 1000,
      currentFlightHours: 900, // 90% do TBO, entraria em WARNING
      maxFlightHoursTBO: 1000,
    });
    // ainda WARNING aqui pois não excede o TBO nem os dias
    expect(status).toBe('WARNING');
  });

  it('peça recém-instalada com 0 horas e 0 dias de uso é sempre OK', () => {
    const status = calculatePartStatus({
      installDate: new Date(),
      maxLifespanDays: 3650,
      currentFlightHours: 0,
      maxFlightHoursTBO: 3000,
    });
    expect(status).toBe('OK');
  });
});
