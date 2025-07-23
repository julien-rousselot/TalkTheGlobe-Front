import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,module.exports = {
        root: true,
        env: {
          browser: true,
          es2021: true,
          node: true,
        },
        parser: '@typescript-eslint/parser',
        parserOptions: {
          ecmaVersion: 'latest',
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
        plugins: ['react', '@typescript-eslint'],
        extends: [
          'eslint:recommended',
          'plugin:react/recommended',
          'plugin:@typescript-eslint/recommended',
        ],
        rules: {
          indent: ['error', 2, { SwitchCase: 1 }],
          semi: ['error', 'always'],
          quotes: ['error', 'single'],
          'no-console': ['warn', { allow: ['warn', 'error'] }],
          'react/react-in-jsx-scope': 'off',
          '@typescript-eslint/explicit-module-boundary-types': 'off',
        },
        settings: {
          react: {
            version: 'detect',
          },
        },
      };
      
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
