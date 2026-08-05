// Dados reais de peças para cada modelo de helicóptero da frota SAPHO

export const REAL_PARTS_BY_AIRCRAFT = {
  'as350-monoturbina': [
    // Motor Turbomeca
    { name: 'Motor Turbomeca Arriel 1D2', serialPrefix: 'ARR-1D2', category: 'Motor', tbo: 2400, maxDays: 2555 },
    { name: 'Compressor Motor Arriel', serialPrefix: 'COMP-ARR', category: 'Motor', tbo: 2400, maxDays: 2555 },
    { name: 'Turbina Motor Arriel', serialPrefix: 'TURB-ARR', category: 'Motor', tbo: 2400, maxDays: 2555 },

    // Rotor Principal
    { name: 'Pá do Rotor Principal AS350', serialPrefix: 'PAL-AS350', category: 'Rotor Principal', tbo: 3000, maxDays: 3650 },
    { name: 'Cubo Rotor Principal', serialPrefix: 'HUB-AS350', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
    { name: 'Mastro do Rotor', serialPrefix: 'MAST-AS350', category: 'Rotor Principal', tbo: 4500, maxDays: 5475 },

    // Rotor de Cauda (Fenestron)
    { name: 'Rotor Fenestron AS350', serialPrefix: 'FEN-AS350', category: 'Rotor de Cauda', tbo: 2500, maxDays: 3650 },
    { name: 'Motor Fenestron', serialPrefix: 'MOT-FEN', category: 'Rotor de Cauda', tbo: 2500, maxDays: 3650 },

    // Transmissão
    { name: 'Caixa de Transmissão Principal AS350', serialPrefix: 'GBX-AS350', category: 'Transmissão', tbo: 3500, maxDays: 4380 },
    { name: 'Óleo de Transmissão (Mobil Aerohydro)', serialPrefix: 'OIL-AERO', category: 'Consumíveis', tbo: 250, maxDays: 365 },

    // Sistema Hidráulico
    { name: 'Bomba Hidráulica Principal', serialPrefix: 'PUMP-HYD', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },
    { name: 'Filtro Hidráulico', serialPrefix: 'FILT-HYD', category: 'Filtros', tbo: 300, maxDays: 365 },

    // Elétrico
    { name: 'Alternador Starter 28V', serialPrefix: 'ALT-28V', category: 'Elétrico', tbo: 2500, maxDays: 3650 },
    { name: 'Bateria Auxiliar 28V', serialPrefix: 'BAT-28V', category: 'Elétrico', tbo: 1000, maxDays: 1825 },
  ],

  'biturbina': [
    // Motores (x2)
    { name: 'Motor Turbomeca Arriel 1P2 (Port)', serialPrefix: 'ARR-1P2-L', category: 'Motor', tbo: 3000, maxDays: 3650 },
    { name: 'Motor Turbomeca Arriel 1P2 (Starboard)', serialPrefix: 'ARR-1P2-R', category: 'Motor', tbo: 3000, maxDays: 3650 },
    { name: 'Compressor Motor Arriel 1P2', serialPrefix: 'COMP-1P2', category: 'Motor', tbo: 3000, maxDays: 3650 },
    { name: 'Turbina Motor Arriel 1P2', serialPrefix: 'TURB-1P2', category: 'Motor', tbo: 3000, maxDays: 3650 },

    // Rotor Principal
    { name: 'Pá do Rotor Principal EC135/H135', serialPrefix: 'PAL-EC135', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
    { name: 'Cubo Rotor Principal EC135/H135', serialPrefix: 'HUB-EC135', category: 'Rotor Principal', tbo: 4000, maxDays: 4745 },
    { name: 'Mastro do Rotor EC135/H135', serialPrefix: 'MAST-EC135', category: 'Rotor Principal', tbo: 5000, maxDays: 5840 },
    { name: 'Swashplate Duplo', serialPrefix: 'SWASH-DUP', category: 'Rotor Principal', tbo: 2500, maxDays: 3650 },

    // Rotor de Cauda (Fenestron)
    { name: 'Rotor Fenestron EC135/H135', serialPrefix: 'FEN-EC135', category: 'Rotor de Cauda', tbo: 3000, maxDays: 3650 },
    { name: 'Motor Fenestron EC135/H135', serialPrefix: 'MOT-FEN-EC', category: 'Rotor de Cauda', tbo: 3000, maxDays: 3650 },

    // Transmissão
    { name: 'Caixa de Transmissão Principal EC135/H135', serialPrefix: 'GBX-EC135', category: 'Transmissão', tbo: 4000, maxDays: 4745 },
    { name: 'Transmissão Intermediária', serialPrefix: 'GBX-INT', category: 'Transmissão', tbo: 3500, maxDays: 4380 },
    { name: 'Óleo de Transmissão Sintético', serialPrefix: 'OIL-SYNT', category: 'Consumíveis', tbo: 250, maxDays: 365 },

    // Sistema Hidráulico (Redundante)
    { name: 'Bomba Hidráulica Sistema A', serialPrefix: 'PUMP-HYD-A', category: 'Sistema Hidráulico', tbo: 3500, maxDays: 4380 },
    { name: 'Bomba Hidráulica Sistema B', serialPrefix: 'PUMP-HYD-B', category: 'Sistema Hidráulico', tbo: 3500, maxDays: 4380 },
    { name: 'Filtro Hidráulico Sistema A', serialPrefix: 'FILT-HYD-A', category: 'Filtros', tbo: 300, maxDays: 365 },
    { name: 'Filtro Hidráulico Sistema B', serialPrefix: 'FILT-HYD-B', category: 'Filtros', tbo: 300, maxDays: 365 },

    // Elétrico
    { name: 'Alternador Duplo 28V', serialPrefix: 'ALT-28V-DUP', category: 'Elétrico', tbo: 3000, maxDays: 3650 },
    { name: 'Bateria Principal 28V', serialPrefix: 'BAT-MAIN', category: 'Elétrico', tbo: 1200, maxDays: 1825 },
    { name: 'Bateria Auxiliar 28V', serialPrefix: 'BAT-AUX', category: 'Elétrico', tbo: 1200, maxDays: 1825 },

    // Aviônicos
    { name: 'Glass Cockpit Avionics Suite', serialPrefix: 'GC-AVON', category: 'Aviônicos', tbo: 5000, maxDays: 5840 },
    { name: 'Sistema AFCS (Auto Flight)', serialPrefix: 'AFCS', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },
  ],
};

export const EC145_SPECIFIC_PARTS = [
  // Partes adicionais específicas para EC145 C2
  { name: 'Pá do Rotor EC145 C2 (Maior)', serialPrefix: 'PAL-EC145', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
  { name: 'Transmissão Principal Reforçada EC145', serialPrefix: 'GBX-EC145', category: 'Transmissão', tbo: 4200, maxDays: 5110 },
  { name: 'Sistema de Refrigeração Aumentado', serialPrefix: 'COOL-EC145', category: 'Sistema de Refrigeração', tbo: 3000, maxDays: 3650 },
  { name: 'Trem de Pouso Duplo (EC145)', serialPrefix: 'LG-EC145', category: 'Trem de Pouso', tbo: 2500, maxDays: 3650 },
];
