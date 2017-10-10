* assert.deepEqual(actual, expected[, message])

测试 actual 参数与 expected 参数是否深度相等。 原始值使用相等运算符（==）比较。

只测试可枚举的自身属性，不测试对象的原型、连接符、或不可枚举的属性（这些情况使用 assert.deepStrictEqual()）。 例如，下面的例子不会抛出 AssertionError，因为 RegExp 对象的属性不是可枚举的：

不会抛出 AssertionError：

    assert.deepEqual(/a/gi, new Date());

Map 和 Set 包含的子项也会被测试。

