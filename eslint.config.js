// Configuration ESLint (flat config) — constat F164.
//
// Politique des règles :
//  - « error » : uniquement des bugs réels ou des constructions dangereuses (règles
//    recommandées d'ESLint et de typescript-eslint avec informations de type, règles Lit qui
//    détectent des templates cassés : liaisons invalides ou dupliquées, HTML invalide, super()
//    oublié dans le cycle de vie, `value=` au lieu de `.value`…). `npm run lint` échoue dessus.
//  - « warn » : problèmes réels mais présents dans le code existant et sans risque immédiat
//    (promesses non attendues dans les callbacks Lit, variables inutilisées, catch vides…).
//    Ils restent visibles dans la sortie sans bloquer la CI.
//  - « off » : règles stylistiques ou faux positifs pour ce projet :
//      * no-unsafe-* / no-explicit-any : l'objet `hass` de Home Assistant n'est pas typé ici ;
//      * unbound-method : Lit lie automatiquement `@event=${this.handler}` à l'élément hôte ;
//      * lit/no-this-assign-in-render : signale à tort les affectations dans les handlers
//        fléchés déclarés dans les templates ;
//      * lit/attribute-names, quoted-expressions, no-template-arrow… : purement stylistiques.
import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import lit from 'eslint-plugin-lit';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  globalIgnores([
    'node_modules/',
    'dist/',
    'coverage/',
    // Bundle généré par `vite build` (vérifié en CI par reconstruction).
    'custom_components/home_architect/frontend/'
  ]),

  // Scripts Node et fichiers de configuration.
  {
    files: ['**/*.{js,mjs,cjs}', '*.config.ts'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node }
  },
  {
    files: ['*.config.ts'],
    extends: [tseslint.configs.recommended]
  },

  // Code applicatif, tests et harnais de développement (analyse avec informations de type).
  {
    files: ['src/**/*.ts', 'tests/**/*.ts', 'dev/**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked, lit.configs['flat/recommended']],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      // Bugs réels supplémentaires côté Lit.
      'lit/lifecycle-super': 'error',
      'lit/no-classfield-shadowing': 'error',
      'lit/no-invalid-escape-sequences': 'error',
      'lit/no-value-attribute': 'error',
      'lit/value-after-constraints': 'error',

      // Avertissements : problèmes réels présents dans le code existant.
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }],
      'no-empty': 'warn',
      'prefer-const': 'warn',
      // Un « & » isolé dans un attribut est toléré par le parseur HTML : cosmétique.
      'lit/attribute-value-entities': 'warn',

      // Désactivées : objet `hass` non typé, faux positifs Lit (voir en-tête).
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/unbound-method': 'off'
    }
  },

  // Tests : globaux Node en plus (fixtures lues sur disque, etc.).
  {
    files: ['tests/**/*.ts'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  }
);
