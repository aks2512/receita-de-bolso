# 📱 Receita de Bolso

O **Receita de Bolso** é um aplicativo mobile desenvolvido em React Native com Expo, projetado para ser o seu livro de receitas digital pessoal. Com ele, você pode buscar inspirações culinárias, organizar suas receitas por categorias, criar seus próprios pratos salvando-os localmente e até exportar as receitas em formato PDF para compartilhar com quem quiser.

---

## 🚀 Funcionalidades Principais

O aplicativo é estruturado em três telas principais focadas na experiência do usuário e na praticidade na cozinha:

### 1. 🏠 Tela Home (Listagem)

- **Busca Inteligente**: Barra de pesquisa para encontrar receitas rapidamente pelo nome.
- **Filtro por Categorias**: Botões rápidos para segmentar receitas (ex: Doces, Massas, Saudável, etc.).
- **Exportação Rápida**: Opção de exportar a listagem atual ou receitas selecionadas diretamente para um arquivo PDF.

### 2. ➕ Tela Nova Receita (Cadastro)

- **Formulário Completo**: Campos validados para preenchimento de nome, descrição, ingredientes, passo a passo e categoria.
- **Upload de Imagem**: Integração com a galeria do celular utilizando `expo-image-picker`.
- **Persistência Local**: Todas as receitas criadas são salvas com segurança no armazenamento interno do celular utilizando o `AsyncStorage` (Local Storage).

### 3. 📖 Detalhes da Receita

- **Visualização Imersiva**: Exibição da foto de capa da receita em alta performance com `expo-image`.
- **Organização Clara**: Divisão visual limpa entre ingredientes e as etapas do passo a passo.
- **Gerenciamento Completo**: Opções nativas para:
  - ✏️ **Editar**: Modificar qualquer informação ou foto da receita.
  - 🗑️ **Excluir**: Remover a receita permanentemente do dispositivo com alerta de confirmação.
  - 📄 **Exportar**: Gerar um PDF formatado e bonito da receita específica para impressão ou compartilhamento.

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

Baseado nas especificações técnicas do ecossistema do projeto:

- **Core do App**: `React Native` (v0.74+) & `Expo` (v51) — Garantindo performance nativa e acesso facilitado às APIs do dispositivo.
- **Navegação**: `Expo Router` (v3) — Roteamento baseado em arquivos baseado nos padrões mais modernos da web e mobile.
- **Estilização e Temas**: `StyleSheet` nativo integrado com suporte a **Dark Mode** e **Light Mode** dinâmicos via `useColorScheme`.
- **Gerenciamento de Formulários**: `React Hook Form` — Para captura de dados de forma performática e sem re-renderizações desnecessárias.
- **Manipulação de Imagens**:
  - `expo-image-picker` — Para acessar a galeria de fotos do usuário com controle de permissões.
  - `expo-image` — Componente de imagem otimizado com suporte a cache agressivo e transições suaves.
- **Geradores de PDF**: `expo-print` & `expo-sharing` — Utilizados para converter estruturas HTML em arquivos PDF e abrir o menu de compartilhamento nativo do iOS/Android.

---

## 📦 Como Iniciar o Projeto

Siga os passos abaixo para clonar o repositório, instalar as dependências e rodar o projeto localmente.

### Pré-requisitos

- **Node.js** (Versão 18 ou superior recomendada)
- Gerenciador de pacotes **npm** ou **yarn**
- Aplicativo **Expo Go** instalado no seu celular (disponível na App Store e Google Play) se for testar em dispositivo físico.

### 1. Clonar o Repositório e Instalar Dependências

No seu terminal, execute os comandos:

```bash
# Clone o repositório
git clone https://github.com

# Acesse a pasta do projeto
cd receita-de-bolso

# Instale todas as dependências necessárias
npm install
```

### 2. Iniciar o Servidor de Desenvolvimento

Para rodar o projeto com o Metro Bundler do Expo:

```bash
npx expo start
```

- **No Celular**: Abra a câmera do seu celular e escaneie o **QR Code** que apareceu no terminal (no Android, use o app Expo Go para escanear).
- **No Emulador**: Pressione `a` no teclado para abrir no emulador Android ou `i` para abrir no simulador iOS.

_Dica: Se encontrar problemas com cache de fontes ou rotas ao iniciar, limpe o cache rodando `npx expo start -c`._

---

## 🏗️ Como Gerar a Build e Atualizações (EAS)

Este projeto está configurado para utilizar o **EAS (Expo Application Services)** para geração de builds e atualizações em tempo real.

### 1. Gerar uma Build para Produção/Testes

Certifique-se de estar logado na sua conta Expo (`npx expo login`) e que possui o EAS CLI instalado globalmente (`npm install -g eas-cli`).

Para gerar o arquivo instalável (`.apk` para Android ou `.ipa` para iOS):

```bash
# Build para Android
npx eas build --platform android --profile production

# Build para iOS
npx eas build --platform ios --profile production

# Build para ambas as plataformas simultaneamente
npx eas build --platform all
```

_O Expo processará a build nos servidores deles em nuvem e, ao final, fornecerá o link de download ou a submissão direta para as lojas._

### 2. Enviar Atualizações Rápidas (Over-The-Air)

Se você corrigiu um bug no código JavaScript/TypeScript (como no componente de imagem ou no formulário) e **não adicionou nenhuma biblioteca nativa nova**, você não precisa gerar uma build nova. Pode enviar a correção direto para o celular dos usuários:

```bash
npx eas update --channel production --message "Fix: Correção no botão de deletar imagem e fluxo do formulário"
```

---
