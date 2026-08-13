import { Aircraft } from '@/types/aircraft';

export const INITIAL_AIRCRAFT_MOCK: Aircraft[] = [
  // AS350 B2 - Monoturbina
  {
    id: 'ac-001',
    name: 'AS350 B2 - 01',
    registration: 'PT-HBM',
    model: 'Airbus AS350 B2 (Esquilo)',
    manufacturingYear: 2015,
    operationalStatus: 'active',
    totalFlightHours: 4200,
    lastMaintenanceDate: new Date('2024-07-20'),
    createdAt: new Date('2015-08-20'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'ac-002',
    name: 'AS350 B2 - 02',
    registration: 'PT-HBN',
    model: 'Airbus AS350 B2 (Esquilo)',
    manufacturingYear: 2017,
    operationalStatus: 'active',
    totalFlightHours: 3150,
    lastMaintenanceDate: new Date('2024-08-01'),
    createdAt: new Date('2017-03-10'),
    updatedAt: new Date('2024-08-04'),
  },

  // EC130 B4 - Monoturbina
  {
    id: 'ac-003',
    name: 'EC130 B4',
    registration: 'PT-HBO',
    model: 'Airbus EC130 B4',
    manufacturingYear: 2018,
    operationalStatus: 'active',
    totalFlightHours: 2890,
    lastMaintenanceDate: new Date('2024-07-15'),
    createdAt: new Date('2018-11-05'),
    updatedAt: new Date('2024-08-04'),
  },

  // EC135 P2+ - Biturbina
  {
    id: 'ac-004',
    name: 'EC135 P2+',
    registration: 'PT-HBP',
    model: 'Airbus EC135 P2+ (Biturbina)',
    manufacturingYear: 2016,
    operationalStatus: 'active',
    totalFlightHours: 5200,
    lastMaintenanceDate: new Date('2024-07-10'),
    createdAt: new Date('2016-09-15'),
    updatedAt: new Date('2024-08-04'),
  },

  // H135 - Biturbina (01)
  {
    id: 'ac-005',
    name: 'H135 - 01',
    registration: 'PT-HBQ',
    model: 'Airbus H135 (Biturbina)',
    manufacturingYear: 2019,
    operationalStatus: 'active',
    totalFlightHours: 1820,
    lastMaintenanceDate: new Date('2024-07-25'),
    createdAt: new Date('2019-05-22'),
    updatedAt: new Date('2024-08-04'),
  },

  // H135 - Biturbina (02)
  {
    id: 'ac-006',
    name: 'H135 - 02',
    registration: 'PT-HBR',
    model: 'Airbus H135 (Biturbina)',
    manufacturingYear: 2020,
    operationalStatus: 'active',
    totalFlightHours: 1450,
    lastMaintenanceDate: new Date('2024-08-02'),
    createdAt: new Date('2020-06-18'),
    updatedAt: new Date('2024-08-04'),
  },

  // EC145 C2 - Biturbina (01)
  {
    id: 'ac-007',
    name: 'EC145 C2 - 01',
    registration: 'PT-HBS',
    model: 'Airbus EC145 C2 (Biturbina)',
    manufacturingYear: 2014,
    operationalStatus: 'active',
    totalFlightHours: 6150,
    lastMaintenanceDate: new Date('2024-06-30'),
    createdAt: new Date('2014-12-10'),
    updatedAt: new Date('2024-08-04'),
  },

  // EC145 C2 - Biturbina (02)
  {
    id: 'ac-008',
    name: 'EC145 C2 - 02',
    registration: 'PT-HBT',
    model: 'Airbus EC145 C2 (Biturbina)',
    manufacturingYear: 2016,
    operationalStatus: 'maintenance',
    totalFlightHours: 4890,
    lastMaintenanceDate: new Date('2024-06-15'),
    createdAt: new Date('2016-04-08'),
    updatedAt: new Date('2024-08-04'),
  },

  // EC145 C2 - Biturbina (03)
  {
    id: 'ac-009',
    name: 'EC145 C2 - 03',
    registration: 'PT-HBU',
    model: 'Airbus EC145 C2 (Biturbina)',
    manufacturingYear: 2018,
    operationalStatus: 'active',
    totalFlightHours: 3720,
    lastMaintenanceDate: new Date('2024-07-20'),
    createdAt: new Date('2018-08-22'),
    updatedAt: new Date('2024-08-04'),
  },
];
