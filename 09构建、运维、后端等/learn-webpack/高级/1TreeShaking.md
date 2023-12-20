## Tree Shaking

当引入一个模块的时候，不引入所有代码，只引入需要的代码

---

Tree Shaking 只支持ES Module (import 静态引入方式)

还需要在 package.json 里

增加 `"sideEffects": ["@babel/poly-fill"]` 来控制，

上面这行是说， 加入 @babel/poly-fill 的不需要做tree-shaking

`"sideEffects": false`
