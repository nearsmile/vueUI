# VPClubFETeam ESlint 规则

## 配置原则

主要依据以下三条规则，对ESLint所有的配置项进行定制化

1. 能够帮助发现代码错误的规则，全部开启
1. 配置不应该依赖于某个具体项目，而应尽可能的合理
1. 帮助保持团队的代码风格统一，而不是限制开发体验

## 配置详解

- 对每条规则配置，都有详细的注释，以便查阅每条配置的意义及原因，也方便大家自定义自己的规则以及后续维护
  - 每一条配置都有注释说明及用途
  - 对理解困难的配置会举例说明
  - 对有争议的配置，注释说明原因
  - 对关闭的配置，以`@off`标识说明原因
  - 对可以进行autofix的配置，标注`@autofix`, 命令行的`--fix`选项用来自动修复规则所报告的问题

- 规则说明
  - `"off"` 或 `0` - 关闭规则
  - `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn`(不会导致程序退出)
  - `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error`(当被触发的时候，程序会退出)
  - 在文件注释里配置规则，使用以下格式的注释
  ```js
  // eqeqeq 规则被关闭，curly 规则被启用
  /* eslint eqeqeq: "off", curly: "error" */

  // 可以使用数组字面量，数组的第一项总是规则的严重程度（数字或字符串）
  /* eslint quotes: ["error", "double"], curly: 2 */
  ```
- 引入项目

```js
extends: './vpclub/components/eslint/index.js'
// or
extends: [
  'standard',
  './vpclub/components/eslint/index.js'
]
```

## 参考资料

- [ESLint官方推荐配置文档](http://eslint.cn/docs/rules/)
- [ESLint官方配置说明文档](http://eslint.cn/docs/user-guide/configuring#extending-configuration-files)
- [ESLint源码架构说明文档](http://eslint.cn/docs/developer-guide/architecture)