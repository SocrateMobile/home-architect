import { defineConfig } from 'vitest/config';

// Tests unitaires du frontend (constat F164) : logique pure de src/core et des modules
// partagés. happy-dom fournit DOM, DOMParser, Blob, TextEncoder… sans navigateur.
export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['tests/frontend/**/*.test.ts'],
    restoreMocks: true,
    unstubGlobals: true
  }
});
