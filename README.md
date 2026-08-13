# SAPHO

**Sistema de Armazenamento e Predição para Helicópteros e Operações**

Aplicação web para gerenciar o inventário de componentes de uma frota de helicópteros, prever a vida útil de cada peça e registrar as missões de voo que consomem essa vida útil — combinando tempo calendário e horas de voo (TBO) em um único indicador de criticidade por componente.

Feito com Next.js 16 (App Router) + TypeScript, dados mockados em memória (sem backend/DB ainda).

---

## Visão Geral

Uma frota de helicópteros de resgate/patrulhamento precisa saber, a qualquer momento, **quais peças estão perto do limite de uso** — seja por tempo (calendário) ou por horas voadas (TBO). O SAPHO modela isso em três módulos que compartilham a mesma base de dados:

- **Monitoramento** — visão de saúde da frota, por aeronave.
- **Estoque** — cadastro e CRUD dos componentes de cada aeronave.
- **Missões** — registro de voos, cujo motor de desgaste propaga automaticamente as horas voadas para as peças da aeronave.

## Features

### 📊 Monitoramento
- Seleção de aeronave → dashboard com contagem de peças OK / Alerta / Crítico
- Cálculo duplo de vida útil por peça: dias desde a instalação **e** horas de voo acumuladas vs. TBO
- Barras de progresso com cor dinâmica, filtros por criticidade e busca em tempo real

### 📦 Estoque (CRUD completo)
- Tabela por aeronave, ordenável, com busca por nome/serial/categoria
- Criar, editar e deletar peças com formulário validado
- **Histórico de desgaste por peça**: ao editar uma peça, veja quais missões contribuíram para as horas atuais dela (e quanto cada uma somou/reverteu)

### 🚁 Missões
- Registro de voos por aeronave (título, categoria, duração, piloto, observações)
- Ao criar/editar/deletar uma missão, o motor de desgaste recalcula **todas as peças daquela aeronave** automaticamente
- Peças de categorias diferentes desgastam de forma diferente por hora voada (ver abaixo)

### 🎨 Design
- Light/Dark mode com persistência em localStorage
- Interface responsiva (mobile/tablet/desktop), ícones via lucide-react

## Motor de Desgaste

O ponto central do sistema: cada hora de voo não afeta todas as peças igualmente. O `wearFactor` de cada peça (inferido pela categoria, com override manual possível) pondera o quanto uma missão desgasta aquele componente:

| Categoria | Fator | Motivo |
|---|---|---|
| Rotor Principal | **1.2x** | Fadiga cíclica, força centrífuga, vibração contínua |
| Transmissão / Rotor de Cauda | **1.1x** | Alta rotação e atrito constante |
| Motor / Turbina | **1.0x** | Desgaste nominal por hora voada |
| Fuselagem / Trem de Pouso | **0.15x** | Depende mais de ciclos de pouso e tempo calendário |
| Demais sistemas | 1.0x | Hidráulico, elétrico, aviônicos, etc. |

Cada criação/edição/exclusão de missão gera entradas em um **ledger append-only** (`WearLedgerEntry`) por peça — nada é sobrescrito, cada contribuição (positiva ou de reversão) fica registrada, permitindo responder "por que esta peça está em WARNING?" apontando exatamente as missões responsáveis.

O status de cada peça (`OK` / `WARNING` / `CRITICAL_AOG`) é recalculado a cada mudança, combinando as duas dimensões:
- **CRITICAL_AOG**: horas ≥ TBO, ou dias de vida útil esgotados (aeronave impedida de voar)
- **WARNING**: qualquer uma das duas dimensões atinge 80% do limite
- **OK**: caso contrário

## Stack Técnica

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript (strict)
- React 19 + Context API para estado global
- Tailwind CSS 4 (light/dark nativo)
- [Vitest](https://vitest.dev) para testes unitários/integração
- lucide-react para ícones
- Camada de serviços mockada (sem backend — ver Roadmap)

## Estrutura do Projeto

```
app/                          # Rotas (Next.js App Router)
├── monitoring/[aircraftId]/
├── inventory/[aircraftId]/
└── missions/[aircraftId]/

src/
├── components/
│   ├── ui/                   # Button, Modal, Badge, Progress, Input...
│   ├── layout/                # Header, TabNavigation, Container
│   └── modules/                # aircraft/, inventory/, missions/, lifespan/
├── contexts/                  # PartContext, AircraftContext
├── hooks/                     # usePartLifespan, useParts
├── services/                  # partService, missionService (+ *.test.ts)
├── lib/mock/                  # Dados mockados (frota, peças, missões)
├── types/                     # part, aircraft, mission, wearLedger
└── utils/                     # wearFactor, partStatus, formatters (+ *.test.ts)

docs/                          # Documentação histórica/auditorias do projeto
```

## Como Rodar

```bash
npm install       # instalar dependências
npm run dev       # ambiente de desenvolvimento → http://localhost:3000
npm test          # rodar a suíte de testes (Vitest)
npm run build     # build de produção
npm start         # servir o build
```

## Testes

A lógica de negócio crítica (motor de desgaste, cálculo de status, propagação de horas) tem cobertura automatizada com Vitest:

- `wearFactor.test.ts` — fator de desgaste correto por categoria
- `partStatus.test.ts` — transições de status, incluindo casos de fronteira (80%, TBO, dias esgotados)
- `missionService.test.ts` — CRUD de missões, propagação diferenciada por peça, reversão exata em edição/exclusão, isolamento entre aeronaves, e o ledger de rastreabilidade

## Dados da Frota (Mock)

9 aeronaves reais e ~517 componentes gerados a partir de especificações reais por modelo:

| Modelo | Quantidade | Motorização |
|---|---|---|
| AS350 B2 | 2 | Monoturbina |
| EC130 B4 | 1 | Monoturbina |
| EC135 P2+ | 1 | Biturbina |
| H135 | 2 | Biturbina |
| EC145 C2 | 3 | Biturbina |

Tudo em memória (reseta a cada restart do servidor) — não há persistência real ainda.

## Roadmap

- [ ] Persistência real (Supabase/Postgres) no lugar do mock service
- [ ] Autenticação e controle de acesso por perfil (piloto, mecânico, gestor)
- [ ] Consolidar/limpar a documentação legada em `docs/` (vários arquivos se sobrepõem)
- [ ] Testes de componentes de UI (hoje a cobertura é só na camada de serviço/lógica)

## Documentação Adicional

- [docs/SAPHO_ARCHITECTURE.md](./docs/SAPHO_ARCHITECTURE.md) — arquitetura detalhada
- [docs/](./docs/) — auditorias e notas históricas do desenvolvimento

---

**Status:** protótipo funcional, dados mockados · **Stack:** Next.js 16 · TypeScript · Tailwind 4
