module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    //可以使用console
    "no-console": 0,
    //规定句末分号
    "semi": [2, "always"],
    //该规则规定了分号前后的空格，具体规定如下。
    "semi-spacing": [2, { "before": false, "after": true }],
    //代码块前面需要加空格
    "space-before-blocks": [2, "always"],
    //基于eslint-plugin-react，用react规则测试react组件
    "react/jsx-uses-react": 2,
    //基于eslint-plugin-react，用react规则测试变量
    "react/jsx-uses-vars": 2,
    //禁止出现重复的 case 标签
    "no-duplicate-case": 2,
    //禁用行尾空格
    "no-trailing-spaces": 2,
    //禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    "no-undef": 2,
    //禁止使用没有必要的三元操作符，因为用些三元操作符可以使用其他语句替换
    "no-unneeded-ternary": [2, { "defaultAssignment": false }],
    //禁止对象字面量中出现重复的 key
    "no-dupe-keys": 2,
    //禁止不必要的布尔转换
    "no-extra-boolean-cast": 2,
    //禁止不必要的分号
    "no-extra-semi": 2,
    //禁止 function 定义中出现重名参数
    "no-dupe-args": 2,
    //禁止对 function 声明重新赋值
    "no-func-assign": 2,
    //要求使用 === 和 !==
    "eqeqeq": 2,
    //禁用 eval()
    "no-eval": 2,
    //禁止不必要的 .bind() 调用
    "no-extra-bind": 2,
    //禁止空格和 tab 的混合缩进
    "no-mixed-spaces-and-tabs": 2,
    //禁止出现多行空行
    "no-multiple-empty-lines": 2,
    //强制箭头函数的箭头前后使用一致的空格
    "arrow-spacing": 2,
    //要求使用 let 或 const 而不是 var
    "no-var": 2,
    //要求使用 const 声明那些声明后不再被修改的变量
    "prefer-const": 2,
    //要求使用模板字面量而非字符串连接
    "prefer-template": 2,
    //在定义对象或数组时，最后一项不能加逗号
    "comma-dangle": [2, "never"]
  }
};