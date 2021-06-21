module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@babel', 'react'],
  extends: ['plugin:react/recommended'],
  rules: {
    'no-console': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-indent': 0,
    'react/jsx-indent-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-unused-prop-types': 1,
    'react/prop-types': 1
  },
};
