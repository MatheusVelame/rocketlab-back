# 🛒 Sistema de Compras Online - NestJS + Prisma + React

Este é um projeto completo de um sistema de compras online, desenvolvido com as seguintes tecnologias:

- **Backend:** NestJS (TypeScript) + Prisma ORM + SQLite
- **Frontend:** React (TypeScript) + Axios + Styled-Components
- **Banco de dados:** SQLite (persistência leve e local)

---

## 🔥 Funcionalidades

- ✅ Cadastro de produtos com informações associadas (nome, preço, descrição).
- ✅ Listagem de produtos cadastrados.
- ✅ Edição e exclusão de produtos.
- ✅ Busca de produtos por nome.
- ✅ Adição de produtos ao carrinho de compras.
- ✅ Visualização de itens no carrinho.
- ✅ Escolha da quantidade de itens.
- ✅ Exclusão de itens do carrinho.
- ✅ Finalização da compra.

---

## 🚀 Tecnologias Utilizadas

| Stack | Descrição |
| ---- | ----------- |
| **TypeScript** | Linguagem principal do projeto, com tipagem forte e suporte completo no backend e frontend |
| **NestJS** | Framework backend com arquitetura modular e altamente escalável |
| **Prisma ORM** | ORM moderno, utilizado com SQLite |
| **SQLite** | Banco de dados local, leve e eficiente para o projeto |
| **React** | Frontend moderno e reativo |
| **Axios** | Comunicação HTTP com o backend |
| **Styled-Components** | Estilização dos componentes React com CSS-in-JS |


---

## ⚙ Como rodar o projeto

### 🔧 Pré-requisitos

- Node.js instalado
- PNPM instalado

### 🔨 Clonando o projeto

```bash
git clone https://github.com/MatheusVelame/rocketlab-back.git
```

### 💾 Configuração do banco de dados

#### 1. No diretório backend-compras, crie um arquivo *.env*, com o seguinte conteúdo:

```bash
DATABASE_URL="file:./dev.db"
```

### 📦 Instalando dependências

#### 2. Abra dois terminais (um para rodar o Back e o outro para o Front)

### Terminal do Backend

#### 3. Entre no diretório do Backend

```bash
cd rocketlab-back
cd backend-compras
pnpm install
```

#### 4. Em seguida, execute as migrations:

```bash
npx prisma migrate dev --name init
```

#### 5. Gere o client Prisma:

```bash
npx prisma generate
```

#### 6. Aí sim, rode a aplicação do backend

```bash
pnpm start:dev
```

### Terminal do Frontend

#### 7. Entre no diretório do Frontend

```bash
cd rocketlab-back
cd frontend-compras
pnpm install
```

#### 8. Rode a aplicação do frontend

```bash
pnpm dev
```

#### 9. Acesse a aplicação no navegador:

```bash
http://localhost:5173
```

## 🧠 Aprendizados

Durante o desenvolvimento do projeto foi possível:

- Praticar a criação de API RESTful com NestJS.

- Trabalhar com Prisma ORM e banco SQLite.

- Trabalhar com Styled-Components para estilização moderna.

- Criar e consumir APIs no React utilizando Axios.

- Trabalhar com o fluxo completo: CRUD + Carrinho de Compras.

## 🤝 Contribuição

Se quiser contribuir, sinta-se à vontade! 🎉

## 👨‍💻 Contato

<a href="https://github.com/MatheusVelame">
  <img src="https://avatars.githubusercontent.com/MatheusVelame" width="100px;" alt="Foto de Matheus"/><br>
  <sub>
    <b>Matheus V. Pessoa</b>
  </sub>
</a>
