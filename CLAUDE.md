Consulte o [AGENTS.md](AGENTS.md) para orientações sobre testes, mocks e CI.

Resumo rápido:

- Testes: `jest` + `jest-expo` + `@testing-library/react-native`.
- Comandos: `yarn test`, `yarn lint`.
- CI: `.github/workflows/ci.yml` roda lint e testes em `push`/`pull_request`.

Adicione notas específicas para novos mocks em `AGENTS.md`.
Observações recentes:

- Adicionado `src/components/forms/recipe-form.test.tsx` (validação, add/remove de ingredientes e passos, e submit com hooks de requisição mockados).
- Novos mocks adicionados: `expo-image-picker`, `expo-sqlite`, `react-native-keyboard-controller`.

Notas técnicas adicionais (testes & CI):

- Os testes usam `jest` + `jest-expo` e `@testing-library/react-native`. Já existem mocks em `__mocks__/` para evitar chamadas a código nativo durante os testes.
- Para isolarmos lógica que usa `drizzle-orm` com `expo-sqlite`, preferimos mockar os hooks de requisição (`@/requests/create-recipe` e `@/requests/update-recipe`) em vez de tentar replicar toda a API síncrona do driver SQLite — isso evita erros como `prepareSync is not a function` durante o teste.
- Se for necessário um teste de integração com DB, crie um mock mais completo de `expo-sqlite` compatível com as APIs que `drizzle-orm` espera, ou rode testes em ambiente com SQLite real.
- Execução local: rode `yarn install` (se ainda não instalado), depois `yarn test` e `yarn lint`.- O app agora também inclui `src/components/forms/config-form.tsx` com seleção de idioma (`pt`/`en`) e tradução básica via `src/i18n`.
- As alterações foram verificadas com `yarn test --runInBand`.- Dependências recomendadas para evitar erros de lint/testes locais (instalar como devDependencies quando necessário):
  - `eslint`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-plugin-react`, `eslint-plugin-react-native`

Se quiser, eu posso: adicionar uma configuração básica de ESLint (`.eslintrc.json`) e/ou adicionar instruções de instalação automática das dependências mencionadas.
