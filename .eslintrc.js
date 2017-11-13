// https://eslint.org/docs/user-guide/configuring
const allow = 0;
const warn = 1;
const error = 2;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': allow,
    // allow async-await
    'generator-star-spacing': allow,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? error : allow,
    'semi': allow,
    // 最佳实践
    'no-compare-neg-zero': error, // 禁止与 -0 进行比较

  }
}
