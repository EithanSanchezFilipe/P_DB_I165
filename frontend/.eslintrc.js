/* eslint-env node */
import '@rushstack/eslint-patch/modern-module-resolution'

export const root = true
export const eslintExtends = [
  'plugin:vue/vue3-essential',
  'eslint:recommended',
  '@vue/eslint-config-typescript',
  '@vue/eslint-config-prettier/skip-formatting'
]
export const overrides = [
  {
    files: [ 'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}' ],
    extends: eslintExtends
  }
]
export const parserOptions = {
  ecmaVersion: 'latest'
}
export const rules = {
  // Note: you must disable the base rule as it can report incorrect errors
  "no-unused-expressions": "off",
  "@typescript-eslint/no-unused-expressions": "error"
}