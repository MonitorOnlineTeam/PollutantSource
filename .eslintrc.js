module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'plugin:compat/recommended'],
    env: {
      browser: true,
      node: true,
      es6: true,
      mocha: true,
      jest: true,
      jasmine: true,
    },
    globals: {
      APP_TYPE: true,
      page: true,
    },
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
      'react/jsx-wrap-multilines': 0,
      'react/prop-types': 0,
      'react/forbid-prop-types': 0,
      'react/jsx-one-expression-per-line': 0,
      'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
      'import/no-extraneous-dependencies': [
        2,
        {
          optionalDependencies: true,
          devDependencies: ['**/tests/**.js', '/mock/**.js', '**/**.test.js'],
        },
      ],
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'linebreak-style': 0,
     
      
      "semi": [2, "always"],//语句强制分号结尾
      "no-extra-semi": 2,//禁止多余的冒号
      "new-cap": [0],//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
      "indent": [2, 4, { "SwitchCase": 1 }],//缩进风格
      "comma-dangle": [2, "only-multiline"],//对象字面量项尾不能有逗号
      "space-before-function-paren": [2, "never"],//函数定义时括号前面要不要有空格
      "operator-linebreak": [2, "after"],//换行时运算符在行尾还是行首
      "no-floating-decimal": [0],//禁止省略浮点数中的0 .5 3.
      "no-const-assign": 2,//禁止修改const声明的变量
      "no-debugger": 1,//禁止使用debugger
      "no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
      "no-dupe-args": 2,//函数参数不能重复
      "no-duplicate-case": 2,//switch中的case标签不能重复
      "no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
      "no-empty": 2,//块语句中的内容不能为空
      "no-eq-null": 2,//禁止对null使用==或!=运算符
      "no-ex-assign": 2,//禁止给catch语句中的异常参数赋值
      "no-extra-parens": 2,//禁止非必要的括号
      "no-func-assign": 2,//禁止重复的函数声明
      "no-inline-comments": 0,//禁止行内备注
      "no-irregular-whitespace": 2,//不能有不规则的空格
      "linebreak-style": [0, "windows"],//换行风格
      "no-multi-spaces": 1,//不能用多余的空格
      "no-plusplus": 0, //启用++ --
      "no-multiple-empty-lines": [1, {"max": 2}],//空行最多不能超过2行
      "no-trailing-spaces": 1,//一行结束后面不要有空格
      "no-this-before-super": 0,//在调用super()之前不能使用this或super
      "no-undef": 1,//不能有未定义的变量
      "no-use-before-define": 2,//未定义前不能使用
      "brace-style": [1, "1tbs"],//大括号风格
      "camelcase": 2,//强制驼峰法命名
      "comma-spacing": 0,//逗号前后的空格
      "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
      "default-case": 2,//switch语句最后必须有default
      "id-length": 0,//变量名长度
      "lines-around-comment": 0,//行前/行后备注
      "object-shorthand": 0,//强制对象字面量缩写语法
      "prefer-const": 0,//首选const
      "spaced-comment": 0,//注释风格要不要有空格什么的
      "use-isnan": 2,//禁止比较时使用NaN，只能用isNaN()
      "valid-typeof": 2,//必须使用合法的typeof的值
      "react/jsx-indent": [2, 4],
      "react/jsx-indent-props": [2, 4],
      "react/jsx-boolean-value": [2, "always"],
      "react/prop-types": [0],
      "jsx-quotes": [2, "prefer-double"],
      "react/jsx-no-bind":0
    },
    settings: {
      polyfills: ['fetch', 'promises', 'url'],
    },
  };
  