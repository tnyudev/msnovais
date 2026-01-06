# Novais Construtora - Construções e Reformas em Geral

Bem-vindo ao repositório do site institucional da **Novais Construtora**. Este projeto é uma aplicação web moderna desenvolvida para apresentar os serviços, portfólio e informações de contato da empresa.

## 🛠 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

- **[Vite](https://vitejs.dev/)**: Build tool rápida para desenvolvimento web moderno.
- **[React](https://react.dev/)**: Biblioteca JavaScript para construção de interfaces de usuário.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset tipado de JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first para estilização.
- **[shadcn/ui](https://ui.shadcn.com/)**: Coleção de componentes de interface reutilizáveis.
- **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca para animações.

## 🚀 Como Executar o Projeto

Para rodar este projeto localmente, você precisará ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 1. Instalação

Como o projeto não inclui a pasta `node_modules` (o que é padrão), você deve instalar as dependências primeiro. Abra o terminal na pasta do projeto e execute:

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

### 2. Desenvolvimento

Para iniciar o servidor de desenvolvimento e visualizar o site em tempo real:

```bash
npm run dev
```

O site estará disponível (geralmente) em `http://localhost:8080`.

### 3. Build para Produção

Para gerar a versão otimizada para produção:

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist`.

## 📂 Estrutura do Projeto

- **`src/`**: Código fonte da aplicação.
  - **`components/`**: Componentes React reutilizáveis (Hero, Navbar, etc.).
  - **`pages/`**: Páginas da aplicação.
  - **`assets/`**: Imagens e recursos estáticos.
  - **`lib/`**, **`hooks/`**: Utilitários e hooks customizados.
- **`public/`**: Arquivos estáticos públicos (favicon, etc.).

## 🧹 Notas de Manutenção

Este projeto foi auditado e limpo de dependências desnecessárias (como ferramentas de scaffolding "lovable"). Ele está pronto para ser mantido e evoluído como um projeto React padrão.

---

Desenvolvido por **Novais Construtora**.
