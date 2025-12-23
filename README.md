# stockly

📦 Stockly

Stockly é uma aplicação web em desenvolvimento para gestão de estoque e produtos, permitindo criar, editar, listar e remover produtos de forma organizada e eficiente.

O projeto foi desenvolvido com Next.js (App Router), utilizando Server Actions, Prisma ORM e PostgreSQL, com foco em boas práticas, escalabilidade e separação de responsabilidades.

🚧 Status do Projeto

O projeto está em desenvolvimento ativo.

✅ Módulo de produtos funcional (CRUD)

🧾 Estrutura de vendas em evolução

🧠 Refino contínuo de UI, validações e arquitetura

🚀 Novas funcionalidades serão adicionadas

✨ Funcionalidades
📦 Produtos

➕ Cadastro de produtos

✏️ Atualização de produtos (upsert)

❌ Remoção de produtos

📋 Listagem em tabela com ações

🔎 Visualização individual por produto

💰 Vendas

Estrutura inicial criada

Em desenvolvimento 🚧

🧩 Geral

⚡ Server Actions (Next.js)

📊 Tabelas com TanStack Table

🧪 Validações com Zod

🧱 Componentes reutilizáveis

📱 Interface moderna e responsiva

🛠️ Tecnologias Utilizadas
Frontend

Next.js 14 (App Router)

React 18

TypeScript

Tailwind CSS

TanStack React Table

React Hook Form

Zod

GSAP (animações)

Sonner (notificações)

Backend / Infraestrutura

Server Actions

API Routes

Prisma ORM

PostgreSQL

Node.js

📁 Estrutura do Projeto
app/
 ├── _actions        # Server Actions (produtos)
 ├── _components    # Componentes globais e UI
 ├── _data-access   # Camada de acesso a dados
 ├── _helpers       # Funções utilitárias
 ├── _lib           # Prisma e utils
 ├── api            # API Routes
 ├── products       # Módulo de produtos
 ├── sales          # Módulo de vendas (em desenvolvimento)
 ├── layout.tsx
 └── page.tsx

prisma/
 └── schema.prisma


Essa organização facilita:

Clareza de responsabilidades

Manutenção do código

Evolução do projeto

🚀 Como rodar o projeto localmente
1️⃣ Clone o repositório
git clone git@github.com:zFelipez/stockly.git
cd stockly

2️⃣ Instale as dependências
npm install

3️⃣ Configure as variáveis de ambiente

Crie um arquivo .env na raiz do projeto:

DATABASE_URL="postgresql://usuario:senha@localhost:5432/stockly"

4️⃣ Rode as migrations
npx prisma migrate dev

5️⃣ Inicie o projeto
npm run dev


A aplicação estará disponível em:
👉 http://localhost:3000

📜 Scripts Disponíveis
npm run dev     # Ambiente de desenvolvimento
npm run build   # Build de produção
npm run start   # Executa o build
npm run lint    # Análise de código

🎯 Objetivo do Projeto

Este projeto tem como foco:

Aprendizado prático com Next.js moderno

Uso real de Server Actions

Arquitetura organizada por domínio

Integração completa com banco de dados

Evolução contínua como desenvolvedor

🤝 Contribuições

Contribuições são bem-vindas!
Sinta-se à vontade para abrir uma issue ou pull request.

👤 Autor
 
Projeto criado para estudo, prática e portfólio, junto com o professor Felipe Rocha no seu curso de Next.JS de sua plataforma FullStack Club. 
