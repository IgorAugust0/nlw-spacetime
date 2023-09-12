<h1 align="center">
  <a href="https://github.com/IgorAugust0/NLW-Spacetime"><img src="https://raw.githubusercontent.com/IgorAugust0/IgorAugust0.github.io/ad51e6474a9396031d0daf8738f0c60ab1996de2/assets/nlw/spacetime/logo.svg" alt="Markdownify" width="300"></a>
  <br>
  NLW Spacetime - Cápsula do Tempo
</h1>

<p align="center" style="margin-top: 2em;">
</p>

 <p align="center">
Cápsula do Tempo é uma aplicação full-stack, do back-end ao mobile, que funciona como uma cápsula do tempo guardando memórias passadas numa timeline, utilizando React, Tailwind, Node, Fastify, TypeScript, Expo, Next.js e muito mais.
</p>

<p align="center">
  <a href="#information_source-como-executar">ℹ️ Como Executar?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">🚀 Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#art-layout">🎨 Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-autores">💻 Autores</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">📝 Licença</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/made%20by-Igor%20Augusto-8257e5?style=flat-square">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/igoraugust0/nlw-spacetime?color=8257e5&style=flat-square">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/igoraugust0/nlw-spacetime?color=8257e5&style=flat-square">
  <a href="https://github.com/IgorAugust0/nlw-spacetime/commits/main/">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/igoraugust0/nlw-spacetime?color=8257e5&style=flat-square">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-8257e5?style=flat-square">
  </a>
</p>

![cover](https://raw.githubusercontent.com/IgorAugust0/IgorAugust0.github.io/main/assets/nlw/spacetime/cover.png)

> NLW Spacetime é uma aplicação de recordação de memórias, onde o nosso usuário poderá adicionar à uma timeline textos, fotos e vídeos de acontecimentos marcantes da sua vida, organizados por mês e ano.

# :information_source: Como Executar?

## Clonar o Repositório

```bash
git clone https://github.com/IgorAugust0/nlw-spacetime
```

## :desktop_computer: Server

```bash
# Acesse a pasta do servidor
cd server

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Preencha as variáveis no arquivo .env, deve-se criar dois 
# conjuntos de variáveis, um para o web e outro para o mobile
# GITHUB_CLIENT_ID=""
# GITHUB_CLIENT_SECRET=""

# Execute o Prisma para criar as tabelas
npx prisma migrate dev

# Inicie o servidor
npm dev
```

## :globe_with_meridians: Web

```bash
# Com o servidor iniciado, acesse a pasta do projeto Web
cd ../web

# Instale as dependências
npm install

# Configure a variável de ambiente
cp .env.example .env.local

# Preencha a variável no arquivo .env
# NEXT_PUBLIC_GITHUB_CLIENT_ID=

# Inicie o projeto Web
npm dev
```

## :iphone: Mobile

```bash
# Com o servidor iniciado, acesse a pasta do projeto Mobile
cd ../mobile

# Instale as dependências
npm install

# Inicie o projeto Mobile (ios está disponível apenas em máquinas com MacOS,
# porém é possível escanear o QR Code com um dispositivo físico iOS)
npx expo start

# Acesse o aplicativo Expo no seu celular e escaneie o QR Code
```

> ➡️ Acesse [http://localhost:3000](http://localhost:3000) para acessar a aplicação web.

# :rocket: Tecnologias

| Front-End Web                                                                                                                                                                | Mobile                                                                                                                                                                                             | Back-End                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Typescript Badge](https://img.shields.io/badge/Typescript-3178C6.svg?style=for-the-badge&logo=Typescript&logoColor=white)](https://www.typescriptlang.org/)               | [![React Native Badge](https://img.shields.io/badge/React%20Native-61DAFB.svg?style=for-the-badge&logo=React&logoColor=white)](https://reactnative.dev/)                                           | [![Node.js Badge](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=Node.js&logoColor=white)](https://nodejs.org/)                                 |
| [![Next.js Badge](https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=Next.js&logoColor=white)](https://nextjs.org/)                                    | [![Safe Area Context Badge](https://img.shields.io/badge/Safe%20Area%20Context-000000.svg?style=for-the-badge&logo=React&logoColor=white)](https://reactnavigation.org/docs/getting-started)       | [![Typescript Badge](https://img.shields.io/badge/Typescript-3178C6.svg?style=for-the-badge&logo=Typescript&logoColor=white)](https://www.typescriptlang.org/)            |
| [![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-38B2AC.svg?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white)](https://tailwindcss.com/)            | [![React Native Screens Badge](https://img.shields.io/badge/React%20Native%20Screens-000000.svg?style=for-the-badge&logo=React&logoColor=white)](https://github.com/wix/react-native-navigation)   | [![Prisma Badge](https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)                                 |
| [![Autoprefixer Badge](https://img.shields.io/badge/Autoprefixer-000000.svg?style=for-the-badge&logo=Autoprefixer&logoColor=white)](https://autoprefixer.github.io/)         | [![React Native SVG Badge](https://img.shields.io/badge/React%20Native%20SVG-00D8FF.svg?style=for-the-badge&logo=React&logoColor=white)](https://github.com/software-mansion/react-native-svg)     | [![Supabase Badge](https://img.shields.io/badge/Supabase-24b47e.svg?style=for-the-badge&logo=Supabase&logoColor=white)](https://supabase.com/)                            |
| [![PostCSS Badge](https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=for-the-badge&logo=PostCSS&logoColor=white)](https://postcss.org/)                                   | [![Typescript Badge](https://img.shields.io/badge/Typescript-3178C6.svg?style=for-the-badge&logo=Typescript&logoColor=white)](https://www.typescriptlang.org/)                                     | [![Zod Badge](https://img.shields.io/badge/Zod-E5A00D.svg?style=for-the-badge&logo=Zod&logoColor=white)](https://github.com/colinhacks/zod)                               |
| [![Lucide React Badge](https://img.shields.io/badge/Lucide%20React-000000.svg?style=for-the-badge&logo=React&logoColor=white)](https://github.com/lucide-icons/lucide)       | [![Expo Badge](https://img.shields.io/badge/Expo-000020.svg?style=for-the-badge&logo=Expo&logoColor=white)](https://expo.dev/)                                                                     | [![Fastify Badge](https://img.shields.io/badge/Fastify-000000.svg?style=for-the-badge&logo=Fastify&logoColor=white)](https://www.fastify.dev/)                            |
| [![Axios Badge](https://img.shields.io/badge/Axios-007ACC.svg?style=for-the-badge&logo=Axios&logoColor=white)](https://axios-http.com/)                                      | [![Expo Image Picker Badge](https://img.shields.io/badge/Expo%20Image%20Picker-4630EB.svg?style=for-the-badge&logo=Expo&logoColor=white)](https://docs.expo.dev/versions/latest/sdk/imagepicker/)  | [![Dotenv Badge](https://img.shields.io/badge/Dotenv-007A82.svg?style=for-the-badge&logo=Dotenv&logoColor=white)](https://github.com/motdotla/dotenv)                     |
| [![ESLint Badge](https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white)](https://eslint.org/)                                       | [![Expo Auth Session Badge](https://img.shields.io/badge/Expo%20Auth%20Session-4E3FB1.svg?style=for-the-badge&logo=Expo&logoColor=white)](https://docs.expo.dev/versions/latest/sdk/auth-session/) | [![ESLint Badge](https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white)](https://eslint.org/)                                    |
| [![js-cookie Badge](https://img.shields.io/badge/js--cookie-FF9800.svg?style=for-the-badge&logo=javascript&logoColor=white)](https://github.com/js-cookie/js-cookie)         | [![Expo Constants Badge](https://img.shields.io/badge/Expo%20Constants-FFD700.svg?style=for-the-badge&logo=Expo&logoColor=black)](https://docs.expo.dev/versions/latest/sdk/constants/)            | [![Fastify CORS Badge](https://img.shields.io/badge/Fastify%20CORS-FF6B00.svg?style=for-the-badge&logo=Fastify&logoColor=white)](https://github.com/fastify/fastify-cors) |
| [![jwt-decode Badge](https://img.shields.io/badge/jwt--decode-000000.svg?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white)](https://github.com/auth0/jwt-decode) | [![Expo Crypto Badge](https://img.shields.io/badge/Expo%20Crypto-4B0082.svg?style=for-the-badge&logo=Expo&logoColor=white)](https://docs.expo.dev/versions/latest/sdk/crypto/)                     | [![Fastify JWT Badge](https://img.shields.io/badge/Fastify%20JWT-007A82.svg?style=for-the-badge&logo=Fastify&logoColor=white)](https://github.com/fastify/fastify-jwt)    |

# :art: Layout

### :globe_with_meridians: Layout Desktop

## ![web](https://raw.githubusercontent.com/IgorAugust0/IgorAugust0.github.io/main/assets/nlw/spacetime/web.png)

### :iphone: Layout Mobile

![mobile](https://raw.githubusercontent.com/IgorAugust0/IgorAugust0.github.io/main/assets/nlw/spacetime/mobile.png)

# :hammer_and_wrench: To-Do

- [ ] Edição de memória (página de detalhe da memória)
- [ ] Link para compartilhar memória
- [ ] Selecionar data da memória (com DateTimePicker)
- [ ] Layout responsivo

# :computer: Autores

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/IgorAugust0/">
        <img src="https://avatars.githubusercontent.com/u/79866605?v=4" width="100px;" alt="Avatar do autor"/>
        <br />
        <sub>
          <b>Igor Augusto</b>
        </sub>
       </a>
       <br />
       <a href="" title="Linkedin">@igoraugusto 💻</a>
       <br />
    </td>
    <td align="center">
      <a href="http://github.com/rocketseat/">
        <img src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4" width="100px;" alt="Logo da Rocketseat"/>
        <br />
        <sub>
          <b>Rocketseat</b>
        </sub>
       </a>
       <br />
       <a href="http://github.com/rocketseat/" title="git">@rocketseat 🚀</a>
       <br />
    </td>
  </tr>
</table>

# :memo: Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo de [licença](./LICENSE) para mais detalhes.
