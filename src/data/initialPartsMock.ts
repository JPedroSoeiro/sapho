import { HelicopterPart } from '@/types/part';

export const INITIAL_PARTS_MOCK: HelicopterPart[] = [
  // ============================================
  // ROTOR PRINCIPAL
  // ============================================
  {
    id: 'part-001',
    name: 'PÃ¡ do Rotor Principal (Pala)',
    serialNumber: 'PR-PAL-8829-A',
    category: 'Rotor Principal',
    aircraftId: 'ac-001',
    installDate: new Date('2023-06-15'),
    maxLifespanDays: 1460, // 4 anos
    currentFlightHours: 1250,
    maxFlightHoursTBO: 2000,
    status: 'OK',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-002',
    name: 'PÃ¡ do Rotor Principal (Pala)',
    serialNumber: 'PR-PAL-8830-B',
    category: 'Rotor Principal',
    aircraftId: 'ac-001',
    installDate: new Date('2023-06-15'),
    maxLifespanDays: 1460,
    currentFlightHours: 1280,
    maxFlightHoursTBO: 2000,
    status: 'OK',
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-003',
    name: 'Cubo do Rotor (Hub)',
    serialNumber: 'RT-HUB-1204-C',
    category: 'Rotor Principal',
    aircraftId: 'ac-001',
    installDate: new Date('2022-03-20'),
    maxLifespanDays: 2555, // 7 anos
    currentFlightHours: 2840,
    maxFlightHoursTBO: 3500,
    status: 'WARNING',
    createdAt: new Date('2022-03-20'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-004',
    name: 'Mastro do Rotor (Eje del Rotor)',
    serialNumber: 'RT-MST-5601-D',
    category: 'Rotor Principal',
    aircraftId: 'ac-001',
    installDate: new Date('2020-11-10'),
    maxLifespanDays: 2920, // 8 anos
    currentFlightHours: 4120,
    maxFlightHoursTBO: 4500,
    status: 'CRITICAL_AOG',
    createdAt: new Date('2020-11-10'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-005',
    name: 'Prato Oscilante (Swashplate)',
    serialNumber: 'SW-SWP-1049-C',
    category: 'Rotor Principal',
    aircraftId: 'ac-001',
    installDate: new Date('2024-01-08'),
    maxLifespanDays: 730, // 2 anos
    currentFlightHours: 480,
    maxFlightHoursTBO: 1000,
    status: 'OK',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-006',
    name: 'Haste de Controle do Ã‚ngulo de Ataque',
    serialNumber: 'CT-HST-3301-B',
    category: 'Rotor Principal',
    aircraftId: 'ac-001',
    installDate: new Date('2024-02-15'),
    maxLifespanDays: 1000,
    currentFlightHours: 620,
    maxFlightHoursTBO: 1500,
    status: 'OK',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-007',
    name: 'DobradiÃ§as de Batimento (Bisagras)',
    serialNumber: 'RT-DOB-7744-E',
    category: 'Rotor Principal',
    aircraftId: 'ac-001',
    installDate: new Date('2023-08-22'),
    maxLifespanDays: 1095, // 3 anos
    currentFlightHours: 1180,
    maxFlightHoursTBO: 1500,
    status: 'WARNING',
    createdAt: new Date('2023-08-22'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-008',
    name: 'Barra de EstabilizaÃ§Ã£o (Barra Estabilizadora)',
    serialNumber: 'ST-BAR-2208-F',
    category: 'Rotor Principal',
    aircraftId: 'ac-001',
    installDate: new Date('2024-04-10'),
    maxLifespanDays: 1825, // 5 anos
    currentFlightHours: 340,
    maxFlightHoursTBO: 2000,
    status: 'OK',
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-08-04'),
  },

  // ============================================
  // MOTOR E TRANSMISSÃƒO
  // ============================================
  {
    id: 'part-009',
    name: 'Turbina / Motor Principal',
    serialNumber: 'ENG-TRB-9901-X',
    category: 'MotorizaÃ§Ã£o',
    installDate: new Date('2023-02-01'),
    maxLifespanDays: 2555, // 7 anos
    currentFlightHours: 1890,
    maxFlightHoursTBO: 3000,
    status: 'OK',
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-010',
    name: 'Carenagem do Motor',
    serialNumber: 'ENG-CAR-4412-G',
    category: 'MotorizaÃ§Ã£o',
    aircraftId: 'ac-001',
    installDate: new Date('2024-05-18'),
    maxLifespanDays: 1460, // 4 anos
    currentFlightHours: 280,
    maxFlightHoursTBO: 2000,
    status: 'OK',
    createdAt: new Date('2024-05-18'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-011',
    name: 'Caixa de TransmissÃ£o Principal',
    serialNumber: 'TR-GBX-1156-H',
    category: 'TransmissÃ£o',
    aircraftId: 'ac-001',
    installDate: new Date('2021-09-12'),
    maxLifespanDays: 2555, // 7 anos
    currentFlightHours: 3420,
    maxFlightHoursTBO: 3500,
    status: 'CRITICAL_AOG',
    createdAt: new Date('2021-09-12'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-012',
    name: 'Ã“leo HidrÃ¡ulico / Sistema HidrÃ¡ulico',
    serialNumber: 'HYD-OLE-7890-I',
    category: 'Sistemas HidrÃ¡ulicos',
    aircraftId: 'ac-001',
    installDate: new Date('2024-07-01'),
    maxLifespanDays: 180, // 6 meses
    currentFlightHours: 120,
    maxFlightHoursTBO: 300,
    status: 'OK',
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-08-04'),
  },

  // ============================================
  // ROTOR DE CAUDA E TRANSMISSÃƒO
  // ============================================
  {
    id: 'part-013',
    name: 'Eixo de TransmissÃ£o do Rotor de Cauda',
    serialNumber: 'TR-EIX-2256-J',
    category: 'TransmissÃ£o e Cauda',
    aircraftId: 'ac-002',
    installDate: new Date('2022-11-25'),
    maxLifespanDays: 1825, // 5 anos
    currentFlightHours: 2650,
    maxFlightHoursTBO: 3200,
    status: 'WARNING',
    createdAt: new Date('2022-11-25'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-014',
    name: 'Caixa de TransmissÃ£o 45Â° (Rotor de Cauda)',
    serialNumber: 'TR-45-3367-K',
    category: 'TransmissÃ£o e Cauda',
    aircraftId: 'ac-002',
    installDate: new Date('2023-07-08'),
    maxLifespanDays: 1095, // 3 anos
    currentFlightHours: 1720,
    maxFlightHoursTBO: 2000,
    status: 'OK',
    createdAt: new Date('2023-07-08'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-015',
    name: 'Caixa de TransmissÃ£o 90Â° (Rotor de Cauda)',
    serialNumber: 'TR-90-4412-L',
    category: 'TransmissÃ£o e Cauda',
    aircraftId: 'ac-002',
    installDate: new Date('2023-02-01'),
    maxLifespanDays: 1095, // 3 anos
    currentFlightHours: 2180,
    maxFlightHoursTBO: 2200,
    status: 'CRITICAL_AOG',
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-016',
    name: 'Rotor de Cauda (Rotor Antipar)',
    serialNumber: 'TC-ROT-5523-M',
    category: 'TransmissÃ£o e Cauda',
    aircraftId: 'ac-002',
    installDate: new Date('2024-03-14'),
    maxLifespanDays: 1825, // 5 anos
    currentFlightHours: 560,
    maxFlightHoursTBO: 2500,
    status: 'OK',
    createdAt: new Date('2024-03-14'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-017',
    name: 'PÃ¡ do Rotor de Cauda',
    serialNumber: 'TC-PAL-6634-N',
    category: 'TransmissÃ£o e Cauda',
    aircraftId: 'ac-002',
    installDate: new Date('2023-10-20'),
    maxLifespanDays: 1460, // 4 anos
    currentFlightHours: 1340,
    maxFlightHoursTBO: 2000,
    status: 'OK',
    createdAt: new Date('2023-10-20'),
    updatedAt: new Date('2024-08-04'),
  },

  // ============================================
  // ESTRUTURA DA CAUDA
  // ============================================
  {
    id: 'part-018',
    name: 'Estrutura da Cauda / Cone de Cauda',
    serialNumber: 'TC-STR-7745-O',
    category: 'Cauda e Fuselagem',
    installDate: new Date('2021-05-10'),
    maxLifespanDays: 3650, // 10 anos
    currentFlightHours: 4890,
    maxFlightHoursTBO: 6000,
    status: 'OK',
    createdAt: new Date('2021-05-10'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-019',
    name: 'Deriva Vertical / Aleta',
    serialNumber: 'TC-DER-8856-P',
    category: 'Cauda e Fuselagem',
    installDate: new Date('2023-12-05'),
    maxLifespanDays: 2555, // 7 anos
    currentFlightHours: 890,
    maxFlightHoursTBO: 3000,
    status: 'OK',
    createdAt: new Date('2023-12-05'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-020',
    name: 'Estabilizador Horizontal',
    serialNumber: 'TC-EST-9967-Q',
    category: 'Cauda e Fuselagem',
    aircraftId: 'ac-002',
    installDate: new Date('2024-01-22'),
    maxLifespanDays: 1825, // 5 anos
    currentFlightHours: 420,
    maxFlightHoursTBO: 2500,
    status: 'OK',
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-021',
    name: 'Patim de ProteÃ§Ã£o da Cauda (PatÃ­n de Cauda)',
    serialNumber: 'TC-PAT-1078-R',
    category: 'Cauda e Fuselagem',
    aircraftId: 'ac-002',
    installDate: new Date('2023-09-11'),
    maxLifespanDays: 730, // 2 anos
    currentFlightHours: 1150,
    maxFlightHoursTBO: 1500,
    status: 'WARNING',
    createdAt: new Date('2023-09-11'),
    updatedAt: new Date('2024-08-04'),
  },

  // ============================================
  // FUSELAGEM E ESTRUTURA
  // ============================================
  {
    id: 'part-022',
    name: 'Fuselagem Principal',
    serialNumber: 'FUS-MAIN-2189-S',
    category: 'Fuselagem',
    aircraftId: 'ac-003',
    installDate: new Date('2020-06-15'),
    maxLifespanDays: 3650, // 10 anos
    currentFlightHours: 5200,
    maxFlightHoursTBO: 8000,
    status: 'OK',
    createdAt: new Date('2020-06-15'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-023',
    name: 'Cabine de Comando (Cockpit)',
    serialNumber: 'FUS-CAB-3300-T',
    category: 'Fuselagem',
    aircraftId: 'ac-003',
    installDate: new Date('2023-04-18'),
    maxLifespanDays: 2555, // 7 anos
    currentFlightHours: 1680,
    maxFlightHoursTBO: 3000,
    status: 'OK',
    createdAt: new Date('2023-04-18'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-024',
    name: 'Portas da Cabine',
    serialNumber: 'FUS-PRT-4411-U',
    category: 'Fuselagem',
    aircraftId: 'ac-003',
    installDate: new Date('2024-02-28'),
    maxLifespanDays: 1825, // 5 anos
    currentFlightHours: 340,
    maxFlightHoursTBO: 2000,
    status: 'OK',
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-08-04'),
  },

  // ============================================
  // TREM DE POUSO
  // ============================================
  {
    id: 'part-025',
    name: 'Patins de Aterragem (Trem de Pouso)',
    serialNumber: 'LG-PAT-5522-V',
    category: 'Trem de Pouso',
    aircraftId: 'ac-003',
    installDate: new Date('2023-08-05'),
    maxLifespanDays: 1460, // 4 anos
    currentFlightHours: 1520,
    maxFlightHoursTBO: 2000,
    status: 'WARNING',
    createdAt: new Date('2023-08-05'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-026',
    name: 'Amortecedor do Trem de Pouso',
    serialNumber: 'LG-AMS-6633-W',
    category: 'Trem de Pouso',
    aircraftId: 'ac-003',
    installDate: new Date('2024-06-12'),
    maxLifespanDays: 1095, // 3 anos
    currentFlightHours: 280,
    maxFlightHoursTBO: 1500,
    status: 'OK',
    createdAt: new Date('2024-06-12'),
    updatedAt: new Date('2024-08-04'),
  },

  // ============================================
  // CONTROLES E SISTEMAS
  // ============================================
  {
    id: 'part-027',
    name: 'Pedal do Leme (Anti-torque Pedals)',
    serialNumber: 'CT-PED-7744-X',
    category: 'Controles de Voo',
    aircraftId: 'ac-004',
    installDate: new Date('2023-11-14'),
    maxLifespanDays: 1825, // 5 anos
    currentFlightHours: 1080,
    maxFlightHoursTBO: 2500,
    status: 'OK',
    createdAt: new Date('2023-11-14'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-028',
    name: 'Conjunto de Cabos de Comando',
    serialNumber: 'CT-CBL-8855-Y',
    category: 'Controles de Voo',
    aircraftId: 'ac-004',
    installDate: new Date('2024-03-20'),
    maxLifespanDays: 730, // 2 anos
    currentFlightHours: 520,
    maxFlightHoursTBO: 1000,
    status: 'OK',
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-08-04'),
  },

  // ============================================
  // SISTEMA ELÃ‰TRICO E AVIÃ”NICOS
  // ============================================
  {
    id: 'part-029',
    name: 'Bateria Principal (28V DC)',
    serialNumber: 'BAT-MAIN-9966-Z',
    category: 'ElÃ©trico',
    installDate: new Date('2024-04-05'),
    maxLifespanDays: 730, // 2 anos
    currentFlightHours: 380,
    maxFlightHoursTBO: 1000,
    status: 'OK',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-030',
    name: 'Alternador Principal',
    serialNumber: 'ALT-MAIN-1107-AA',
    category: 'ElÃ©trico',
    aircraftId: 'ac-004',
    installDate: new Date('2023-07-10'),
    maxLifespanDays: 1825, // 5 anos
    currentFlightHours: 1450,
    maxFlightHoursTBO: 2500,
    status: 'OK',
    createdAt: new Date('2023-07-10'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-031',
    name: 'GiroscÃ³pio / Sistema de NavegaÃ§Ã£o Inercial',
    serialNumber: 'AVN-GYR-2218-AB',
    category: 'AviÃ´nicos',
    aircraftId: 'ac-004',
    installDate: new Date('2023-01-30'),
    maxLifespanDays: 2555, // 7 anos
    currentFlightHours: 2240,
    maxFlightHoursTBO: 3500,
    status: 'OK',
    createdAt: new Date('2023-01-30'),
    updatedAt: new Date('2024-08-04'),
  },

  // ============================================
  // COMPONENTES MENORES E CONSUMÃVEIS
  // ============================================
  {
    id: 'part-032',
    name: 'Filtro de Ar do Motor',
    serialNumber: 'FLT-AIR-3329-AC',
    category: 'Filtros e ConsumÃ­veis',
    aircraftId: 'ac-005',
    installDate: new Date('2024-07-15'),
    maxLifespanDays: 180, // 6 meses
    currentFlightHours: 85,
    maxFlightHoursTBO: 200,
    status: 'OK',
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-033',
    name: 'Filtro HidrÃ¡ulico',
    serialNumber: 'FLT-HYD-4440-AD',
    category: 'Filtros e ConsumÃ­veis',
    aircraftId: 'ac-005',
    installDate: new Date('2024-06-20'),
    maxLifespanDays: 365, // 1 ano
    currentFlightHours: 320,
    maxFlightHoursTBO: 500,
    status: 'OK',
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-034',
    name: 'Parafusos de FixaÃ§Ã£o (Kit 1000 unidades)',
    serialNumber: 'HW-BLT-5551-AE',
    category: 'Hardware',
    aircraftId: 'ac-005',
    installDate: new Date('2024-05-10'),
    maxLifespanDays: 730, // 2 anos
    currentFlightHours: 450,
    maxFlightHoursTBO: 1000,
    status: 'OK',
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-08-04'),
  },
  {
    id: 'part-035',
    name: 'VedaÃ§Ãµes e O-rings (Kit Sortido)',
    serialNumber: 'HW-SEAL-6662-AF',
    category: 'Hardware',
    aircraftId: 'ac-005',
    installDate: new Date('2024-04-01'),
    maxLifespanDays: 365, // 1 ano
    currentFlightHours: 220,
    maxFlightHoursTBO: 500,
    status: 'OK',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-08-04'),
  },
];

