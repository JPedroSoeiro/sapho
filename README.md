# SAPHO - Helicopter Part Management System

**Sistema de Armazenamento e Predicao para Helicopteros e Operacoes**

Uma aplicacao web minimalista, moderna e profissional para gerenciar o estoque de pecas de helicopteros e monitorar a vida util/desgaste de cada componente.

## Features Principais

### Dashboard de Monitoramento
- Dashboard com resumo de status (OK, Alerta, Critico)
- Cards com duplo calculo de desgaste:
  - **Tempo de Calendario**: dias desde instalacao vs. limite
  - **Horas de Voo (TBO)**: horas voadas vs. limite operacional
- Barras de progresso dinamicas com cores automaticas
- Filtros por status e busca em tempo real

### Gestao de Estoque (CRUD Completo)
- Tabela interativa com todas as pecas
- Criar novas pecas com formulario validado
- Editar pecas existentes
- Deletar com confirmacao de seguranca
- Busca e ordenacao por qualquer coluna

### Design & UX
- Design minimalista e profissional para ambiente aeronautico
- **Tema Light/Dark Mode** com persistencia automatica
- Interface responsiva (mobile, tablet, desktop)
- Icones interativos com lucide-react
- Feedback visual em todas as acoes

## Stack Tecnologica

- Next.js 16.3.0 (App Router + TypeScript)
- React 19.2.8
- Tailwind CSS 4
- lucide-react (icones)
- Context API (estado global)
- Mock Service (CRUD)

## Estrutura do Projeto

```
src/
├── app/                  # Paginas e layouts (Next.js)
├── components/
│   ├── ui/              # Componentes atomicos
│   ├── layout/          # Layout components
│   └── modules/         # Componentes de negocio
├── contexts/            # Context API
├── hooks/               # Hooks customizados
├── services/            # Camada de dados
├── types/               # Definicoes TypeScript
└── utils/               # Utilitarios
```

Consulte [SAPHO_ARCHITECTURE.md](./SAPHO_ARCHITECTURE.md) para documentacao completa.

## Quick Start

### 1. Instalacao
```bash
npm install
```

### 2. Desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

### 3. Build para Producao
```bash
npm run build
npm start
```

## Como Usar

### Aba 1: Monitoramento (/)
1. Veja o dashboard com resumo de status
2. Explore os cards de cada peca
3. Use os filtros para encontrar pecas por criticidade
4. Busque por nome ou serial number

### Aba 2: Estoque (/inventory)
1. Visualize todas as pecas em tabela
2. **Adicione** uma nova peca: clique em "+ Nova Peca"
3. **Edite**: clique no icone de edicao
4. **Delete**: clique no icone de lixeira (com confirmacao)

## Dados Mockados

O sistema vem com 5 pecas pre-configuradas:
- Rotor Principal (OK)
- Motor Principal (OK)
- Sistema Hidraulico (WARNING)
- Bateria Auxiliar (OK)
- Caixa de Transmissao (CRITICAL_AOG)

Todos os dados sao armazenados em memoria durante a sessao.

## Proxima Integracao: Supabase

Para conectar ao Supabase:

1. Instale o cliente Supabase:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Crie um arquivo `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=seu_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave
   ```

3. Substitua `partService.ts` com integracao real do Supabase

## Themes

### Light Mode
- Fundo branco com acentos cinza
- Texto escuro para maxima legibilidade

### Dark Mode
- Fundo escuro com acentos cinzeiros
- Texto claro para conforto visual

A preferencia e salva automaticamente no localStorage.

## Calculo de Criticidade

A criticidade e calculada com base em dois fatores:

| Fator | Saudavel | Alerta | Critico |
|-------|----------|--------|---------|
| Uso em % | < 80% | 80-95% | > 95% |
| Dias Restantes | > 90d | <= 90d | <= 0d |
| Horas Restantes | > 200h | <= 200h | <= 0h |

**Resultado**: MAX(calendarPercentage, hoursPercentage)

## Validacao de Formulario

O formulario de pecas valida:
- Nome obrigatorio
- Serial Number obrigatorio
- Categoria obrigatoria
- Data de instalacao valida
- Valores positivos para dias e horas
- Horas atuais <= TBO

## Deployment

A aplicacao esta pronta para deploy em:
- **Vercel** (recomendado): `vercel deploy`
- **Netlify**: Configure build: `npm run build`
- **Docker**: Crie Dockerfile personalizado

## Documentacao Adicional

- [SAPHO_ARCHITECTURE.md](./SAPHO_ARCHITECTURE.md) - Arquitetura completa
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## Suporte

Duvidas? Consulte a documentacao em [SAPHO_ARCHITECTURE.md](./SAPHO_ARCHITECTURE.md)

---

**Desenvolvido para eficiencia operacional**

Versao: **0.1.0** | Data: **2026-08-04**
