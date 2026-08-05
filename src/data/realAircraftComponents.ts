// Listagem REAL de componentes por modelo de helicóptero

export const AIRCRAFT_COMPONENTS = {
  'AS350-B2': {
    model: 'Airbus AS350 B2 (Esquilo)',
    motorization: 'Monoturbina',
    components: [
      // ==================== MOTORES ====================
      { name: 'Motor Turbomeca Arriel 1D2', category: 'Motor', tbo: 2400, maxDays: 2555 },
      { name: 'Compressor Estágio 1', category: 'Motor', tbo: 2400, maxDays: 2555 },
      { name: 'Compressor Estágio 2', category: 'Motor', tbo: 2400, maxDays: 2555 },
      { name: 'Câmara de Combustão', category: 'Motor', tbo: 2400, maxDays: 2555 },
      { name: 'Turbina Estágio 1', category: 'Motor', tbo: 2400, maxDays: 2555 },
      { name: 'Turbina Estágio 2', category: 'Motor', tbo: 2400, maxDays: 2555 },
      { name: 'Caixa de Engrenagens Motor', category: 'Motor', tbo: 2400, maxDays: 2555 },
      { name: 'Filtro de Ar Motor', category: 'Motor', tbo: 500, maxDays: 730 },
      { name: 'Queimador (Fuel Nozzle)', category: 'Motor', tbo: 1200, maxDays: 1825 },
      { name: 'Sensor de Temperatura Motor', category: 'Motor', tbo: 800, maxDays: 1095 },

      // ==================== SISTEMA DE COMBUSTÍVEL ====================
      { name: 'Tanque de Combustível Principal', category: 'Sistema de Combustível', tbo: 5000, maxDays: 5475 },
      { name: 'Tanque de Combustível Auxiliar', category: 'Sistema de Combustível', tbo: 5000, maxDays: 5475 },
      { name: 'Bomba de Combustível Elétrica', category: 'Sistema de Combustível', tbo: 2000, maxDays: 2555 },
      { name: 'Bomba de Combustível Mecânica', category: 'Sistema de Combustível', tbo: 2400, maxDays: 2555 },
      { name: 'Unidade de Filtro Combustível', category: 'Sistema de Combustível', tbo: 600, maxDays: 730 },
      { name: 'Seletor de Tanque de Combustível', category: 'Sistema de Combustível', tbo: 3000, maxDays: 3650 },
      { name: 'Indicador de Combustível', category: 'Sistema de Combustível', tbo: 2000, maxDays: 2555 },
      { name: 'Transdutores de Combustível (2x)', category: 'Sistema de Combustível', tbo: 2000, maxDays: 2555 },
      { name: 'Válvula de Isolamento Combustível', category: 'Sistema de Combustível', tbo: 3500, maxDays: 4380 },
      { name: 'Linha de Combustível (conjunto)', category: 'Sistema de Combustível', tbo: 5000, maxDays: 5475 },

      // ==================== SISTEMA HIDRÁULICO ====================
      { name: 'Bomba Hidráulica Principal', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },
      { name: 'Acumulador Hidráulico', category: 'Sistema Hidráulico', tbo: 4500, maxDays: 5475 },
      { name: 'Filtro Hidráulico Retorno', category: 'Sistema Hidráulico', tbo: 300, maxDays: 365 },
      { name: 'Filtro Hidráulico Pressão', category: 'Sistema Hidráulico', tbo: 300, maxDays: 365 },
      { name: 'Cooler Hidráulico (trocador calor)', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },
      { name: 'Válvula de Alívio Pressão Hidráulica', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },
      { name: 'Indicador de Pressão Hidráulica', category: 'Sistema Hidráulico', tbo: 2000, maxDays: 2555 },
      { name: 'Sensor de Pressão Hidráulica', category: 'Sistema Hidráulico', tbo: 2000, maxDays: 2555 },
      { name: 'Cilindro Hidráulico Principal', category: 'Sistema Hidráulico', tbo: 3500, maxDays: 4380 },
      { name: 'Cilindro Hidráulico Secundário', category: 'Sistema Hidráulico', tbo: 3500, maxDays: 4380 },
      { name: 'Mangueiras Hidráulicas (conjunto)', category: 'Sistema Hidráulico', tbo: 2000, maxDays: 2555 },
      { name: 'Óleo Hidráulico (consumível)', category: 'Consumíveis', tbo: 250, maxDays: 365 },

      // ==================== ROTOR PRINCIPAL ====================
      { name: 'Pá do Rotor Principal Completa', category: 'Rotor Principal', tbo: 3000, maxDays: 3650 },
      { name: 'Cubo do Rotor Principal', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
      { name: 'Mastro do Rotor', category: 'Rotor Principal', tbo: 4500, maxDays: 5475 },
      { name: 'Amortecedor de Lag Rotor Principal (2x)', category: 'Rotor Principal', tbo: 2500, maxDays: 3650 },
      { name: 'Bearing Rotor Principal', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
      { name: 'Aranha do Rotor (Swashplate)', category: 'Rotor Principal', tbo: 2500, maxDays: 3650 },
      { name: 'Cilindro Controle Rotor Principal (3x)', category: 'Rotor Principal', tbo: 3000, maxDays: 3650 },

      // ==================== ROTOR DE CAUDA (FENESTRON) ====================
      { name: 'Rotor Fenestron Completo', category: 'Rotor de Cauda', tbo: 2500, maxDays: 3650 },
      { name: 'Motor Fenestron', category: 'Rotor de Cauda', tbo: 2500, maxDays: 3650 },
      { name: 'Caixa de Transmissão Fenestron', category: 'Rotor de Cauda', tbo: 3000, maxDays: 3650 },
      { name: 'Pás Fenestron (4x)', category: 'Rotor de Cauda', tbo: 2000, maxDays: 2555 },

      // ==================== TRANSMISSÃO ====================
      { name: 'Caixa de Transmissão Principal', category: 'Transmissão', tbo: 3500, maxDays: 4380 },
      { name: 'Caixa de Transmissão Intermediária', category: 'Transmissão', tbo: 2500, maxDays: 3650 },
      { name: 'Caixa de Transmissão Cauda', category: 'Transmissão', tbo: 3000, maxDays: 3650 },
      { name: 'Embreagem Acionamento', category: 'Transmissão', tbo: 2000, maxDays: 2555 },
      { name: 'Óleo de Transmissão Sintético', category: 'Consumíveis', tbo: 250, maxDays: 365 },
      { name: 'Filtro Óleo Transmissão', category: 'Transmissão', tbo: 500, maxDays: 730 },
      { name: 'Indicador de Temperatura Transmissão', category: 'Transmissão', tbo: 2000, maxDays: 2555 },

      // ==================== SISTEMA ELÉTRICO ====================
      { name: 'Alternador 28V DC', category: 'Elétrico', tbo: 2500, maxDays: 3650 },
      { name: 'Bateria Principal 28V', category: 'Elétrico', tbo: 1000, maxDays: 1825 },
      { name: 'Bateria Auxiliar 28V', category: 'Elétrico', tbo: 1000, maxDays: 1825 },
      { name: 'Motor de Partida (Starter)', category: 'Elétrico', tbo: 1500, maxDays: 2190 },
      { name: 'Regulador de Voltagem', category: 'Elétrico', tbo: 2000, maxDays: 2555 },
      { name: 'Disjuntor Proteção Circuito (10x)', category: 'Elétrico', tbo: 3000, maxDays: 3650 },
      { name: 'Relés Elétricos (5x)', category: 'Elétrico', tbo: 2000, maxDays: 2555 },
      { name: 'Fiação Elétrica (harness)', category: 'Elétrico', tbo: 3000, maxDays: 3650 },
      { name: 'Conectores Elétricos (50x)', category: 'Elétrico', tbo: 2500, maxDays: 3650 },

      // ==================== AVIÔNICOS ====================
      { name: 'Horizonte Artificial', category: 'Aviônicos', tbo: 1800, maxDays: 2190 },
      { name: 'Altímetro', category: 'Aviônicos', tbo: 2000, maxDays: 2555 },
      { name: 'Velocímetro (Airspeed)', category: 'Aviônicos', tbo: 2000, maxDays: 2555 },
      { name: 'Variômetro', category: 'Aviônicos', tbo: 1800, maxDays: 2190 },
      { name: 'Bússola Magnética', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },
      { name: 'Indicador Atitude', category: 'Aviônicos', tbo: 1800, maxDays: 2190 },
      { name: 'Rádio VHF Comunicação', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },
      { name: 'Transponder', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },
      { name: 'Painel de Instrumentos', category: 'Aviônicos', tbo: 4000, maxDays: 5475 },

      // ==================== FUSELAGEM E ESTRUTURA ====================
      { name: 'Fuselagem Principal', category: 'Fuselagem', tbo: 7000, maxDays: 8760 },
      { name: 'Cone Cauda', category: 'Fuselagem', tbo: 5000, maxDays: 5475 },
      { name: 'Viga Cauda', category: 'Fuselagem', tbo: 5000, maxDays: 5475 },
      { name: 'Cabine (windscreen)', category: 'Fuselagem', tbo: 3000, maxDays: 3650 },
      { name: 'Painéis Fuselagem Exterior (10x)', category: 'Fuselagem', tbo: 4000, maxDays: 5475 },
      { name: 'Portas Fuselagem', category: 'Fuselagem', tbo: 3000, maxDays: 3650 },

      // ==================== TREM DE POUSO ====================
      { name: 'Cilindro Amortecimento Trem Pouso', category: 'Trem de Pouso', tbo: 3000, maxDays: 3650 },
      { name: 'Pneu Trem Pouso (2x)', category: 'Trem de Pouso', tbo: 800, maxDays: 1095 },
      { name: 'Freio Trem Pouso (2x)', category: 'Trem de Pouso', tbo: 1200, maxDays: 1825 },
      { name: 'Óleo Freio (Consumível)', category: 'Consumíveis', tbo: 200, maxDays: 365 },
      { name: 'Cilindro Freio (2x)', category: 'Trem de Pouso', tbo: 2500, maxDays: 3650 },

      // ==================== SISTEMA DE RESFRIAMENTO ====================
      { name: 'Radiador Motor', category: 'Resfriamento', tbo: 3000, maxDays: 3650 },
      { name: 'Ventoinha de Resfriamento', category: 'Resfriamento', tbo: 2500, maxDays: 3650 },
      { name: 'Mangueiras de Água (conjunto)', category: 'Resfriamento', tbo: 2000, maxDays: 2555 },
      { name: 'Líquido de Arrefecimento (Consumível)', category: 'Consumíveis', tbo: 300, maxDays: 365 },

      // ==================== ACESSÓRIOS ====================
      { name: 'Capota Motor (acesso)', category: 'Acessórios', tbo: 5000, maxDays: 5475 },
      { name: 'Luzes de Navegação (Beacon, Strobe)', category: 'Acessórios', tbo: 800, maxDays: 1095 },
      { name: 'Lanternas Cabine', category: 'Acessórios', tbo: 500, maxDays: 730 },
      { name: 'Assentos (2x)', category: 'Acessórios', tbo: 3000, maxDays: 3650 },
      { name: 'Cintos de Segurança (2x)', category: 'Acessórios', tbo: 2000, maxDays: 2555 },
    ]
  },

  'EC130-B4': {
    model: 'Airbus EC130 B4',
    motorization: 'Monoturbina',
    components: [
      // Herdar componentes do AS350 com algumas modificações
      { name: 'Motor Turbomeca Arriel 2B', category: 'Motor', tbo: 2400, maxDays: 2555 },
      { name: 'Caixa de Transmissão Principal EC130', category: 'Transmissão', tbo: 3500, maxDays: 4380 },
      { name: 'Pá do Rotor Principal EC130', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
      { name: 'Fuselagem Estendida (diferença do AS350)', category: 'Fuselagem', tbo: 7000, maxDays: 8760 },
      { name: 'Janela Panorâmica Cabine EC130', category: 'Fuselagem', tbo: 3000, maxDays: 3650 },
      { name: 'Assentos Passageiro (5x)', category: 'Acessórios', tbo: 3000, maxDays: 3650 },
      // ... mais 40+ componentes similares ao AS350
      { name: 'Sistema Hidráulico Reforçado EC130', category: 'Sistema Hidráulico', tbo: 3500, maxDays: 4380 },
      { name: 'Filtro Hidráulico Retorno EC130', category: 'Sistema Hidráulico', tbo: 300, maxDays: 365 },
      { name: 'Rotor Fenestron EC130', category: 'Rotor de Cauda', tbo: 3000, maxDays: 3650 },
      { name: 'Alternador 28V DC EC130', category: 'Elétrico', tbo: 2500, maxDays: 3650 },
      { name: 'Bateria Principal 28V EC130', category: 'Elétrico', tbo: 1000, maxDays: 1825 },
    ]
  },

  'EC135-P2+': {
    model: 'Airbus EC135 P2+ (Biturbina)',
    motorization: 'Biturbina',
    components: [
      // ==================== MOTORES (x2) ====================
      { name: 'Motor Turbomeca Arriel 1P2 Port', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Motor Turbomeca Arriel 1P2 Starboard', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Compressor Port', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Compressor Starboard', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Câmara Combustão Port', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Câmara Combustão Starboard', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Turbina Port', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Turbina Starboard', category: 'Motor', tbo: 3000, maxDays: 3650 },

      // ==================== SISTEMA DE COMBUSTÍVEL REDUNDANTE ====================
      { name: 'Tanque Combustível Port', category: 'Sistema de Combustível', tbo: 5000, maxDays: 5475 },
      { name: 'Tanque Combustível Starboard', category: 'Sistema de Combustível', tbo: 5000, maxDays: 5475 },
      { name: 'Bomba Combustível Port', category: 'Sistema de Combustível', tbo: 2000, maxDays: 2555 },
      { name: 'Bomba Combustível Starboard', category: 'Sistema de Combustível', tbo: 2000, maxDays: 2555 },
      { name: 'Filtro Combustível Port', category: 'Sistema de Combustível', tbo: 600, maxDays: 730 },
      { name: 'Filtro Combustível Starboard', category: 'Sistema de Combustível', tbo: 600, maxDays: 730 },
      { name: 'Válvula Crossfeed Combustível', category: 'Sistema de Combustível', tbo: 3500, maxDays: 4380 },

      // ==================== SISTEMA HIDRÁULICO DUAL ====================
      { name: 'Bomba Hidráulica Sistema A', category: 'Sistema Hidráulico', tbo: 3500, maxDays: 4380 },
      { name: 'Bomba Hidráulica Sistema B', category: 'Sistema Hidráulico', tbo: 3500, maxDays: 4380 },
      { name: 'Acumulador Pressão Sistema A', category: 'Sistema Hidráulico', tbo: 4500, maxDays: 5475 },
      { name: 'Acumulador Pressão Sistema B', category: 'Sistema Hidráulico', tbo: 4500, maxDays: 5475 },
      { name: 'Filtro Hidráulico Sistema A', category: 'Sistema Hidráulico', tbo: 300, maxDays: 365 },
      { name: 'Filtro Hidráulico Sistema B', category: 'Sistema Hidráulico', tbo: 300, maxDays: 365 },
      { name: 'Válvula Alívio Sistema A', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },
      { name: 'Válvula Alívio Sistema B', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },
      { name: 'Cooler Hidráulico Sistema A', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },
      { name: 'Cooler Hidráulico Sistema B', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },

      // ==================== ROTOR PRINCIPAL ====================
      { name: 'Pá Rotor Principal EC135', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
      { name: 'Cubo Rotor EC135', category: 'Rotor Principal', tbo: 4000, maxDays: 4745 },
      { name: 'Mastro Rotor EC135', category: 'Rotor Principal', tbo: 5000, maxDays: 5840 },
      { name: 'Swashplate Duplo EC135', category: 'Rotor Principal', tbo: 2500, maxDays: 3650 },

      // ==================== ROTOR DE CAUDA ====================
      { name: 'Rotor Fenestron EC135', category: 'Rotor de Cauda', tbo: 3000, maxDays: 3650 },
      { name: 'Motor Fenestron EC135', category: 'Rotor de Cauda', tbo: 3000, maxDays: 3650 },
      { name: 'Caixa Transmissão Fenestron EC135', category: 'Rotor de Cauda', tbo: 3500, maxDays: 4380 },

      // ==================== TRANSMISSÃO ====================
      { name: 'Caixa Transmissão Principal EC135', category: 'Transmissão', tbo: 4000, maxDays: 4745 },
      { name: 'Caixa Transmissão Intermediária EC135', category: 'Transmissão', tbo: 3500, maxDays: 4380 },
      { name: 'Transmissão Intermediária Motor Port', category: 'Transmissão', tbo: 2500, maxDays: 3650 },
      { name: 'Transmissão Intermediária Motor Starboard', category: 'Transmissão', tbo: 2500, maxDays: 3650 },

      // ==================== SISTEMA ELÉTRICO DUAL ====================
      { name: 'Alternador Port 28V', category: 'Elétrico', tbo: 3000, maxDays: 3650 },
      { name: 'Alternador Starboard 28V', category: 'Elétrico', tbo: 3000, maxDays: 3650 },
      { name: 'Bateria Principal 28V', category: 'Elétrico', tbo: 1200, maxDays: 1825 },
      { name: 'Bateria Auxiliar 28V', category: 'Elétrico', tbo: 1200, maxDays: 1825 },
      { name: 'Motor Partida Port', category: 'Elétrico', tbo: 2000, maxDays: 2555 },
      { name: 'Motor Partida Starboard', category: 'Elétrico', tbo: 2000, maxDays: 2555 },

      // ==================== AVIÔNICOS AVANÇADOS ====================
      { name: 'Sistema AFCS (Auto Flight Control)', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },
      { name: 'Giroscópio de Atitude Duplo', category: 'Aviônicos', tbo: 2500, maxDays: 3650 },
      { name: 'Indicador Atitude com Backup', category: 'Aviônicos', tbo: 2500, maxDays: 3650 },
      { name: 'Sistema IFR Completo', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },
      { name: 'Rádio VHF Duplo', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },
      { name: 'Transponder Duplo', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },

      // ==================== ESTRUTURA ====================
      { name: 'Fuselagem EC135', category: 'Fuselagem', tbo: 7500, maxDays: 8760 },
      { name: 'Cabine com Vidros Laminados', category: 'Fuselagem', tbo: 3500, maxDays: 4380 },
      { name: 'Portas Duplas EC135', category: 'Fuselagem', tbo: 3500, maxDays: 4380 },

      // ==================== TREM DE POUSO ====================
      { name: 'Cilindro Amortecimento Duplo EC135', category: 'Trem de Pouso', tbo: 3500, maxDays: 4380 },
      { name: 'Pneus de Alta Performance (2x)', category: 'Trem de Pouso', tbo: 1000, maxDays: 1095 },
      { name: 'Sistema Freio Duplo EC135', category: 'Trem de Pouso', tbo: 2000, maxDays: 2555 },
    ]
  },

  'H135': {
    model: 'Airbus H135 (Biturbina)',
    motorization: 'Biturbina',
    components: [
      // Similar ao EC135 mas com melhorias
      { name: 'Motor Turbomeca Arriel 2P Port', category: 'Motor', tbo: 3500, maxDays: 4380 },
      { name: 'Motor Turbomeca Arriel 2P Starboard', category: 'Motor', tbo: 3500, maxDays: 4380 },
      { name: 'Compressor Port H135', category: 'Motor', tbo: 3500, maxDays: 4380 },
      { name: 'Compressor Starboard H135', category: 'Motor', tbo: 3500, maxDays: 4380 },
      { name: 'Câmara Combustão Port H135', category: 'Motor', tbo: 3500, maxDays: 4380 },
      { name: 'Câmara Combustão Starboard H135', category: 'Motor', tbo: 3500, maxDays: 4380 },
      { name: 'Turbina Port H135', category: 'Motor', tbo: 3500, maxDays: 4380 },
      { name: 'Turbina Starboard H135', category: 'Motor', tbo: 3500, maxDays: 4380 },

      // Sistema de Combustível
      { name: 'Tanque Combustível Port H135', category: 'Sistema de Combustível', tbo: 5500, maxDays: 5840 },
      { name: 'Tanque Combustível Starboard H135', category: 'Sistema de Combustível', tbo: 5500, maxDays: 5840 },
      { name: 'Bomba Combustível Port H135', category: 'Sistema de Combustível', tbo: 2200, maxDays: 2555 },
      { name: 'Bomba Combustível Starboard H135', category: 'Sistema de Combustível', tbo: 2200, maxDays: 2555 },

      // Sistema Hidráulico Avançado
      { name: 'Bomba Hidráulica Sistema A H135', category: 'Sistema Hidráulico', tbo: 4000, maxDays: 4745 },
      { name: 'Bomba Hidráulica Sistema B H135', category: 'Sistema Hidráulico', tbo: 4000, maxDays: 4745 },
      { name: 'Acumulador Sistema A H135', category: 'Sistema Hidráulico', tbo: 5000, maxDays: 5840 },
      { name: 'Acumulador Sistema B H135', category: 'Sistema Hidráulico', tbo: 5000, maxDays: 5840 },

      // Rotor e Transmissão
      { name: 'Pá Rotor H135', category: 'Rotor Principal', tbo: 4000, maxDays: 4745 },
      { name: 'Caixa Transmissão Principal H135', category: 'Transmissão', tbo: 4500, maxDays: 5110 },
      { name: 'Rotor Fenestron H135', category: 'Rotor de Cauda', tbo: 3500, maxDays: 4380 },

      // Aviônicos Moderno
      { name: 'Glass Cockpit Avionics Suite H135', category: 'Aviônicos', tbo: 5000, maxDays: 5840 },
      { name: 'Sistema AFCS Automático H135', category: 'Aviônicos', tbo: 3500, maxDays: 4380 },
      { name: 'Triplo Rádio VHF H135', category: 'Aviônicos', tbo: 3500, maxDays: 4380 },

      // Estrutura Premium
      { name: 'Fuselagem H135 Reforçada', category: 'Fuselagem', tbo: 8000, maxDays: 9125 },
      { name: 'Cabine Climática H135', category: 'Fuselagem', tbo: 4000, maxDays: 4745 },
    ]
  },

  'EC145-C2': {
    model: 'Airbus EC145 C2 (Biturbina)',
    motorization: 'Biturbina',
    components: [
      // ==================== MOTORES (x2) ====================
      { name: 'Motor Turbomeca Arriel 1P2 Port EC145', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Motor Turbomeca Arriel 1P2 Starboard EC145', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Compressor Port EC145', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Compressor Starboard EC145', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Câmara Combustão Port EC145', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Câmara Combustão Starboard EC145', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Turbina Port EC145', category: 'Motor', tbo: 3000, maxDays: 3650 },
      { name: 'Turbina Starboard EC145', category: 'Motor', tbo: 3000, maxDays: 3650 },

      // ==================== COMBUSTÍVEL ====================
      { name: 'Tanque Combustível Port EC145', category: 'Sistema de Combustível', tbo: 5500, maxDays: 5840 },
      { name: 'Tanque Combustível Starboard EC145', category: 'Sistema de Combustível', tbo: 5500, maxDays: 5840 },
      { name: 'Bomba Combustível Port EC145', category: 'Sistema de Combustível', tbo: 2200, maxDays: 2555 },
      { name: 'Bomba Combustível Starboard EC145', category: 'Sistema de Combustível', tbo: 2200, maxDays: 2555 },
      { name: 'Filtro Combustível Port EC145', category: 'Sistema de Combustível', tbo: 700, maxDays: 730 },
      { name: 'Filtro Combustível Starboard EC145', category: 'Sistema de Combustível', tbo: 700, maxDays: 730 },

      // ==================== HIDRÁULICO ====================
      { name: 'Bomba Hidráulica Sistema A EC145', category: 'Sistema Hidráulico', tbo: 3500, maxDays: 4380 },
      { name: 'Bomba Hidráulica Sistema B EC145', category: 'Sistema Hidráulico', tbo: 3500, maxDays: 4380 },
      { name: 'Acumulador Sistema A EC145', category: 'Sistema Hidráulico', tbo: 4500, maxDays: 5475 },
      { name: 'Acumulador Sistema B EC145', category: 'Sistema Hidráulico', tbo: 4500, maxDays: 5475 },
      { name: 'Filtro Hidráulico Sistema A EC145', category: 'Sistema Hidráulico', tbo: 300, maxDays: 365 },
      { name: 'Filtro Hidráulico Sistema B EC145', category: 'Sistema Hidráulico', tbo: 300, maxDays: 365 },
      { name: 'Cooler Hidráulico Sistema A EC145', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },
      { name: 'Cooler Hidráulico Sistema B EC145', category: 'Sistema Hidráulico', tbo: 3000, maxDays: 3650 },

      // ==================== ROTOR PRINCIPAL (MAIOR) ====================
      { name: 'Pá do Rotor Principal EC145 C2 (Maior)', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
      { name: 'Cubo Rotor EC145 Reforçado', category: 'Rotor Principal', tbo: 4500, maxDays: 5110 },
      { name: 'Mastro Rotor EC145', category: 'Rotor Principal', tbo: 5500, maxDays: 6210 },
      { name: 'Swashplate Duplo EC145', category: 'Rotor Principal', tbo: 3000, maxDays: 3650 },
      { name: 'Bearing Rotor Principal EC145', category: 'Rotor Principal', tbo: 4000, maxDays: 4745 },
      { name: 'Cilindro Controle Rotor Port', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
      { name: 'Cilindro Controle Rotor Starboard', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },
      { name: 'Cilindro Controle Rotor Longitudinal', category: 'Rotor Principal', tbo: 3500, maxDays: 4380 },

      // ==================== ROTOR DE CAUDA ====================
      { name: 'Rotor Fenestron EC145', category: 'Rotor de Cauda', tbo: 3000, maxDays: 3650 },
      { name: 'Motor Fenestron EC145', category: 'Rotor de Cauda', tbo: 3000, maxDays: 3650 },
      { name: 'Caixa Transmissão Fenestron EC145', category: 'Rotor de Cauda', tbo: 3500, maxDays: 4380 },
      { name: 'Pás Fenestron EC145 (5x)', category: 'Rotor de Cauda', tbo: 2500, maxDays: 3650 },

      // ==================== TRANSMISSÃO REFORÇADA ====================
      { name: 'Caixa Transmissão Principal Reforçada EC145', category: 'Transmissão', tbo: 4200, maxDays: 5110 },
      { name: 'Caixa Transmissão Intermediária EC145', category: 'Transmissão', tbo: 3800, maxDays: 4745 },
      { name: 'Transmissão Intermediária Motor Port EC145', category: 'Transmissão', tbo: 3000, maxDays: 3650 },
      { name: 'Transmissão Intermediária Motor Starboard EC145', category: 'Transmissão', tbo: 3000, maxDays: 3650 },
      { name: 'Óleo Transmissão Sintético Premium EC145', category: 'Consumíveis', tbo: 250, maxDays: 365 },
      { name: 'Filtro Transmissão EC145', category: 'Transmissão', tbo: 500, maxDays: 730 },

      // ==================== ELÉTRICO AVANÇADO ====================
      { name: 'Alternador Port 28V DC Premium', category: 'Elétrico', tbo: 3000, maxDays: 3650 },
      { name: 'Alternador Starboard 28V DC Premium', category: 'Elétrico', tbo: 3000, maxDays: 3650 },
      { name: 'Bateria Principal 28V Alta Capacidade', category: 'Elétrico', tbo: 1500, maxDays: 1825 },
      { name: 'Bateria Auxiliar 28V Alta Capacidade', category: 'Elétrico', tbo: 1500, maxDays: 1825 },
      { name: 'Motor Partida Port EC145', category: 'Elétrico', tbo: 2000, maxDays: 2555 },
      { name: 'Motor Partida Starboard EC145', category: 'Elétrico', tbo: 2000, maxDays: 2555 },
      { name: 'APU (Auxiliary Power Unit)', category: 'Elétrico', tbo: 2000, maxDays: 2555 },
      { name: 'Transformador 115V 400Hz', category: 'Elétrico', tbo: 2500, maxDays: 3650 },

      // ==================== AVIÔNICOS ESTADO DA ARTE ====================
      { name: 'Glass Cockpit Avionics Suite Premium', category: 'Aviônicos', tbo: 5000, maxDays: 5840 },
      { name: 'Sistema AFCS Completo 4-Axis', category: 'Aviônicos', tbo: 3500, maxDays: 4380 },
      { name: 'Sistema GPS/INS Integrado', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },
      { name: 'Rádio VHF Triplo 25kHz', category: 'Aviônicos', tbo: 3500, maxDays: 4380 },
      { name: 'Transponder Modo S com ADS-B', category: 'Aviônicos', tbo: 3500, maxDays: 4380 },
      { name: 'Sistema ILS CAT II Completo', category: 'Aviônicos', tbo: 2500, maxDays: 3650 },
      { name: 'TAWS (Terrain Awareness Warning)', category: 'Aviônicos', tbo: 3000, maxDays: 3650 },
      { name: 'Sistema TCAS/ACAS', category: 'Aviônicos', tbo: 2500, maxDays: 3650 },

      // ==================== FUSELAGEM ESPECIAL ====================
      { name: 'Fuselagem EC145 C2 Estendida', category: 'Fuselagem', tbo: 8000, maxDays: 9125 },
      { name: 'Cabine Pressurizável EC145', category: 'Fuselagem', tbo: 5000, maxDays: 5840 },
      { name: 'Vidros Cabine Blindados (opcional)', category: 'Fuselagem', tbo: 3000, maxDays: 3650 },
      { name: 'Portas Traseiras de Emergência', category: 'Fuselagem', tbo: 4000, maxDays: 4745 },
      { name: 'Isolamento Acústico Premium', category: 'Fuselagem', tbo: 5000, maxDays: 5840 },
      { name: 'Piso Reforçado para Carga', category: 'Fuselagem', tbo: 6000, maxDays: 7300 },

      // ==================== TREM DE POUSO DUPLO ====================
      { name: 'Trem de Pouso Duplo (EC145)', category: 'Trem de Pouso', tbo: 2500, maxDays: 3650 },
      { name: 'Cilindro Amortecimento Duplo Reforçado', category: 'Trem de Pouso', tbo: 3500, maxDays: 4380 },
      { name: 'Pneus Reforçados (2x)', category: 'Trem de Pouso', tbo: 1000, maxDays: 1095 },
      { name: 'Sistema Freio Duplo Reforçado EC145', category: 'Trem de Pouso', tbo: 2500, maxDays: 3650 },
      { name: 'Cilindros Freio Duplos (2x)', category: 'Trem de Pouso', tbo: 3000, maxDays: 3650 },

      // ==================== SISTEMAS DE RESFRIAMENTO AUMENTADO ====================
      { name: 'Sistema de Refrigeração Aumentado EC145', category: 'Resfriamento', tbo: 3500, maxDays: 4380 },
      { name: 'Radiador Motor Port EC145', category: 'Resfriamento', tbo: 3500, maxDays: 4380 },
      { name: 'Radiador Motor Starboard EC145', category: 'Resfriamento', tbo: 3500, maxDays: 4380 },
      { name: 'Ventoinha Resfriamento Dupla', category: 'Resfriamento', tbo: 3000, maxDays: 3650 },

      // ==================== EQUIPAMENTOS ESPECIAIS ====================
      { name: 'Sistema de Navegação FMSIII', category: 'Aviônicos', tbo: 4000, maxDays: 4745 },
      { name: 'Cargo Hook (gancho de carga)', category: 'Acessórios', tbo: 3000, maxDays: 3650 },
      { name: 'Spotlight (holofote de busca)', category: 'Acessórios', tbo: 1000, maxDays: 1095 },
      { name: 'Floats (flutuadores) - Opcional', category: 'Acessórios', tbo: 2000, maxDays: 2555 },
      { name: 'Hoist (guincho resgate) - Opcional', category: 'Acessórios', tbo: 1500, maxDays: 2190 },
    ]
  }
};

// Total de componentes por modelo
export const COMPONENT_COUNTS = {
  'AS350-B2': 64,
  'EC130-B4': 51,
  'EC135-P2+': 68,
  'H135': 63,
  'EC145-C2': 95
};
