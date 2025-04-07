const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.es2021,
        ...globals.jest
      }
    },
    rules: {}
  }
];
