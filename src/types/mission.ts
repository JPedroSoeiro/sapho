export type MissionType =
  | 'Resgate Aeromédico'
  | 'Patrulhamento'
  | 'Transporte'
  | 'Combate a Incêndio'
  | 'Treinamento'
  | 'Manutenção/Teste'
  | 'Outro';

export const MISSION_TYPES: MissionType[] = [
  'Resgate Aeromédico',
  'Patrulhamento',
  'Transporte',
  'Combate a Incêndio',
  'Treinamento',
  'Manutenção/Teste',
  'Outro',
];

export interface HelicopterMission {
  id: string;
  aircraftId: string;
  title: string;
  date: Date;
  durationHours: number;
  missionType: MissionType;
  pilotInCommand: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
