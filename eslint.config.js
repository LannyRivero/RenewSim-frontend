import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import babelParser from '@babel/eslint-parser'; // Importamos el parser de Babel

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      parser: babelParser, // Usamos el parser de Babel para entender JSX
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': ['error'], // Aseguramos que las violaciones de Prettier sean reportadas como errores
      'react/prop-types': 'off', // Desactiva la regla de PropTypes de React si no la usas
      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.jsx', '.js'] },
      ],
      'react/react-in-jsx-scope': 'off', // Si usas React 17+, no es necesario importar React
      'react/jsx-uses-react': 'off', // Desactiva esta regla también para React 17+
    },
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['off'],
    },
  },
];
