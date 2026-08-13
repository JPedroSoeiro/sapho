# ⚡ SAPHO - Quick Reference Guide

## 🚀 Comandos Essenciais

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Verificar erros de linting
npm run lint
```

---

## 🌍 URLs Principais

| URL | Descrição |
|-----|-----------|
| `http://localhost:3000/` | Dashboard de Monitoramento |
| `http://localhost:3000/inventory` | Gestão de Estoque |

---

## 📁 Arquivos Principais

| Arquivo | Propósito |
|---------|-----------|
| `src/app/page.tsx` | Página de Monitoramento |
| `src/app/inventory/page.tsx` | Página de Estoque |
| `src/contexts/PartContext.tsx` | Estado global |
| `src/services/partService.ts` | API Mock |
| `src/types/part.ts` | Definições de tipos |

---

## 🎨 Componentes Mais Usados

### UI Components
```typescript
import { Button, Input, Progress, Badge, Modal } from '@/components/ui'

// Button
<Button variant="primary" size="md">Clique-me</Button>

// Input
<Input label="Nome" placeholder="Digite..." />

// Progress
<Progress value={65} max={100} variant="healthy" />

// Badge
<Badge variant="critical">Crítico</Badge>

// Modal
<Modal isOpen={true} onClose={() => {}}>Conteúdo</Modal>
```

### Layout Components
```typescript
import { Header, TabNavigation, Container } from '@/components/layout'

<Header /> {/* Header sticky com logo */}
<TabNavigation /> {/* Abas de navegação */}
<Container>Conteúdo</Container> {/* Wrapper com max-width */}
```

---

## 🎯 Hooks Mais Usados

```typescript
// Acessar contexto de peças
const { parts, addPart, updatePart, deletePart } = useParts()

// Calcular vida útil
const partsWithLifespan = usePartLifespan(parts)

// Estado local
const [state, setState] = useState(initialValue)
```

---

## 📊 Criar/Editar/Deletar Peça

### Criar
```typescript
const { addPart } = useParts()

await addPart({
  name: 'Nova Peça',
  serialNumber: 'SN-001',
  category: 'Motores',
  installDate: new Date(),
  maxLifespanDays: 3650,
  currentFlightHours: 0,
  maxFlightHoursTBO: 5000,
  status: 'OK'
})
```

### Editar
```typescript
const { updatePart } = useParts()

await updatePart('id-da-peca', {
  name: 'Nome Atualizado',
  currentFlightHours: 2500
})
```

### Deletar
```typescript
const { deletePart } = useParts()

await deletePart('id-da-peca')
```

---

## 🎨 Utilizar Temas

```typescript
// Alternador automático no Header
// Salvamento em localStorage
// Detecta preferência do sistema

// Para forçar tema no código:
const [theme, setTheme] = useState('light')
if (theme === 'dark') {
  document.documentElement.classList.add('dark')
}
```

---

## 🔍 Buscar/Filtrar

```typescript
// Busca
const { searchParts } = useParts()
const results = searchParts('Rotor')

// Filtrar por status
const { filterByStatus } = useParts()
await filterByStatus('CRITICAL_AOG')

// Filtrar por categoria
const { filterByCategory } = useParts()
await filterByCategory('Rotores')
```

---

## 📝 Adicionar Nova Página

1. Crie `src/app/nova-rota/page.tsx`
2. Exporte default function
3. Use componentes existentes

```typescript
// src/app/nova-rota/page.tsx
'use client'

import { Container } from '@/components/layout'
import { useParts } from '@/hooks/useParts'

export default function NovaRota() {
  const { parts } = useParts()
  
  return (
    <Container>
      <h1>Minha Nova Página</h1>
      {/* Conteúdo aqui */}
    </Container>
  )
}
```

---

## 🎨 Adicionar Novo Componente UI

```typescript
// src/components/ui/NovoComponente.tsx
interface NovoComponenteProps {
  title: string
  children?: React.ReactNode
}

export function NovoComponente({ title, children }: NovoComponenteProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

Depois exporte em `src/components/ui/index.ts`:
```typescript
export { NovoComponente } from './NovoComponente'
```

---

## 🔗 Estrutura de Tipos

```typescript
// src/types/part.ts
export type PartStatus = 'OK' | 'WARNING' | 'CRITICAL_AOG'

export interface HelicopterPart {
  id: string
  name: string
  serialNumber: string
  category: string
  installDate: Date
  maxLifespanDays: number
  currentFlightHours: number
  maxFlightHoursTBO: number
  status: PartStatus
  createdAt: Date
  updatedAt: Date
}
```

---

## 📦 Estrutura de Formulário

```typescript
<PartForm 
  part={selectedPart} {/* undefined para criar, HelicopterPart para editar */}
  onSubmit={async (data) => {
    // data é Omit<HelicopterPart, 'id' | 'createdAt' | 'updatedAt'>
    await partService.create(data)
  }}
  loading={isLoading}
/>
```

---

## 🎯 Estados de Criticidade

```typescript
const criticalityLevels = {
  'healthy': { color: 'green', icon: 'CheckCircle' },   // < 80%
  'alert': { color: 'yellow', icon: 'AlertTriangle' },  // 80-95%
  'critical': { color: 'red', icon: 'AlertCircle' }     // > 95%
}
```

---

## 🔐 Validação de Formulário

```typescript
const validateForm = () => {
  const errors: Record<string, string> = {}

  if (!name) errors.name = 'Campo obrigatório'
  if (maxDays <= 0) errors.maxDays = 'Deve ser > 0'

  return Object.keys(errors).length === 0
}
```

---

## 🌙 Dark Mode Classes

```typescript
// Tailwind dark: prefix
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-white">Texto</p>
</div>

// Sem prefix para light mode
<div className="bg-blue-600 dark:bg-blue-700">
  Botão
</div>
```

---

## 📊 Formatadores

```typescript
import { 
  formatDate, 
  formatDateTime, 
  formatSerialNumber,
  formatFlightHours,
  formatDays 
} from '@/utils/formatters'

formatDate(new Date())              // DD/MM/YYYY
formatDateTime(new Date())          // DD/MM/YYYY HH:mm
formatSerialNumber('abc-123')       // ABC-123
formatFlightHours(2500)             // 2500.0h
formatDays(365)                     // 365d
```

---

## 🔄 Context API Pattern

```typescript
// src/contexts/MinhaFeatureContext.tsx
'use client'

import { createContext, useContext } from 'react'

interface MinhaFeatureContextType {
  // tipos aqui
}

const MinhaFeatureContext = createContext<MinhaFeatureContextType | undefined>(undefined)

export function MinhaFeatureProvider({ children }: { children: React.ReactNode }) {
  // lógica aqui
  
  return (
    <MinhaFeatureContext.Provider value={{ /* valores */ }}>
      {children}
    </MinhaFeatureContext.Provider>
  )
}

export function useMinhaFeature() {
  const context = useContext(MinhaFeatureContext)
  if (!context) throw new Error('useMinhaFeature precisa estar dentro de MinhaFeatureProvider')
  return context
}
```

---

## 🎪 Modal Pattern

```typescript
const [isOpen, setIsOpen] = useState(false)

return (
  <>
    <Button onClick={() => setIsOpen(true)}>Abrir</Button>
    
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Título"
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirmar
          </Button>
        </div>
      }
    >
      Conteúdo do modal
    </Modal>
  </>
)
```

---

## 🧪 Testar Localmente

```bash
# Terminal 1: Rodar servidor
npm run dev

# Terminal 2: Ver logs
npm run build

# No navegador:
# 1. F12 para abrir DevTools
# 2. Vá para Network para ver requisições
# 3. Vá para Console para ver erros
# 4. Use React DevTools para inspecionar components
```

---

## 🚨 Debug Common

```javascript
// Console
console.log('Valor:', value)
console.error('Erro:', error)

// React DevTools
// Inspeciona props, state, hooks

// Network Tab
// Mostra chamadas ao partService (mock delays)

// Dark mode testing
// F12 > Settings > Preferences > Color scheme
```

---

## 📋 Checklist Pré-Deploy

- [ ] `npm run build` sem erros
- [ ] `npm run lint` sem warnings
- [ ] TypeScript checks passam
- [ ] Tema dark/light funciona
- [ ] Responsive em mobile/tablet/desktop
- [ ] CRUD completo funciona
- [ ] Búsqueda e filtros funcionam
- [ ] Validações funcionam
- [ ] Console sem errors

---

## 🔗 Links Úteis

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [React Docs](https://react.dev)
- [lucide-react Icons](https://lucide.dev)

---

## 💾 Salvar Arquivo

```bash
# Seu arquivo está em:
# c:\Users\joaopedro\sapho\

# Estrutura criada:
# - src/ (toda a lógica)
# - public/ (assets)
# - node_modules/ (dependências)
# - Arquivos de config (tsconfig, next.config, etc)
```

---

## 📞 Quando Algo Dá Erro

1. **Verificar console (F12)**
   - Procure por mensagens de erro
   - Clique para ver stack trace

2. **Verificar terminal**
   - `npm run dev` mostra erros de build
   - Procure por "Error" ou "Warning"

3. **Limpar cache**
   - `rm -rf .next`
   - `npm install` novamente

4. **Reiniciar servidor**
   - Ctrl+C para parar
   - `npm run dev` para iniciar novamente

5. **Consultar documentação**
   - [SAPHO_ARCHITECTURE.md](./SAPHO_ARCHITECTURE.md)
   - [README.md](../README.md)

---

**Última atualização**: 2026-08-04
**Versão**: 0.1.0
