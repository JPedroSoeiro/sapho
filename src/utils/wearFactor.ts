import { HelicopterPart } from '@/types/part';

/**
 * Fator de estresse/fricção por hora de voo, conforme a categoria do componente.
 * Peças de rotor sofrem fadiga cíclica e vibração contínua (desgaste acelerado);
 * peças estruturais dependem muito mais de ciclos de pouso e tempo calendário
 * do que de horas de voo em si.
 */
export const WEAR_FACTOR_HIGH_STRESS = 1.2; // Rotor principal / carga cíclica
export const WEAR_FACTOR_TRANSMISSION = 1.1; // Transmissão e rotor de cauda
export const WEAR_FACTOR_ENGINE = 1.0; // Motor / turbina
export const WEAR_FACTOR_STRUCTURE = 0.15; // Fuselagem / trem de pouso
export const WEAR_FACTOR_DEFAULT = 1.0; // Demais sistemas (hidráulico, elétrico, aviônicos, etc.)

const HIGH_STRESS_CATEGORIES = new Set(['Rotor Principal']);
const TRANSMISSION_TAIL_CATEGORIES = new Set(['Transmissão', 'Rotor de Cauda']);
const ENGINE_CATEGORIES = new Set(['Motor']);
const STRUCTURE_CATEGORIES = new Set(['Fuselagem', 'Trem de Pouso']);

/**
 * Deriva o fator de desgaste a partir da categoria da peça, para componentes
 * do mock que ainda não possuem `wearFactor` explícito.
 */
export function inferWearFactor(category: string): number {
  if (HIGH_STRESS_CATEGORIES.has(category)) return WEAR_FACTOR_HIGH_STRESS;
  if (TRANSMISSION_TAIL_CATEGORIES.has(category)) return WEAR_FACTOR_TRANSMISSION;
  if (ENGINE_CATEGORIES.has(category)) return WEAR_FACTOR_ENGINE;
  if (STRUCTURE_CATEGORIES.has(category)) return WEAR_FACTOR_STRUCTURE;
  return WEAR_FACTOR_DEFAULT;
}

/**
 * Fator de desgaste efetivo da peça: usa o valor explícito quando definido,
 * caso contrário infere a partir da categoria.
 */
export function getPartWearFactor(part: Pick<HelicopterPart, 'wearFactor' | 'category'>): number {
  return part.wearFactor ?? inferWearFactor(part.category);
}
