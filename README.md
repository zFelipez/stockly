# Stockly

## Sobre o projeto
O Stockly é um sistema web de gestão de estoque e vendas desenvolvido com Next.js, com foco em operações administrativas. O projeto permite cadastrar produtos, registrar vendas, controlar saldo de estoque e acompanhar indicadores consolidados em um dashboard.

Pelo código atual, o sistema foi pensado como um painel interno de operação, com interface orientada a produtividade, componentes reutilizáveis e forte uso de recursos server-first do ecossistema Next.js. A aplicação prioriza simplicidade de fluxo, e separação clara entre interface, regras de negócio e acesso a dados.
 

## Autor

Projeto realizado junto do professor Felipe Rocha, do fullstack Club , no seu curso de NextJS . 


## Tecnologias utilizadas
Tecnologias identificadas diretamente no projeto:

- Next.js 14 com App Router
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI
- Prisma ORM
- PostgreSQL
- Prisma Adapter PG
- Next Server Actions
- next-safe-action
- React Hook Form
- Zod
- TanStack Table
- Recharts
- Sonner
- Lucide React
- dayjs
- react-number-format
- clsx
- tailwind-merge
- class-variance-authority
- next/font/local
- next-themes
- tailwindcss-animate
- dotenv

## Funcionalidades
 

- dashboard com visão consolidada do negócio
- exibição de receita total
- exibição de receita do dia
- exibição de total de vendas
- exibição de valor total do estoque
- exibição de total de produtos cadastrados
- gráfico de receita dos últimos 14 dias
- listagem dos produtos mais vendidos
- cadastro de produtos
- edição de produtos
- exclusão de produtos
- listagem de produtos em tabela
- indicação visual de produto em estoque e fora de estoque
- cadastro de vendas com múltiplos produtos
- edição de vendas
- exclusão de vendas
- listagem de vendas em tabela
- cálculo de total da venda no cliente antes da confirmação
- decremento de estoque ao registrar venda
- recomposição de estoque ao editar venda
- invalidação de cache com revalidação de rotas após mutações
- endpoint HTTP em `/api/products` para consulta e criação de produtos
 
## Arquitetura e organização
O projeto segue uma arquitetura server-first com Next.js App Router. As páginas são majoritariamente Server Components e ficam responsáveis por buscar dados no servidor, enquanto a interatividade mais rica fica concentrada em componentes cliente específicos, como formulários, diálogos, tabelas e seletores.

### Como o projeto está organizado
- `app/`: núcleo da aplicação, com rotas, layout e camadas internas
- `app/(dashboard)/`: dashboard principal agrupado sem impactar a URL
- `app/products/`: módulo de gestão de produtos
- `app/sales/`: módulo de gestão de vendas
- `app/_actions/`: Server Actions organizadas por domínio
- `app/_data-access/`: camada de leitura e agregação de dados
- `app/_components/`: componentes compartilhados e componentes base de UI
- `app/_helpers/`: helpers puros, como formatação monetária
- `app/_lib/`: infraestrutura e utilitários centrais, como Prisma e safe actions
- `prisma/`: schema e migrations do banco

### Separação de responsabilidades
- páginas: composição da tela e orquestração dos dados
- data-access: queries de leitura e agregações de dashboard
- server actions: escrita, atualização, deleção e regras transacionais
- componentes compartilhados: layout, navegação, badges e UI base
- componentes de rota: detalhes específicos de cada domínio

Essa separação reduz acoplamento e facilita manutenção. O projeto evita concentrar toda a lógica nas páginas e distribui responsabilidades em camadas pequenas e previsíveis.

### Estrutura de componentes
O projeto adota co-location: componentes muito específicos ficam próximos da rota que os utiliza, enquanto os reutilizáveis ficam em `app/_components` e `app/_components/ui`. Isso melhora navegação no código e reduz ruído entre domínios.

Exemplos observados:

- cards e seções da dashboard ficam em `app/(dashboard)/_components`
- dialogs, colunas e ações de produtos ficam em `app/products/_components`
- sheets, dropdowns e colunas de vendas ficam em `app/sales/_components`

### Padrão utilizado
Os padrões mais evidentes no código são:

- App Router com organização por domínio
- server-first rendering
- co-location de componentes por rota
- separação entre leitura (`_data-access`) e escrita (`_actions`)
- composição de UI com shadcn/ui + Radix UI
- validação com schema compartilhado via Zod
- ações seguras e tipadas com next-safe-action

### Comunicação cliente ↔ servidor
O fluxo cliente-servidor acontece de duas formas principais:

1. leitura de dados via Server Components e funções em `app/_data-access`
2. mutações via Server Actions chamadas por componentes cliente com `useAction`

Na prática, o cliente envia payloads para uma action tipada, a action valida com Zod, executa regras de negócio com Prisma e em seguida chama `revalidatePath` para atualizar os dados exibidos.

 
### Validação
A validação usa Zod nos schemas das actions e React Hook Form com resolver no cliente. Isso cria um contrato consistente entre formulário, action e banco, reduzindo discrepâncias entre frontend e backend.

Exemplos :

- validação de produto com nome obrigatório, preço positivo e estoque inteiro mínimo
- validação de venda com lista de produtos e quantidades válidas
- retorno de erros de validação do servidor com `next-safe-action`

### Persistência
A persistência é feita com Prisma sobre PostgreSQL. O modelo contém três entidades centrais:

- `Product`
- `Sale`
- `SaleProduct`

A tabela `SaleProduct` representa o relacionamento entre vendas e produtos, guardando também `quantity` e `unitPrice`. Essa decisão é tecnicamente relevante porque preserva o preço praticado no momento da venda, mesmo que o preço do produto mude depois.

Também há uso de:

- `db.$transaction()` para operações atômicas em vendas
- `onDelete: Cascade` nas relações do Prisma
- consultas com Prisma Client para CRUD
- consultas com SQL bruto em métricas do dashboard

## Pontos interessantes nesse projeto
Este projeto evidencia várias decisões técnicas relevantes para portfólio:

- A separação entre `page`, `_data-access` e `_actions` mostra uma forma prática de manter o código organizado por responsabilidade.
- O uso de Server Actions reduz a necessidade de criar endpoints REST para cada mutação simples, sem abrir mão de tipagem e validação.
- O uso de `next-safe-action` melhora a segurança de chamadas cliente-servidor e centraliza o contrato de entrada.
- O padrão de co-location aproxima componentes da funcionalidade real e facilita manutenção por domínio.
- O uso de Zod junto com React Hook Form evita duplicação de regras e reduz inconsistências de dados.
- O uso de `db.$transaction()` no fluxo de vendas mostra preocupação com consistência do estoque.
- O armazenamento do `unitPrice` em `SaleProduct` demonstra entendimento de modelagem orientada a histórico.
- A dashboard combina consultas diretas e agregações especializadas, o que é útil quando métricas exigem leitura mais analítica que CRUD tradicional.
- O uso de Suspense com Skeleton na dashboard melhora percepção de carregamento.
- A componentização dos cards e seções reduz repetição e deixa o layout mais fácil de evoluir.

 
 
## Como executar o projeto

### Pré-requisitos
- Node.js 18 ou superior
- npm
- PostgreSQL disponível localmente ou remotamente
- variável de ambiente `DATABASE_URL` configurada

### Instalação
```bash
npm install
```

### Rodando localmente
1. configure a variável `DATABASE_URL`
2. gere o client do Prisma
3. aplique as migrations
4. inicie o servidor de desenvolvimento

Comandos sugeridos:

```bash
npm install
npx prisma migrate dev
npm run dev
```

Outros scripts disponíveis:

```bash
npm run build
npm run start
npm run lint
```

Observação:

- o projeto possui `prepare: prisma generate`, então a geração do client faz parte do fluxo de setup


## Estrutura de pastas
Resumo das pastas mais importantes:

```text
app/
├── (dashboard)/        # dashboard principal e componentes associados
├── _actions/           # Server Actions por domínio
├── _components/        # componentes compartilhados e UI base
├── _data-access/       # leitura de dados e métricas
├── _helpers/           # helpers utilitários
├── _lib/               # infraestrutura, Prisma e safe-action
├── _schemas/           # não identificado em uso relevante no fluxo atual
├── api/                # rotas HTTP auxiliares
├── products/           # telas e componentes de produtos
├── sales/              # telas e componentes de vendas
├── layout.tsx          # layout raiz com sidebar
└── globals.css         # estilos globais

prisma/
├── schema.prisma       # modelagem do banco
└── migrations/         # histórico de migrações
```

Explicação das principais áreas:

- `app/(dashboard)`: concentra indicadores, cards e visualizações analíticas
- `app/products`: CRUD de produtos
- `app/sales`: CRUD de vendas e fluxo de seleção de produtos
- `app/_actions`: mutações do sistema com regras de negócio
- `app/_data-access`: consultas desacopladas da camada de UI
- `app/_components/ui`: base visual reaproveitável, fortemente inspirada em shadcn/ui
- `prisma/`: camada de persistência versionada

 
