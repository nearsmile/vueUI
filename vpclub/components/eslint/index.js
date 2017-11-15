/**
 * 主要依据以下三条规则，对ESLint所有的配置项进行定制化
 * 1. 能够帮助发现代码错误的规则，全部开启
 * 2. 配置不应该依赖于某个具体项目，而应尽可能的合理
 * 3. 帮助保持团队的代码风格统一，而不是限制开发体验
 *
 * @fixable 表示此配置支持 --fix
 * @off 表示此配置被关闭了，并且后面说明了关闭的原因
 * 查看规则详解`http://eslint.cn/docs/rules/${rule}`
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
  root: true, // 以当前目录为根目录，不再向上查找 .eslintrc.js
  rules: {

    /**
     * Possible Errors 可能的错误
     * ESLint官方推荐，这些规则与 JavaScript 代码中可能的语法错误或逻辑错误有关
     */

    // 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
    // "for-direction": "error", // "^4.0"

    // 禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求
    // @off 要求太严格了，有时需要在循环中写 await
    "no-await-in-loop": "off",
    // 禁止与负零进行比较
    "no-compare-neg-zero": "error",
    // 禁止条件表达式 if, for, while使用赋值语句，除非这个赋值语句被括号包起来
    "no-cond-assign": [
      "error",
      "except-parens"
    ],
    // 禁止使用 console, @off console使用很常见
    "no-console": "off",
    // 禁止在条件中使用常量表达式, 如 if (true) const foo = 0 ? 'foo' : 'bar'
    "no-constant-condition": [
      "error",
      {
        "checkLoops": false
      }
    ],
    // 禁止在正则表达式中使用控制字符
    // 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/
    // 开启此规则，因为字符串中一般不会出现 Ctrl 键，所以一旦出现了，可能是一个代码错误
    "no-control-regex": "error",
    // 禁用 debugger @fixable
    "no-debugger": "error",
    // 禁止在对象字面量中出现重复名称的键名 key
    "no-dupe-args": "error",
    // 禁止switch 语句中出现重复测试表达式的 case
    "no-duplicate-case": "error",
    // 禁止出现空语句块, 如if(foo){}, catch例外
    "no-empty": [
      "error",
      {
        "allowEmptyCatch": true
      }
    ],
    // 禁止在正则表达式中使用空字符集[]
    "no-empty-character-class": "error",
    // 禁止将 catch 的第一个参数 error 重新赋值
    "no-ex-assign": "error",
    // @fixable 禁止在测试表达式中使用 Boolean
    "no-extra-boolean-cast": "error",
    // @fixable 禁止出现多余的括号，比如 (a * b) + c
    // @off 多余的括号可以使代码更清晰
    "no-extra-parens": "off",
    // @fixable 禁止出现多余的分号，如let a = 1;; function(){};
    "no-extra-semi": "error",
    // 禁止将一个函数申明重新赋值，如 function foo() {} foo = bar
    "no-func-assign": "error",
    // 禁止在 if 内出现函数申明或使用 var 定义变量, let 和 const不受影响
    "no-inner-declarations": [
      "error",
      "both"
    ],
    // 禁止出现非法/无效的正则表达式
    "no-invalid-regexp": "error",
    // 禁止使用特殊空白符（比如全角空格），除非是出现在字符串、正则表达式或模版字符串中
    "no-irregular-whitespace": [
      "error",
      {
        "skipStrings": true,
        "skipComments": false,
        "skipRegExps": true,
        "skipTemplates": true
      }
    ],
    // 禁止将 Math、JSON 和 Reflect 对象当作函数进行调用,必须作为类使用
    "no-obj-calls": "error",
    // 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
    // @off 很多地方会用到 hasOwnProperty
    "no-prototype-builtins": "off",
    // @fixable 禁止在正则表达式中出现连续的空格，必须使用如/foo {3}bar/ 代替
    "no-regex-spaces": "error",
    // 禁止在数组中出现连续的逗号，如 let foo = [,,]
    "no-sparse-arrays": "error",
    // 禁止在普通字符串中出现模版字符串的变量形式，如 'Hello ${name}!'
    "no-template-curly-in-string": "error",
    // 禁止出现难以理解的多行表达式，被认为有问题的模式 不被 semi（结尾分号）规则标记
    "no-unexpected-multiline": "error",
    // 禁止在 return, throw, break 或 continue 之后还有代码
    "no-unreachable": "error",
    // 禁止在 finally 中出现 return, throw, break 或 continue
    "no-unsafe-finally": "error",
    // @fixable 禁止在 in 或 instanceof 操作符的左侧使用感叹号，如 if (!key in object)
    "no-unsafe-negation": "error",
    // 必须使用 isNaN(foo) 而不是 foo === NaN
    "use-isnan": "error",
    // 注释必须符合 jsdoc 的规范
    // @off jsdoc 要求太严格
    "valid-jsdoc": "off",
    // typeof 表达式比较的对象必须是 'undefined', 'object', 'boolean', 'number', 'string', 'function' 或 'symbol'
    "valid-typeof": "error",

    /**
     * Best Practices 最佳实践
     * 这些规则通过一些最佳实践帮助你避免问题
     */

    // 有 setter 的地方必须有 getter，有 getter 的地方可以没有 setter
    "accessor-pairs": [
      "error",
      {
        "setWithoutGet": true,
        "getWithoutSet": false
      }
    ],
    // 数组的一些方法（map, reduce 等）的回调函数中，必须有返回值
    // @off 太严格
    "array-callback-return": "off",
    // 将 var 定义的变量视为块作用域，禁止在块外使用
    "block-scoped-var": "error",
    // 在类的非静态方法中，必须存在对 this 的引用
    // @off 太严格
    "class-methods-use-this": "error",
    // 禁止函数的循环复杂度超过 20
    "complexity": [
      "error",
      {
        max: 20
      }
    ],
    // 禁止函数在不同分支返回不同类型的值
    // @off 太严格
    "consistent-return": "off",
    // @fixable if 后面必须要有 {，除非是单行 if
    "curly": [
      "error",
      "multi-line",
      "consistent"
    ],
    // switch 语句必须有 default
    // @off 太严格
    "default-case": "off",
    // @fixable 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
    "dot-location": [
      "error",
      "property"
    ],
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    "eqeqeq": [
      "error",
      "always",
      {
        "null": "ignore"
      }
    ],
    // for in 内部必须有 hasOwnProperty
    "guard-for-in": "error",
    // 禁止使用 alert
    // @off alert 很常用
    "no-alert": "off",
    // 禁止使用 caller 或 callee
    "no-caller": "error",
    // switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
    "no-case-declarations": "error",
    // 禁止在正则表达式中出现没必要的转义符
    // @off 多于的转义符没有害处，反而还可以使代码更易懂
    "no-div-regex": "off",
    // @fixable 禁止在 else 内使用 return，必须改为提前结束
    // @off else 中使用 return 可以使代码结构更清晰
    "no-else-return": "off",
    // 不允许有空函数，除非是将一个空函数设置为某个项的默认值
    "no-empty-function": [
      "error",
      {
        allow: [
          "functions",
          "arrowFunctions"
        ]
      }
    ]
  }
}
