Consulte o [AGENTS.md](AGENTS.md) para orientações sobre testes, mocks e CI.

Resumo rápido:
- Testes: `jest` + `jest-expo` + `@testing-library/react-native`.
- Comandos: `yarn test`, `yarn lint`.
- CI: `.github/workflows/ci.yml` roda lint e testes em `push`/`pull_request`.

Adicione notas específicas para novos mocks em `AGENTS.md`.
