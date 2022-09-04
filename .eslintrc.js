module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'vue/valid-v-slot': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/prop-name-casing': 'off',
    'vue/multi-word-component-names': 'off'
  },
}
