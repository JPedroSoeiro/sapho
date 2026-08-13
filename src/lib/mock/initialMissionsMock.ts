import { HelicopterMission, MissionType, MISSION_TYPES } from '@/types/mission';
import { INITIAL_AIRCRAFT_MOCK } from './initialAircraftMock';

const MISSION_TITLES_BY_TYPE: Record<MissionType, string[]> = {
  'Resgate Aeromédico': ['Resgate Aeromédico - Zona Rural', 'Remoção de Paciente Crítico', 'Resgate em Rodovia'],
  Patrulhamento: ['Patrulhamento Perímetro Urbano', 'Patrulhamento de Fronteira', 'Sobrevoo de Reconhecimento'],
  Transporte: ['Transporte de Autoridades', 'Transporte de Equipe Técnica', 'Transporte de Carga Leve'],
  'Combate a Incêndio': ['Combate a Incêndio Florestal', 'Apoio a Brigada de Incêndio'],
  Treinamento: ['Treinamento de Pouso Noturno', 'Treinamento de Autorrotação', 'Treinamento de Formação'],
  'Manutenção/Teste': ['Voo de Teste Pós-Manutenção', 'Checagem de Sistemas em Voo'],
  Outro: ['Missão Especial', 'Apoio a Evento Institucional'],
};

const PILOTS = [
  'Cap. Ricardo Alves',
  'Cap. Fernanda Souza',
  'Ten. Marcos Lima',
  'Maj. Juliana Costa',
  'Cap. Bruno Martins',
  'Ten. Camila Rocha',
  'Cap. André Pereira',
  'Maj. Patrícia Gomes',
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateMissionsForAircraft(aircraftId: string, count: number, startCounter: number): HelicopterMission[] {
  const missions: HelicopterMission[] = [];

  for (let i = 0; i < count; i++) {
    const missionType = randomItem(MISSION_TYPES);
    const title = randomItem(MISSION_TITLES_BY_TYPE[missionType]);
    const daysAgo = Math.floor(Math.random() * 180) + 1;
    const date = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    const durationHours = Number((Math.random() * 4 + 0.5).toFixed(1));

    missions.push({
      id: `mission-${String(startCounter + i).padStart(4, '0')}`,
      aircraftId,
      title,
      date,
      durationHours,
      missionType,
      pilotInCommand: randomItem(PILOTS),
      notes: '',
      createdAt: date,
      updatedAt: date,
    });
  }

  return missions;
}

function generateAllMissions(): HelicopterMission[] {
  let counter = 1;
  const all: HelicopterMission[] = [];

  for (const aircraft of INITIAL_AIRCRAFT_MOCK) {
    const count = Math.floor(Math.random() * 5) + 3; // 3 a 7 missões por aeronave
    const missions = generateMissionsForAircraft(aircraft.id, count, counter);
    counter += count;
    all.push(...missions);
  }

  return all.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export const INITIAL_MISSIONS_MOCK: HelicopterMission[] = generateAllMissions();
