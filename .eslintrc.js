module.exports = {
  env: {
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'eslint-config-prettier'],
  plugins: ['eslint-plugin-prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': 'error',
    'newline-before-return': 'error',
  },
};
