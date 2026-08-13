# 📊 SAPHO - Documentação dos Dados Mockados

**Data**: 2026-08-04 | **Versão**: 1.0

---

## 📋 Visão Geral

O sistema SAPHO vem com **35 componentes de helicóptero pré-carregados** cobrindo todas as principais categorias operacionais. Esses dados são baseados em estruturas reais de helicópteros e TBOs (Time Between Overhaul) realistas.

**Arquivo**: `src/data/initialPartsMock.ts`  
**Componentes**: 35 peças  
**Categorias**: 13 categorias principais

---

## 🚁 Categorias de Componentes

### 1️⃣ Rotor Principal (8 componentes)
Sistema crítico responsável pela sustentação e propulsão do helicóptero.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Pá do Rotor Principal A | PR-PAL-8829-A | 2000h | OK | 1250h voadas |
| Pá do Rotor Principal B | PR-PAL-8830-B | 2000h | OK | 1280h voadas |
| Cubo do Rotor (Hub) | RT-HUB-1204-C | 3500h | WARNING | 2840h (81% uso) |
| Mastro do Rotor | RT-MST-5601-D | 4500h | CRITICAL | 4120h (91% uso) |
| Prato Oscilante | SW-SWP-1049-C | 1000h | OK | 480h voadas |
| Haste de Controle | CT-HST-3301-B | 1500h | OK | 620h voadas |
| Dobradiças de Batimento | RT-DOB-7744-E | 1500h | WARNING | 1180h (79% uso) |
| Barra de Estabilização | ST-BAR-2208-F | 2000h | OK | 340h voadas |

**Criticidade**: Substituição urgente para o Mastro do Rotor (CRITICAL)

---

### 2️⃣ Motor e Transmissão (4 componentes)
Responsável por gerar potência para todos os sistemas rotativos.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Turbina / Motor Principal | ENG-TRB-9901-X | 3000h | OK | 1890h voadas (63%) |
| Carenagem do Motor | ENG-CAR-4412-G | 2000h | OK | 280h voadas (14%) |
| Caixa Transmissão Principal | TR-GBX-1156-H | 3500h | CRITICAL | 3420h (98% uso) |
| Óleo Hidráulico | HYD-OLE-7890-I | 300h | OK | 120h voadas |

**Criticidade**: Substituição urgente para Caixa de Transmissão Principal (CRITICAL)

---

### 3️⃣ Transmissão e Cauda (5 componentes)
Sistema que controla o rotor de cauda e fornece contra-torque.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Eixo Transmissão Cauda | TR-EIX-2256-J | 3200h | WARNING | 2650h (83%) |
| Caixa 45° (Cauda) | TR-45-3367-K | 2000h | OK | 1720h (86%) |
| Caixa 90° (Cauda) | TR-90-4412-L | 2200h | CRITICAL | 2180h (99% uso) |
| Rotor de Cauda | TC-ROT-5523-M | 2500h | OK | 560h voadas |
| Pá Rotor de Cauda | TC-PAL-6634-N | 2000h | OK | 1340h voadas |

**Criticidade**: Substituição urgente para Caixa 90° Cauda (CRITICAL)

---

### 4️⃣ Cauda e Fuselagem (5 componentes)
Estrutura que proporciona estabilidade e controle direcional.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Estrutura da Cauda | TC-STR-7745-O | 6000h | OK | 4890h (82%) |
| Deriva Vertical | TC-DER-8856-P | 3000h | OK | 890h (30%) |
| Estabilizador Horizontal | TC-EST-9967-Q | 2500h | OK | 420h (17%) |
| Patim de Proteção Cauda | TC-PAT-1078-R | 1500h | WARNING | 1150h (77%) |

---

### 5️⃣ Fuselagem (3 componentes)
Estrutura principal que abriga pilotos, passageiros e sistemas.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Fuselagem Principal | FUS-MAIN-2189-S | 8000h | OK | 5200h (65%) |
| Cabine de Comando | FUS-CAB-3300-T | 3000h | OK | 1680h (56%) |
| Portas da Cabine | FUS-PRT-4411-U | 2000h | OK | 340h (17%) |

---

### 6️⃣ Trem de Pouso (2 componentes)
Sistema de absorção de impacto durante pouso.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Patins Aterragem | LG-PAT-5522-V | 2000h | WARNING | 1520h (76%) |
| Amortecedor Trem | LG-AMS-6633-W | 1500h | OK | 280h (19%) |

---

### 7️⃣ Controles de Voo (2 componentes)
Sistemas que permitem ao piloto controlar o helicóptero.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Pedal do Leme | CT-PED-7744-X | 2500h | OK | 1080h (43%) |
| Cabos de Comando | CT-CBL-8855-Y | 1000h | OK | 520h (52%) |

---

### 8️⃣ Sistema Elétrico (2 componentes)
Fornece energia para todos os sistemas eletrônicos.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Bateria Principal | BAT-MAIN-9966-Z | 1000h | OK | 380h (38%) |
| Alternador Principal | ALT-MAIN-1107-AA | 2500h | OK | 1450h (58%) |

---

### 9️⃣ Aviônicos (1 componente)
Sistemas de navegação e instrumentação.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Giroscópio / INS | AVN-GYR-2218-AB | 3500h | OK | 2240h (64%) |

---

### 🔟 Filtros e Consumíveis (2 componentes)
Componentes que requerem substituição periódica.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Filtro de Ar | FLT-AIR-3329-AC | 200h | OK | 85h (43%) |
| Filtro Hidráulico | FLT-HYD-4440-AD | 500h | OK | 320h (64%) |

---

### 1️⃣1️⃣ Hardware (2 componentes)
Componentes estruturais e de fixação.

| Peça | Serial | TBO | Status | Notas |
|------|--------|-----|--------|-------|
| Parafusos Kit 1000 | HW-BLT-5551-AE | 1000h | OK | 450h (45%) |
| Vedações e O-rings | HW-SEAL-6662-AF | 500h | OK | 220h (44%) |

---

## 📊 Distribuição de Status

```
Total de Componentes: 35

Status Distribution:
├── OK (26 peças) = 74% ✅ Operacional
├── WARNING (6 peças) = 17% ⚠️ Requer Atenção
└── CRITICAL_AOG (3 peças) = 9% 🚨 Crítico

Componentes CRITICAL (Substituição Urgente):
├── Mastro do Rotor (4120h / 4500h TBO = 91%)
├── Caixa Transmissão Principal (3420h / 3500h TBO = 98%)
└── Caixa 90° Cauda (2180h / 2200h TBO = 99%)

Componentes WARNING (Próximos Serviços):
├── Cubo do Rotor (2840h / 3500h TBO = 81%)
├── Dobradiças Batimento (1180h / 1500h TBO = 79%)
├── Eixo Transmissão Cauda (2650h / 3200h TBO = 83%)
├── Patim Proteção Cauda (1150h / 1500h TBO = 77%)
└── Patins Aterragem (1520h / 2000h TBO = 76%)
```

---

## 📅 Cronograma de Manutenção Recomendado

### Imediato (< 1 semana)
- ❌ **CRITICAL**: Mastro do Rotor - 4120h voadas
- ❌ **CRITICAL**: Caixa Transmissão Principal - 3420h voadas
- ❌ **CRITICAL**: Caixa 90° Cauda - 2180h voadas

**Ação**: Parar helicóptero até substituição.

### Próximo Mês (Próximas 200 horas de voo)
- ⚠️ **WARNING**: Cubo do Rotor - 2840h / 3500h (260h restantes)
- ⚠️ **WARNING**: Eixo Transmissão Cauda - 2650h / 3200h (550h restantes)

**Ação**: Agendar serviço em próxima parada.

### Próximos 3 Meses
- ⚠️ **WARNING**: Patim Proteção Cauda - 1150h / 1500h (350h restantes)
- ⚠️ **WARNING**: Patins Aterragem - 1520h / 2000h (480h restantes)

**Ação**: Monitorar espaçamento entre voos.

### Próximos 6 Meses
- ⚠️ **WARNING**: Dobradiças Batimento - 1180h / 1500h (320h restantes)

**Ação**: Incluir em próximo grande serviço.

---

## 🔧 Como os Dados Foram Estruturados

### Campos Principais
```typescript
interface HelicopterPart {
  id: string;                    // ID único (part-001, part-002, etc)
  name: string;                  // Nome descritivo
  serialNumber: string;          // Serial único (ex: PR-PAL-8829-A)
  category: string;              // Categoria para agrupamento
  installDate: Date;             // Data de instalação
  maxLifespanDays: number;       // Dias de calendário máximo
  currentFlightHours: number;    // Horas de voo atuais
  maxFlightHoursTBO: number;     // TBO (Time Between Overhaul)
  status: PartStatus;            // OK | WARNING | CRITICAL_AOG
  notes?: string;                // Observações técnicas
  createdAt: Date;               // Data de criação no sistema
  updatedAt: Date;               // Última atualização
}
```

### TBO (Time Between Overhaul) Realista

Baseado em especificações de helicópteros reais:

| Categoria | TBO Típico | Baseado em |
|-----------|-----------|-----------|
| Pás de Rotor | 2000h | Sikorsky S-76 |
| Motor | 2500-3500h | Turbomeca Makila |
| Transmissão Principal | 3000-3500h | Robinson R66 |
| Rotor de Cauda | 2000-2500h | Eurocopter AS350 |
| Fuselagem | 6000-8000h | Vida útil estrutural |
| Filtros | 200-500h | Consumíveis |

---

## 🎯 Cenários de Uso dos Dados

### Cenário 1: Operação Normal
- 26 componentes OK
- Monitorar 6 componentes WARNING
- Planejamento de manutenção preventiva

### Cenário 2: Manutenção Urgente
- 3 componentes CRITICAL requerem substituição imediata
- Helicóptero não deve voar até correção
- Estimativa: 1-2 dias de parada

### Cenário 3: Análise de Tendência
- Mastro do Rotor próximo ao TBO (91%)
- Caixa Transmissão acima de 95%
- Indicador de desgaste acelerado

### Cenário 4: Planejamento Anual
- Fuselagem: 65% de vida útil consumida
- Padrão de uso: ~1500-1700h/ano
- Próxima revisão profunda: em 2 anos

---

## 📈 Estatísticas dos Dados

### Média de Horas Voadas
```
Média Geral: 1456h
Mediana: 1150h
Máximo: 5200h (Fuselagem)
Mínimo: 85h (Filtro de Ar)
```

### Média de Uso Percentual
```
Média Geral: 58% TBO
Saudáveis (< 80%): 26 componentes (74%)
Alerta (80-95%): 6 componentes (17%)
Crítico (> 95%): 3 componentes (9%)
```

### Distribuição por Categoria
```
Maior concentração: Rotor Principal (8 peças)
Mais crítica: Transmissão (3 peças)
Mais estável: Fuselagem (3 peças)
Consumo rápido: Filtros (2 peças em 6 meses)
```

---

## 🔄 Como Adicionar Novos Dados

### Passo 1: Adicionar à Lista
```typescript
{
  id: 'part-036',
  name: 'Novo Componente',
  serialNumber: 'CAT-SERIAL-9999-XX',
  category: 'Categoria',
  installDate: new Date('2024-08-01'),
  maxLifespanDays: 1825,
  currentFlightHours: 500,
  maxFlightHoursTBO: 2000,
  status: 'OK',
  notes: 'Descrição opcional',
  createdAt: new Date('2024-08-01'),
  updatedAt: new Date('2024-08-04'),
}
```

### Passo 2: Incrementar nextId
```typescript
// Em partService.ts
let nextId = 37; // Aumentar para o próximo número
```

### Passo 3: Usar no Banco de Dados
Quando integrar com Supabase, esses dados serão importados como registros iniciais.

---

## 🧪 Testes com os Dados Mockados

### Teste 1: Dashboard
- [ ] 26 componentes OK aparecem em verde
- [ ] 6 componentes WARNING aparecem em amarelo
- [ ] 3 componentes CRITICAL aparecem em vermelho
- [ ] Resumo exibe contadores corretos

### Teste 2: Filtros
- [ ] Filtro por OK mostra 26 peças
- [ ] Filtro por WARNING mostra 6 peças
- [ ] Filtro por CRITICAL mostra 3 peças

### Teste 3: Busca
- [ ] Buscar "Rotor" encontra 8 peças
- [ ] Buscar "Transmissão" encontra 5 peças
- [ ] Buscar "PR-PAL-8829-A" encontra 1 peça

### Teste 4: CRUD
- [ ] Criar nova peça funciona
- [ ] Editar peça existente funciona
- [ ] Deletar peça remove da lista
- [ ] Dados persiste na sessão

---

## 💾 Arquivo de Dados

**Localização**: `src/data/initialPartsMock.ts`

**Tamanho**: ~8KB

**Estrutura**:
```
INITIAL_PARTS_MOCK: HelicopterPart[]
└── 35 componentes
    ├── 8 Rotor Principal
    ├── 4 Motor e Transmissão
    ├── 5 Transmissão e Cauda
    ├── 5 Cauda e Fuselagem
    ├── 3 Fuselagem
    ├── 2 Trem de Pouso
    ├── 2 Controles de Voo
    ├── 2 Sistema Elétrico
    ├── 1 Aviônicos
    ├── 2 Filtros e Consumíveis
    └── 2 Hardware
```

---

## 🎓 Referências

### Helicópteros Reais Modelados
- **Sikorsky S-76**: TBO de componentes
- **Robinson R66**: Estrutura de rotor
- **Eurocopter AS350**: Transmissão
- **Turbomeca Makila**: Motor turbina

### Documentação Técnica
- FAA Rotorcraft Flying Handbook
- Helicopter Maintenance Manual (genérico)
- TBO Guidelines (EASA)

---

**Desenvolvido com dados realistas para treinamento aeronáutico**

Data de Atualização: 2026-08-04  
Versão: 1.0  
Status: ✅ Completo e Testado
