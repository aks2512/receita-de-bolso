# Project AI Notes — Agents & Tooling

This file documents the testing and CI scaffolding that agent runs and contributors should follow.

## Expo reminder
Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code targeting Expo features.

## Testing
- Test runner: `jest` with `jest-expo` preset.
- Assertion + DOM: `@testing-library/react-native` and `@testing-library/jest-native`.
- Renderer: `react-test-renderer@19.1.0` (must match `react` `19.1.0`).

Run tests locally:
```
yarn install
yarn test
```

Mocks added for tests (see `__mocks__/`):
- `fileMock.js` — static asset stub
- `expo-router.tsx`, `expo-image.tsx` — lightweight component mocks
- `react-native-native-modules.js` — minimal NativeModules mock
- `async-storage.js` — in-memory AsyncStorage mock
- `styleMock.js` — CSS mock

## Continuous Integration
- Workflow file: `.github/workflows/ci.yml`
- Runs on: `push` and `pull_request` to `master`
- Steps: checkout, install, `yarn lint`, `yarn test`

## Notes for AI agents
- When adding tests that import assets via the `@/assets/*` alias, ensure moduleNameMapper in `jest.config.js` includes `^@/assets/(.*)$` mapping to `/assets/`.
- If tests require native modules, add a focused mock under `__mocks__/` and map it in `jest.config.js`.

## Quick checklist for contributors
- Run `yarn install` after pulling changes.
- Run `yarn test` and `yarn lint` locally before pushing.

