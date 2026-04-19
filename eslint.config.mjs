import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import cypress from 'eslint-plugin-cypress';
import mocha from 'eslint-plugin-mocha';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'cypress/videos/**',
      'cypress/screenshots/**',
      'cypress/downloads/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // General TS
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      semi: ['error', 'always'],
      eqeqeq: 'error',
      curly: ['error', 'all'],
      'no-debugger': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-throw-literal': 'error',
      'no-unreachable': 'error',
      'no-fallthrough': 'error',
      'no-unsafe-finally': 'error',

      // Code quality
      'no-var': 'error',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-catch': 'warn',
      'no-useless-return': 'warn',
      'no-trailing-spaces': 'warn',
      'eol-last': ['warn', 'always'],

      // Style (soft)
      quotes: ['warn', 'single', { avoidEscape: true }],
      'comma-dangle': ['warn', 'always-multiline'],
      'object-curly-spacing': ['warn', 'always'],
      'space-infix-ops': 'warn',

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': 'allow-with-description' }],
    },
  },

  // Cypress
  {
    files: ['cypress/**/*.ts', 'cypress.config.ts'],
    plugins: { cypress, mocha },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        context: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,

      // Mocha - quality gates
      'mocha/no-exclusive-tests': 'error',
      'mocha/no-pending-tests': 'error',
      'mocha/no-return-and-callback': 'error',
      'mocha/handle-done-callback': 'error',
      'mocha/no-nested-tests': 'error',
      'mocha/no-identical-title': 'warn',
      'mocha/no-hooks-for-single-case': 'warn',
    },
  },
];
