Consulte o [AGENTS.md](AGENTS.md) para orientações sobre testes, mocks e CI.

Resumo rápido:

- Testes: `jest` + `jest-expo` + `@testing-library/react-native`.
- Comandos: `yarn test`, `yarn lint`.
- CI: `.github/workflows/ci.yml` roda lint e testes em `push`/`pull_request`.

Adicione notas específicas para novos mocks em `AGENTS.md`.
Observações recentes:
- Adicionado `src/components/forms/recipe-form.test.tsx` (validação + submit).
- Novos mocks adicionados: `expo-image-picker`, `expo-sqlite`, `react-native-keyboard-controller`.
