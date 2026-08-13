import { describe, it, expect } from 'vitest';
import {
  inferWearFactor,
  getPartWearFactor,
  WEAR_FACTOR_HIGH_STRESS,
  WEAR_FACTOR_TRANSMISSION,
  WEAR_FACTOR_ENGINE,
  WEAR_FACTOR_STRUCTURE,
  WEAR_FACTOR_DEFAULT,
} from './wearFactor';

describe('inferWearFactor', () => {
  it('atribui 1.2x para Rotor Principal (alta fricção / carga cíclica)', () => {
    expect(inferWearFactor('Rotor Principal')).toBe(WEAR_FACTOR_HIGH_STRESS);
    expect(inferWearFactor('Rotor Principal')).toBe(1.2);
  });

  it('atribui 1.1x para Transmissão e Rotor de Cauda', () => {
    expect(inferWearFactor('Transmissão')).toBe(WEAR_FACTOR_TRANSMISSION);
    expect(inferWearFactor('Rotor de Cauda')).toBe(WEAR_FACTOR_TRANSMISSION);
    expect(inferWearFactor('Transmissão')).toBe(1.1);
  });

  it('atribui 1.0x para Motor', () => {
    expect(inferWearFactor('Motor')).toBe(WEAR_FACTOR_ENGINE);
    expect(inferWearFactor('Motor')).toBe(1.0);
  });

  it('atribui 0.15x para Fuselagem e Trem de Pouso', () => {
    expect(inferWearFactor('Fuselagem')).toBe(WEAR_FACTOR_STRUCTURE);
    expect(inferWearFactor('Trem de Pouso')).toBe(WEAR_FACTOR_STRUCTURE);
    expect(inferWearFactor('Fuselagem')).toBe(0.15);
  });

  it('atribui 1.0x (padrão) para categorias não mapeadas explicitamente', () => {
    expect(inferWearFactor('Sistema Hidráulico')).toBe(WEAR_FACTOR_DEFAULT);
    expect(inferWearFactor('Elétrico')).toBe(WEAR_FACTOR_DEFAULT);
    expect(inferWearFactor('Aviônicos')).toBe(WEAR_FACTOR_DEFAULT);
    expect(inferWearFactor('Categoria Inexistente')).toBe(1.0);
  });

  it('nunca retorna um fator que faça uma peça estrutural desgastar mais rápido que o rotor', () => {
    expect(inferWearFactor('Fuselagem')).toBeLessThan(inferWearFactor('Rotor Principal'));
  });
});

describe('getPartWearFactor', () => {
  it('usa o wearFactor explícito da peça quando definido, ignorando a categoria', () => {
    const part = { category: 'Fuselagem', wearFactor: 2.5 };
    expect(getPartWearFactor(part)).toBe(2.5);
  });

  it('cai para inferWearFactor(category) quando wearFactor é undefined', () => {
    const part = { category: 'Rotor Principal', wearFactor: undefined };
    expect(getPartWearFactor(part)).toBe(1.2);
  });

  it('cai para inferWearFactor(category) quando wearFactor não está presente no objeto', () => {
    const part = { category: 'Motor' };
    expect(getPartWearFactor(part)).toBe(1.0);
  });
});
