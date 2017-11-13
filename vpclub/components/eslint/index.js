/**
 * 主要依据以下三条规则，对ESLint所有的配置项进行定制化
 * 1. 能够帮助发现代码错误的规则，全部开启
 * 2. 配置不应该依赖于某个具体项目，而应尽可能的合理
 * 3. 帮助保持团队的代码风格统一，而不是限制开发体验
 */
module.exports = {
  parser: 'babel-eslint', // 默认Espree
  parserOptions: {
    ecmaVersion: 2017, // 5(默认)
    sourceType: 'module', // ECMAScript模块, 'script'(默认)
    ecmaFeatures: { // 额外的语言特性 默认都是 false
      experimentalObjectRestSpread: true, // 启用对实验性的 object rest/spread properties 的支持
      jsx: true,
      modules: true
    }
  },
  env: {  // 可在js文件使用注释来指定环境/* eslint-env node, mocha */
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  root: true // 以当前目录为根目录，不再向上查找 .eslintrc.js
}
