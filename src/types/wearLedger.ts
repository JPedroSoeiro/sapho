/**
 * Registro append-only de cada contribuição de desgaste aplicada a uma peça
 * por uma missão específica. Cada criação/edição/exclusão de missão gera uma
 * entrada (positiva ao somar horas, negativa ao reverter), preservando o
 * histórico completo em vez de apenas o saldo final — permite responder
 * "por que esta peça está em WARNING?" apontando as missões responsáveis.
 */
export interface WearLedgerEntry {
  id: string;
  partId: string;
  missionId: string;
  missionTitle: string;
  /** Horas aplicadas a currentFlightHours nesta entrada (durationDelta × wearFactor). Negativo = reversão. */
  hoursApplied: number;
  wearFactor: number;
  appliedAt: Date;
}
