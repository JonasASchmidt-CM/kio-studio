import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // Build output and generated token CSS are never linted.
  globalIgnores(['dist', 'src/styles/tokens.css']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      // WCAG 2.1 AA wiring (DECISIONS.md D6): static a11y checks on JSX.
      jsxA11y.flatConfigs.recommended,
      // Must stay LAST: disables stylistic rules that conflict with Prettier.
      eslintConfigPrettier,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // shadcn/ui primitives co-export variant helpers (e.g. `buttonVariants`)
    // next to the component. These are vendored design-system files where
    // fast-refresh granularity does not matter, so relax the rule here only.
    files: ['src/shared/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
