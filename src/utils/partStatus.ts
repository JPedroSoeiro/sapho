import { HelicopterPart, PartStatus } from '@/types/part';

type StatusInput = Pick<HelicopterPart, 'installDate' | 'maxLifespanDays' | 'currentFlightHours' | 'maxFlightHoursTBO'>;

/**
 * Calcula o status oficial da peça combinando as duas dimensões de desgaste:
 * horas de voo acumuladas (TBO) e tempo calendário desde a instalação.
 *
 * - CRITICAL_AOG: TBO estourado ou dias de vida útil esgotados (aeronave impedida de voar).
 * - WARNING: qualquer uma das dimensões atingiu 80% do limite.
 * - OK: caso contrário.
 */
export function calculatePartStatus(part: StatusInput): PartStatus {
  const today = new Date();
  const installDate = part.installDate instanceof Date ? part.installDate : new Date(part.installDate);

  const daysUsed = Math.floor((today.getTime() - installDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysRemaining = part.maxLifespanDays - daysUsed;

  const hoursPercentage = (part.currentFlightHours / part.maxFlightHoursTBO) * 100;
  const calendarPercentage = (daysUsed / part.maxLifespanDays) * 100;

  if (part.currentFlightHours >= part.maxFlightHoursTBO || daysRemaining <= 0) {
    return 'CRITICAL_AOG';
  }

  if (hoursPercentage >= 80 || calendarPercentage >= 80) {
    return 'WARNING';
  }

  return 'OK';
}
