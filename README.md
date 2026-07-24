# 📱 Receita de Bolso

O **Receita de Bolso** é um aplicativo mobile desenvolvido com **Expo** e **React Native**, pensado para ser um livro de receitas digital leve e prático. Ele permite criar, editar, buscar e exportar receitas diretamente do celular, com suporte a imagens, categorias e persistência local.

## 📑 Sumário

- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias e Ferramentas Utilizadas](#-tecnologias-e-ferramentas-utilizadas)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Testes](#-testes)
- [Build e Publicação (EAS)](#-build-e-publicação-eas)
- [Atualizações Recentes](#-atualizações-recentes)
- [Dicas Rápidas](#-dicas-rápidas)

---

## 🚀 Funcionalidades Principais

### 1. 🏠 Tela Home

- **Busca de receitas** por nome.
- **Filtro por categoria** para navegar rapidamente entre tipos como doces, salgados e saudáveis.
- **Exportação para PDF** das receitas cadastradas usando `expo-print` e `expo-sharing`.

### 2. ➕ Cadastro de Receita

- **Formulário completo** com campos de nome, descrição, categoria, tempo de preparo, ingredientes e preparo.
- **Upload de imagem** via galeria ou câmera com `expo-image-picker`.
- **Validação em tempo real** usando `react-hook-form` e `yup`.
- **Modo de edição** para atualizar receitas existentes.

### 3. 📖 Tela de Detalhes

- Exibição de **imagem de capa** usando `expo-image`.
- Lista organizada de ingredientes e etapas.
- Ações para **editar**, **excluir** e **exportar** a receita.

### 4. ⚙️ Configurações e Internacionalização

- Suporte a seleção de idioma com formulário de configuração em `src/components/forms/config-form.tsx`.
- Tradução básica entre `pt` e `en` via `src/i18n`.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

- **Expo**: `~54.0.36`
- **React Native**: `0.81.5`
- **React**: `19.1.0`
- **Expo Router**: `~6.0.24`
- **React Query**: `@tanstack/react-query` v5
- **Drizzle ORM**: `1.0.0-rc.4`
- **React Hook Form**: `^7.81.0`
- **Yup**: `^1.7.1`
- **Expo Image**: `~3.0.11`
- **Expo Image Picker**: `~17.0.11`
- **Expo SQLite**: `~16.0.10`
- **Expo Print / Expo Sharing**: `~15.0.x`
- **Zustand** para gerenciamento simples de estado local.

---

## 📦 Como Rodar o Projeto

### Pré-requisitos

- **Node.js** 18 ou superior
- **Yarn** (recomendado)
- **Expo Go** para testar em dispositivos físicos

### Passos

```bash
cd receita-de-bolso
yarn install
yarn start
```

Para abrir no Android, pressione `a`. Para iOS, pressione `i`.

Se precisar limpar cache:

```bash
yarn start --reset-cache
```

---

## 🧪 Testes

O projeto usa `jest` com `jest-expo` e `@testing-library/react-native`.

### Comandos principais

```bash
yarn test
yarn test --runInBand
yarn lint
```

### Observações de testes

- Há mocks em `__mocks__/` para `expo-router`, `expo-image`, `expo-image-picker`, `expo-sqlite`, `async-storage` e `react-native-keyboard-controller`.
- O arquivo de teste principal do formulário é `src/components/forms/recipe-form.test.tsx`.
- O setup do Jest é feito em `jest-setup.ts`.

---

## 🏗️ Build e Publicação (EAS)

O projeto possui configuração EAS via `eas.json`.

### Build

```bash
npx eas build --platform android --profile production
npx eas build --platform ios --profile production
```

### Atualização OTA

```bash
npx eas update --channel production --message "Atualização do app"
```

---

## 🔧 Atualizações Recentes

- Formulário de receita revisado com validação completa e suporte a edição.
- Upload de imagem aprimorado com `expo-image` e `expo-image-picker`.
- Suporte a categorias e tempo de preparo no cadastro.
- Testes automatizados adicionados para o formulário e validação do schema.
- Mocks de Jest atualizados para compatibilidade com `jest-expo`.
- Configuração de idioma (`pt` / `en`) integrada em `src/components/forms/config-form.tsx`.

---

## 📌 Dicas Rápidas

- Use `yarn` para instalar e executar o projeto.
- Sempre rode `yarn test` e `yarn lint` antes de subir alterações.
- Se for alterar testes que dependem de módulos nativos, atualize o mock correspondente em `__mocks__/`.
