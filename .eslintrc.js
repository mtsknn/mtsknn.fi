module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['prettier'],
  rules: {
    // Allow modifying parameter properties.
    // This rule is really meant to avoid mutating the `arguments` object
    // as mentioned in https://stackoverflow.com/a/42399879
    'no-param-reassign': ['error', { props: false }],

    // Allow function hoisting
    // as it sometimes allows cleaner code
    'no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
    ],

    'prettier/prettier': 'error',

    // The following Airbnb rules need to be re-defined
    // because the Prettier rules override them
    quotes: ['error', 'single', { avoidEscape: true }],
  },
}
