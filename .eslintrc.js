module.exports = {
  root: true,
  extends: '@sishuguojixuefu',
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'import/no-unresolved': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
}
