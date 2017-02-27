// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 'indent': '0',   默认缩进0
    // 这条规则是说 function abc() {}   abc后与括号间必须有一格空格，我们去掉~~
    'space-before-function-paren': 0,
    // a,
    // b, 末尾写逗号不报错
    'comma-dangle': 0,
    // 定义没使用的变量不报错
    'no-unused-vars': 0,
  }
}

