import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // <- point to your tsconfig (relative to this file)
        tsconfigRootDir: __dirname, // <- this fixes the monorepo ambiguity
        ecmaVersion: 2020,
        sourceType: 'module',
        globals: globals.browser,
      },
    },
    extends: [
      js.configs.recommended,
      ts.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
  },
]);
