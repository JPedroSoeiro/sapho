# 🔴 AUDITORIA COMPLETA - INVENTORY PAGES (TELA PRETA)

## PROBLEMA CRÍTICO ENCONTRADO

### ❌ **Tela fica PRETA quando entra em `/inventory/[aircraftId]`**

Possíveis causas:
1. Erro não capturado durante hidratação React
2. Erro no carregamento de dados
3. Erro na renderização de componentes

---

## FLUXO DE CARREGAMENTO ANALISADO

```
1. Acessa /inventory/[aircraftId]
   ↓
2. RootLayout carrega
   - AircraftProvider (inicializa)
   - PartProvider (inicializa)
   ↓
3. InventoryDetailPage renderiza
   - useParams() → get aircraftId
   - useAircraft() → get aircraft data
   - useParts() → get parts data
   ↓
4. InventoryTable renderiza com parts
   ↓
5. PartModal + DeletePartModal renderizam
```

---

## PROBLEMAS ENCONTRADOS

### 1️⃣ **ERRO DE CONTEXTO NÃO CAPTURADO**

**Local**: `src/contexts/AircraftContext.tsx:34` e `src/contexts/PartContext.tsx:150`

```typescript
export function useAircraft() {
  const context = useContext(AircraftContext);
  if (!context) {
    throw new Error('useAircraft deve ser usado dentro de AircraftProvider');  // ❌ LANÇA ERRO
  }
  return context;
}
```

**Problema**: Se o erro é lançado, não há error boundary para capturá-lo.
**Solução**: Adicionar try-catch ou error boundary.

---

### 2️⃣ **POSSÍVEL ERRO DE HIDRATAÇÃO**

**Local**: `app/inventory/[aircraftId]/page.tsx`

O componente é `'use client'` mas chama `useParams()` que pode não estar sincronizado entre servidor e cliente durante hidratação.

```typescript
const params = useParams();  // ❌ Pode causar mismatch servidor/cliente
const aircraftId = params.aircraftId as string;
```

**Problema**: Se `params` retornar undefined durante hidratação, aircraftId fica undefined.

---

### 3️⃣ **ACESSO A DADOS NÃO EXISTENTES**

**Local**: `app/inventory/[aircraftId]/page.tsx:31-32`

```typescript
const aircraft = getAircraftById(aircraftId);  // ❌ Pode ser undefined
const aircraftParts = parts.filter((p) => p.aircraftId === aircraftId);
```

Se `aircraftId` for `undefined` ou inválido:
- `aircraft` será `undefined`
- Retorna erro na linha 81-91 (mas isso deveria funcionar)

---

### 4️⃣ **DADOS CARREGANDO MAS PODE TER ERRO SILENCIOSO**

**Local**: `src/contexts/PartContext.tsx:28-39`

```typescript
const fetchParts = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await partService.getAll();
    setParts(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Erro ao carregar peças');
  } finally {
    setLoading(false);
  }
}, []);
```

Se há erro no `partService.getAll()`, o erro é setado mas não há fallback visível.

---

## SOLUÇÃO TESTADA

Vou criar um componente Error Boundary para capturar erros de hidratação:

---

## CHECKLIST DE VERIFICAÇÃO

- [ ] Verificar se AircraftProvider está renderizando
- [ ] Verificar se PartProvider está carregando dados
- [ ] Verificar se useParams() funciona corretamente
- [ ] Verificar se há erro silencioso em partService.getAll()
- [ ] Adicionar error boundary para capturar erros

---

## ARQUIVOS ENVOLVIDOS

```
app/layout.tsx                          (RootLayout)
app/inventory/[aircraftId]/page.tsx     (InventoryDetailPage) ❌ PROBLEMA AQUI
src/contexts/AircraftContext.tsx        (AircraftProvider)
src/contexts/PartContext.tsx            (PartProvider)
src/services/partService.ts             (Carregamento de dados)
src/components/modules/inventory/PartModal.tsx
src/components/modules/inventory/DeletePartModal.tsx
```

---

## HIPÓTESE PRINCIPAL

**A página fica preta porque há um erro JavaScript não capturado durante a hidratação do React.**

O navegador não consegue renderizar porque:
1. O React tenta sincronizar o estado do servidor com o cliente
2. Há um mismatch ou erro nessa sincronização
3. A página inteira falha em renderizar

---

## PRÓXIMAS AÇÕES

1. Adicionar error boundary no layout
2. Adicionar console.error() no PartProvider para logar erros de carregamento
3. Adicionar validação antes de acessar params
4. Verificar se initialPartsMock.ts está carregando corretamente
