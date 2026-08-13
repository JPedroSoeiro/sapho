# 🚁 SAPHO - Helicopter Part Management System

**Sistema de Armazenamento e Predição para Helicópteros e Operações**

## 📋 Visão Geral

SAPHO é um sistema minimalista e profissional para gerenciar o estoque de peças de helicópteros e monitorar a vida útil/desgaste de cada componente. A aplicação oferece duas abas principais: **Monitoramento** de vida útil e **Estoque** (CRUD completo).

---

## 🎯 Stack Tecnológica

- **Framework**: Next.js 16.3.0 (App Router + TypeScript)
- **Estilização**: Tailwind CSS 4
- **UI Components**: React 19.2.8
- **Ícones**: lucide-react
- **Tema**: Light/Dark Mode nativo
- **Estado**: React Context API
- **Backend**: Mock Service (pronto para integração com Supabase)

---

## 📁 Estrutura de Pastas

```
sapho/
├── src/
│   ├── app/                      # Páginas e layouts (Next.js App Router)
│   │   ├── layout.tsx            # Layout root com Provider
│   │   ├── globals.css           # Estilos globais
│   │   ├── page.tsx              # Página de Monitoramento (/)
│   │   └── inventory/
│   │       └── page.tsx          # Página de Estoque (/inventory)
│   │
│   ├── components/               # Componentes reutilizáveis
│   │   ├── ui/                   # Componentes atômicos
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/               # Componentes de layout
│   │   │   ├── Header.tsx        # Logo + Theme Toggle
│   │   │   ├── TabNavigation.tsx # Navegação entre abas
│   │   │   ├── Container.tsx     # Wrapper com max-width
│   │   │   └── index.ts
│   │   │
│   │   └── modules/              # Componentes específicos de negócio
│   │       ├── lifespan/         # Monitoramento de vida útil
│   │       │   └── LifespanCard.tsx
│   │       └── inventory/        # Gestão de estoque
│   │           ├── InventoryTable.tsx
│   │           └── PartForm.tsx
│   │
│   ├── contexts/                 # Context API
│   │   └── PartContext.tsx       # Estado global de peças
│   │
│   ├── hooks/                    # Hooks customizados
│   │   ├── useParts.ts           # Hook para acessar PartContext
│   │   └── usePartLifespan.ts    # Hook para calcular vida útil
│   │
│   ├── services/                 # Camada de dados
│   │   └── partService.ts        # API Mock com CRUD completo
│   │
│   ├── types/                    # Definições de tipos TypeScript
│   │   └── part.ts               # Tipos de peças de helicóptero
│   │
│   └── utils/                    # Utilitários
│       └── formatters.ts         # Formatadores de data, hora, etc
│
├── public/                       # Assets estáticos
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## 🔑 Tipos e Interfaces

### HelicopterPart
Interface principal para representar uma peça de helicóptero:

```typescript
interface HelicopterPart {
  id: string;
  name: string;                  // Ex: "Rotor Principal"
  serialNumber: string;          // Ex: "RMB-2024-001"
  category: string;              // Ex: "Rotores"
  installDate: Date;             // Data de instalação
  maxLifespanDays: number;       // Dias de vida útil (calendário)
  currentFlightHours: number;    // Horas de voo atuais
  maxFlightHoursTBO: number;     // Time Between Overhaul (máximo)
  status: 'OK' | 'WARNING' | 'CRITICAL_AOG';
  createdAt: Date;
  updatedAt: Date;
  maintenanceHistory?: MaintenanceHistory[];
}
```

### PartWithCalculatedLifespan
Estende HelicopterPart com cálculos de vida útil:

```typescript
interface PartWithCalculatedLifespan extends HelicopterPart {
  daysUsed: number;              // Dias desde instalação
  daysRemaining: number;         // Dias até vencimento
  hoursRemaining: number;        // Horas de voo até TBO
  calendarPercentage: number;    // Uso em % (calendário)
  hoursPercentage: number;       // Uso em % (horas de voo)
  criticalityLevel: 'healthy' | 'alert' | 'critical';
}
```

---

## 🛠️ Serviços

### partService.ts
Mock service com CRUD completo para peças. Simula delays de rede para testes realistas.

**Métodos disponíveis:**
- `getAll()` - Obter todas as peças
- `getById(id)` - Obter peça por ID
- `create(partData)` - Criar nova peça
- `update(id, partData)` - Atualizar peça existente
- `delete(id)` - Deletar peça
- `getByStatus(status)` - Filtrar por status
- `getByCategory(category)` - Filtrar por categoria
- `reset()` - Resetar dados para testes

---

## 📊 Context API

### PartContext.tsx
Gerencia o estado global das peças com operações CRUD em tempo real:

```typescript
interface PartContextType {
  parts: HelicopterPart[];
  loading: boolean;
  error: string | null;
  fetchParts: () => Promise<void>;
  addPart: (part) => Promise<void>;
  updatePart: (id, part) => Promise<void>;
  deletePart: (id) => Promise<void>;
  filterByStatus: (status) => Promise<void>;
  filterByCategory: (category) => Promise<void>;
  searchParts: (query) => HelicopterPart[];
}
```

---

## 🎨 Componentes UI

### Componentes Atômicos
- **Button**: Botões com variantes (primary, secondary, danger, ghost)
- **Input**: Campo de entrada com suporte a ícones e validação
- **Progress**: Barra de progresso com cores dinâmicas
- **Badge**: Badges com variantes de status
- **Modal**: Modal de confirmação e formulários
- **ThemeToggle**: Alternador de tema light/dark

### Componentes de Layout
- **Header**: Logo + Theme Toggle
- **TabNavigation**: Navegação entre abas (Monitoramento/Estoque)
- **Container**: Wrapper com max-width e padding

### Componentes de Módulos
- **LifespanCard**: Card mostrando vida útil com 2 barras de progresso
- **InventoryTable**: Tabela completa com ações de Edit/Delete
- **PartForm**: Formulário para criar/editar peças com validação

---

## 🎯 Funcionalidades Principais

### 📊 Aba 1: Monitoramento de Vida Útil
**Rota**: `/`

Oferece:
- **Dashboard** com resumo de status (Saudáveis, Alerta, Crítico)
- **Cards de Vida Útil** mostrando:
  - Tempo de calendário (dias restantes)
  - Horas de voo / TBO
  - Barra de progresso com cores dinâmicas (verde → amarelo → vermelho)
- **Filtros** por status e busca por nome/serial
- **Cálculo duplo de desgaste** (Calendário + Horas de Voo)

**Criticidade:**
- `healthy` (verde): < 80% de uso
- `alert` (amarelo): 80-95% de uso
- `critical` (vermelho): > 95% de uso

### 📦 Aba 2: Gestão de Estoque
**Rota**: `/inventory`

Oferece:
- **Tabela completa** com todas as peças cadastradas
- **Ações interativas**:
  - ✏️ Editar (abre modal com formulário pré-preenchido)
  - 🗑️ Deletar (com confirmação)
- **Formulário de cadastro/edição**:
  - Validação em tempo real
  - Máscaras de entrada
  - Campos obrigatórios
- **Busca dinâmica** por nome ou serial number
- **Ordenação** por qualquer coluna

---

## 🎨 Design System

### Paleta de Cores
- **Primário**: Azul (#2563EB)
- **Sucesso**: Verde (#10B981)
- **Alerta**: Amarelo (#F59E0B)
- **Erro**: Vermelho (#EF4444)
- **Neutro**: Cinza

### Tema
- **Light Mode**: Fundo branco, texto escuro
- **Dark Mode**: Fundo escuro (#0F172A), texto claro
- **Persistência**: Tema salvo no localStorage

### Tipografia
- **Fonte**: Geist Sans (default) + Geist Mono (código)
- **Tamanhos**: Padrão do Tailwind CSS

### Espaçamento
- Utiliza escala de Tailwind CSS (4px base)
- Padding/margin consistentes com `px-4`, `py-4`, etc.

---

## 🚀 Como Usar

### Instalação

```bash
cd sapho
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
npm run build
npm run start
```

---

## 🔄 Fluxo de Dados

```
Página (page.tsx)
    ↓
useParts() → PartContext
    ↓
partService (Mock API)
    ↓
Estado Local (parts, loading, error)
    ↓
Componentes (LifespanCard, InventoryTable)
```

---

## 📝 Exemplos de Uso

### Adicionar uma Nova Peça
1. Ir para aba "Estoque"
2. Clicar em "+ Nova Peça"
3. Preencher formulário
4. Clicar em "Adicionar Peça"

### Editar uma Peça
1. Na tabela, clicar no ícone "✏️"
2. Modificar dados
3. Clicar em "Atualizar Peça"

### Deletar uma Peça
1. Na tabela, clicar no ícone "🗑️"
2. Confirmar exclusão

### Monitorar Vida Útil
1. Ir para aba "Monitoramento"
2. Ver cards com barras de progresso
3. Filtrar por status (OK/Alerta/Crítico)

---

## 🔮 Próximos Passos

1. **Integração com Supabase**
   - Substituir `partService` por cliente Supabase
   - Implementar autenticação
   - Adicionar histórico de manutenção

2. **Features Avançadas**
   - Gráficos de tendência de desgaste
   - Alertas de manutenção preventiva
   - Export de relatórios (PDF/CSV)
   - Histórico de alterações (audit log)

3. **Otimizações**
   - Paginação na tabela
   - Cache com SWR/React Query
   - Modo offline
   - Testes automatizados

---

## 📄 Convenções de Código

- **Componentes**: PascalCase (`LifespanCard.tsx`)
- **Arquivos**: camelCase ou PascalCase
- **Variáveis**: camelCase
- **Constantes**: UPPER_SNAKE_CASE (raras)
- **Tipos**: PascalCase com sufixo (PartStatus, HelicopterPart)

---

## 🤝 Contribuição

Para adicionar novas funcionalidades:

1. Criar novo hook em `hooks/`
2. Adicionar novo contexto em `contexts/` (se necessário)
3. Criar componentes em `components/`
4. Atualizar tipos em `types/` se necessário
5. Seguir padrão de exports via `index.ts`

---

## 📞 Suporte

Para dúvidas sobre a arquitetura ou implementação, consulte a estrutura acima e os comentários no código.

---

**Desenvolvido com ❤️ para operações aeronáuticas eficientes**
