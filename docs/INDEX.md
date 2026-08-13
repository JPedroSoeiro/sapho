# 📚 SAPHO - Índice Completo de Arquivos

**Última atualização**: 2026-08-04 | **Versão**: 0.1.0

---

## 📖 Documentação (Leia Primeiro!)

| Arquivo | Descrição | Tempo de Leitura |
|---------|-----------|------------------|
| [README.md](../README.md) | Guia geral do projeto | 5 min |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Resumo executivo | 10 min |
| [SAPHO_ARCHITECTURE.md](./SAPHO_ARCHITECTURE.md) | Arquitetura técnica completa | 20 min |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Estrutura visual de pastas | 10 min |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Referência rápida (snippets) | 5 min |
| [SETUP_COMPLETE.md](./SETUP_COMPLETE.md) | Checklist de verificação | 5 min |
| [INDEX.md](./INDEX.md) | Este arquivo | 5 min |

**Ordem Recomendada de Leitura**:
1. README.md (visão geral)
2. IMPLEMENTATION_SUMMARY.md (o que foi feito)
3. QUICK_REFERENCE.md (como usar)
4. SAPHO_ARCHITECTURE.md (arquitetura profunda)

---

## 📁 Arquivos de Configuração

### Raiz do Projeto
```
package.json                  ← Dependências (lucide-react, clsx, next-themes)
tsconfig.json                 ← TypeScript config (path alias @/*)
next.config.ts                ← Configuração Next.js
tailwind.config.ts            ← Tailwind (auto-gerado)
postcss.config.mjs            ← PostCSS (auto-gerado)
eslint.config.mjs             ← ESLint (auto-gerado)
.gitignore                    ← Git ignore (auto-gerado)
```

---

## 🏗️ Arquivo de Arquitetura Interna

### src/app/ (Next.js App Router)

```
src/app/
├── layout.tsx                 ← Root layout com PartProvider
├── globals.css                ← Estilos globais (Tailwind)
├── page.tsx                   ← Página de Monitoramento (/)
│                                 - Dashboard com resumo
│                                 - Cards de vida útil
│                                 - Filtros e busca
└── inventory/
    └── page.tsx               ← Página de Estoque (/inventory)
                                   - Tabela CRUD
                                   - Modal de formulário
                                   - Modal de confirmação
```

**Como usar**:
- Abra seu navegador em `http://localhost:3000/`
- Ou `http://localhost:3000/inventory`

---

### src/components/ui/ (Componentes Atômicos)

```
src/components/ui/
├── Button.tsx                 ← Botões (4 variantes, 3 tamanhos)
├── Input.tsx                  ← Campos (com ícones, validação)
├── Progress.tsx               ← Barras de progresso
├── Badge.tsx                  ← Badges de status
├── Modal.tsx                  ← Modais reutilizáveis
├── ThemeToggle.tsx            ← Alternador Light/Dark
└── index.ts                   ← Centraliza exports
```

**Usar em componentes**:
```typescript
import { Button, Input, Modal } from '@/components/ui'
```

---

### src/components/layout/ (Layout Components)

```
src/components/layout/
├── Header.tsx                 ← Logo + Theme Toggle (sticky)
├── TabNavigation.tsx          ← Abas (Monitoramento/Estoque)
├── Container.tsx              ← Wrapper com max-width
└── index.ts                   ← Centraliza exports
```

**Usado em**:
- `src/app/layout.tsx` (root layout)
- Todas as páginas

---

### src/components/modules/ (Componentes de Negócio)

#### Lifespan (Monitoramento)
```
src/components/modules/lifespan/
└── LifespanCard.tsx           ← Card mostrando vida útil
                                 - 2 barras de progresso
                                 - Status com ícone
                                 - Dias/horas restantes
```

**Usado em**: `src/app/page.tsx`

#### Inventory (Estoque)
```
src/components/modules/inventory/
├── InventoryTable.tsx         ← Tabela com edit/delete
│                                 - Sortable por coluna
│                                 - Ícones de ação
│                                 - Loading state
└── PartForm.tsx               ← Formulário validado
                                 - 8 campos de entrada
                                 - Validação em tempo real
                                 - Create e Update
```

**Usado em**: `src/app/inventory/page.tsx`

---

### src/contexts/ (Estado Global)

```
src/contexts/
└── PartContext.tsx            ← Context + Hook
                                 - parts: HelicopterPart[]
                                 - loading: boolean
                                 - error: string | null
                                 - 8 métodos (CRUD + Filter)
```

**Usar em componentes**:
```typescript
import { useParts } from '@/contexts/PartContext'
const { parts, addPart, updatePart, deletePart } = useParts()
```

---

### src/hooks/ (Hooks Customizados)

```
src/hooks/
├── useParts.ts                ← Re-export do PartContext hook
│                                 import { useParts } from '@/hooks/useParts'
└── usePartLifespan.ts         ← Calcula vida útil
                                 - daysUsed, daysRemaining
                                 - hoursRemaining
                                 - percentages
                                 - criticalityLevel
```

**Usar em componentes**:
```typescript
import { usePartLifespan } from '@/hooks/usePartLifespan'
const partsWithLifespan = usePartLifespan(parts)
```

---

### src/services/ (Camada de Dados)

```
src/services/
└── partService.ts             ← Mock API com CRUD
                                 - getAll()
                                 - getById(id)
                                 - create(data)
                                 - update(id, data)
                                 - delete(id)
                                 - getByStatus(status)
                                 - getByCategory(category)
                                 - reset()
```

**Usar em**:
- `src/contexts/PartContext.tsx` (Estado)
- Chamadas diretas do serviço

---

### src/types/ (Definições TypeScript)

```
src/types/
└── part.ts                    ← 5+ interfaces
                                 - PartStatus (type)
                                 - MaintenanceHistory (interface)
                                 - HelicopterPart (interface)
                                 - PartWithCalculatedLifespan (interface)
```

**Usar em qualquer arquivo**:
```typescript
import { HelicopterPart, PartStatus } from '@/types/part'
```

---

### src/utils/ (Utilitários)

```
src/utils/
└── formatters.ts              ← Formatadores
                                 - formatDate(date) → DD/MM/YYYY
                                 - formatDateTime(date) → DD/MM/YYYY HH:mm
                                 - formatSerialNumber(sn) → SN-001
                                 - formatFlightHours(h) → 2500.0h
                                 - formatDays(d) → 365d
```

**Usar em componentes**:
```typescript
import { formatDate, formatFlightHours } from '@/utils/formatters'
```

---

## 🗂️ Árvore Completa de Arquivos

```
sapho/
├── 📄 Documentação
│   ├── README.md
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── SAPHO_ARCHITECTURE.md
│   ├── PROJECT_STRUCTURE.md
│   ├── QUICK_REFERENCE.md
│   ├── SETUP_COMPLETE.md
│   └── INDEX.md (este arquivo)
│
├── 📄 Configuração
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.mjs
│   ├── eslint.config.mjs
│   └── .gitignore
│
├── 📁 src/ (CÓDIGO PRINCIPAL)
│   ├── app/
│   │   ├── layout.tsx (Root Layout)
│   │   ├── page.tsx (Monitoramento)
│   │   ├── globals.css
│   │   └── inventory/page.tsx (Estoque)
│   │
│   ├── components/
│   │   ├── ui/ (7 componentes)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Progress.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── index.ts
│   │   ├── layout/ (3 componentes)
│   │   │   ├── Header.tsx
│   │   │   ├── TabNavigation.tsx
│   │   │   ├── Container.tsx
│   │   │   └── index.ts
│   │   └── modules/ (3 componentes)
│   │       ├── lifespan/LifespanCard.tsx
│   │       └── inventory/
│   │           ├── InventoryTable.tsx
│   │           └── PartForm.tsx
│   │
│   ├── contexts/
│   │   └── PartContext.tsx
│   │
│   ├── hooks/
│   │   ├── useParts.ts
│   │   └── usePartLifespan.ts
│   │
│   ├── services/
│   │   └── partService.ts
│   │
│   ├── types/
│   │   └── part.ts
│   │
│   └── utils/
│       └── formatters.ts
│
├── public/
│   └── ... (assets estáticos)
│
└── node_modules/
    └── ... (dependências, gitignored)
```

---

## 🔍 Como Encontrar o Que Procura

### Procurando por um componente?
- **Botões, Inputs, Modals**: `src/components/ui/`
- **Header, Navegação, Container**: `src/components/layout/`
- **Cards de vida útil, Tabelas**: `src/components/modules/`

### Procurando estado/dados?
- **Context global**: `src/contexts/PartContext.tsx`
- **Mock API**: `src/services/partService.ts`
- **Lógica de cálculo**: `src/hooks/usePartLifespan.ts`

### Procurando uma página?
- **Monitoramento (/)**: `src/app/page.tsx`
- **Estoque (/inventory)**: `src/app/inventory/page.tsx`

### Procurando tipos?
- **Todas as interfaces**: `src/types/part.ts`

### Procurando help?
- **Geral**: README.md
- **Técnico**: SAPHO_ARCHITECTURE.md
- **Rápido**: QUICK_REFERENCE.md
- **Estrutura**: PROJECT_STRUCTURE.md

---

## 📊 Estatísticas de Arquivos

| Categoria | Quantidade | Tamanho Total |
|-----------|-----------|---------------|
| Documentação | 7 | ~100KB |
| Configuração | 8 | ~5KB |
| Componentes | 13 | ~50KB |
| Contextos | 1 | ~5KB |
| Hooks | 2 | ~3KB |
| Services | 1 | ~6KB |
| Types | 1 | ~2KB |
| Utils | 1 | ~2KB |
| Páginas | 2 | ~8KB |
| **TOTAL** | **36** | **~180KB** |

---

## 🎯 Casos de Uso Comuns

### Caso 1: Adicionar um novo componente UI
1. Crie em `src/components/ui/NovoComponente.tsx`
2. Exporte em `src/components/ui/index.ts`
3. Use com `import { NovoComponente } from '@/components/ui'`

### Caso 2: Adicionar nova página
1. Crie `src/app/nova-rota/page.tsx`
2. Use componentes existentes
3. Acesse via `http://localhost:3000/nova-rota`

### Caso 3: Adicionar nova funcionalidade ao Context
1. Edite `src/contexts/PartContext.tsx`
2. Adicione método em `PartContextType`
3. Implemente no Provider
4. Use com `useParts()` em qualquer componente

### Caso 4: Integrar com Supabase
1. Instale: `npm install @supabase/supabase-js`
2. Crie: `src/services/supabaseClient.ts`
3. Reescreva: `src/services/partService.ts`
4. Tudo mais funciona igual (Context não precisa mudar)

---

## ✅ Checklist de Navegação

- [ ] Leu README.md
- [ ] Leu IMPLEMENTATION_SUMMARY.md
- [ ] Leu QUICK_REFERENCE.md (snippets úteis)
- [ ] Explorou src/components/ (componentes)
- [ ] Explorou src/app/ (páginas)
- [ ] Explorou src/contexts/ (estado)
- [ ] Consultou src/types/part.ts (estrutura de dados)
- [ ] Testou npm run dev localmente

---

## 🚀 Próximos Passos

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Rodar servidor**:
   ```bash
   npm run dev
   ```

3. **Abrir no navegador**:
   ```
   http://localhost:3000
   ```

4. **Explorar**:
   - Teste a página de Monitoramento
   - Teste CRUD na página de Estoque
   - Alterne tema (Light/Dark)
   - Teste responsividade (F12 > Mobile)

5. **Próximo desenvolvimento**:
   - Consulte QUICK_REFERENCE.md para snippets
   - Consulte SAPHO_ARCHITECTURE.md para profundidade

---

## 📞 Suporte Rápido

**Dúvida**: Como usar Button?  
**Resposta**: Veja `src/components/ui/Button.tsx` ou QUICK_REFERENCE.md

**Dúvida**: Como acessar peças?  
**Resposta**: Use `useParts()` do hook, veja QUICK_REFERENCE.md

**Dúvida**: Qual arquivo editar?  
**Resposta**: Veja o índice acima ou SAPHO_ARCHITECTURE.md

**Dúvida**: Como criar página nova?  
**Resposta**: Veja QUICK_REFERENCE.md > "Adicionar Nova Página"

---

## 🎓 Estrutura de Aprendizado

```
Iniciante?           → Comece por README.md
Intermediário?       → QUICK_REFERENCE.md + explorar código
Avançado?           → SAPHO_ARCHITECTURE.md + modificar

Procurando snippet? → QUICK_REFERENCE.md
Procurando conceito? → SAPHO_ARCHITECTURE.md
Procurando arquivo?  → Este INDEX.md
```

---

## 📈 Mapa Mental do Projeto

```
SAPHO (App)
├── 📊 Dashboard (/)
│   ├── Header
│   ├── Abas
│   ├── Resumo (3 cards)
│   └── Cards de Vida Útil
│
├── 📦 Estoque (/inventory)
│   ├── Header
│   ├── Abas
│   ├── Tabela CRUD
│   ├── Modal Formulário
│   └── Modal Confirmação
│
├── 🏗️ Infraestrutura
│   ├── Context (PartContext)
│   ├── Service (partService)
│   └── Hooks (useParts, usePartLifespan)
│
└── 🎨 UI Base
    ├── 7 Componentes
    ├── 3 Layouts
    └── 3 Módulos
```

---

## 💾 Armazenamento de Dados

**Dados da Sessão** (In-memory):
- Armazenado em `partService.ts`
- Limpo ao recarregar a página
- 5 peças pré-carregadas para testes

**Tema Salvo** (localStorage):
- Chave: `theme`
- Valores: 'light' ou 'dark'
- Detecta preferência do SO

**Próximo Passo**: Integrar com Supabase para persistência real

---

## 🎯 Resumo do Projeto

| Aspecto | Detalhe |
|--------|---------|
| **Nome** | SAPHO |
| **Descrição** | Helicopter Part Management System |
| **Stack** | Next.js 16 + React 19 + TypeScript + Tailwind |
| **Páginas** | 2 (Monitoramento + Estoque) |
| **Componentes** | 13 (UI + Layout + Módulos) |
| **Estado** | Context API |
| **Dados** | Mock Service (pronto para Supabase) |
| **Tema** | Light/Dark Mode |
| **Responsivo** | Sim (Mobile, Tablet, Desktop) |
| **TypeScript** | 100% tipado (strict) |
| **Documentação** | 7 arquivos |
| **Status** | ✅ Pronto para uso |

---

**Desenvolvido com ❤️ para eficiência operacional**

João Pedro Soeiro Lemos | 2026-08-04 | v0.1.0

---

**[Voltar ao README.md](../README.md)**
