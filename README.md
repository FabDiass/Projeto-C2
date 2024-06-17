# Projeto C2
Este é o projeto prático da C2, uma API implementada usando NodeJS, TypeScript, Prisma e SQLite. A API segue o padrão MVC e inclui funcionalidades para gerenciar usuários, autenticação, posts e comentários.

## Requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## Instalação

1. Clone o repositório para o seu ambiente local:

   ```bash
   git clone <URL-do-repositorio>

2. Navegue até o diretório do projeto: cd Projeto-C2
3. Instale as dependências do projeto: npm install

4. Configuração do Banco de Dados
Certifique-se de que o Prisma esteja configurado para usar o SQLite. No arquivo prisma/schema.prisma, verifique se a configuração está conforme abaixo:
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  posts     Post[]
  comments  Comment[]
}

model Post {
  id         Int       @id @default(autoincrement())
  title      String
  content    String
  published  Boolean   @default(false)
  authorId   Int
  author     User      @relation(fields: [authorId], references: [id])
  comments   Comment[]
}

model Comment {
  id        Int    @id @default(autoincrement())
  content   String
  postId    Int
  post      Post   @relation(fields: [postId], references: [id])
  userId    Int
  user      User   @relation(fields: [userId], references: [id])
}
5.Gere o cliente Prisma e migre o banco de dados:
npx prisma generate
npx prisma migrate dev --name init

6.Inicie o servidor em modo de desenvolvimento:
npm run dev

7.Acesse a API através do endereço:
http://localhost:3000


