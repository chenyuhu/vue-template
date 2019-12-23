module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: ['@sishuguojixuefu/eslint-config', '@vue/prettier', '@vue/typescript'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  rules: {
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0
  }
}
