# demo-react-design-patterns

Esse repositório contém uma aplicação React que é usada como uma demonstração para mostrar como implementar diferentes padrões de design na construção de aplicativos React.

Aplicação Web hospedada no Github Pages: [https://guilhermerodrigues680.github.io/demo-react-design-patterns/]

## Design Patterns

Os padrões abaixo foram aplicados com base no video [3 VUE DESIGN PATTERNS You Should Try In Your Code (Backup Miles)](https://youtu.be/e8AOeEAeoR8).

1. Container/Presentational
2. Higher Order Component
3. Provide/Inject

## Executando o projeto localmente

O projeto foi criado usando o Vite: [Vite | Getting Started](https://vitejs.dev/guide/#getting-started).

Para executá-lo é necessário um ambiente com o **Node.js 16** e **npm 8**.

Se em seu ambiente você precisa usar multiplas versões do Node.js, cheque as ferramentas [nvm](https://github.com/nvm-sh/nvm) ou [nvm-windows](https://github.com/coreybutler/nvm-windows).

Em um ambiente que atenda os requisitos, execute na raiz do projeto:

```sh
# Instala as dependências do projeto
npm install

# Executa a versão de desenvolvimento com live-reload
npm run dev
```

## Deploy Github Pages

Em um ambiente que atenda os requisitos, execute na raiz do projeto:

```sh
# Instala as dependências do projeto
npm version

# Cria um versão e triga os scripts `version` e `postversion` do package.json.
npm version patch -m "Lançamento da versão %s"
```
