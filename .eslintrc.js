module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    // 'react/prop-types': 'off',
    // 'react/react-in-jsx-scope': 'off',
  },
};
