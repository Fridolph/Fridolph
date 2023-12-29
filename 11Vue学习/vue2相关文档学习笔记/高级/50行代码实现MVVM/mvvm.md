https://juejin.im/post/5b1fa77451882513ea5cc2ca?utm_source=gold_browser_extension

```js
class Vue {
  constructor(opt) {
    this.opt = opt
    this.observe(opt.data)
    let root = document.querySelector(opt.el)
    this.compile(root)
  }
  // 为响应式对象data里的每一个key绑定一个观察者对象
  observe() {
    Object.keys(data).forEach(key => {
      let obv = new Observer()
      data['_' + key] = data[key]
      Object.defineProperty(data, key, {
        get() {
          Observer.target && obv.addSubNode(Observer.target)
          return data['_' + key]
        },
        set(newVal) {
          obv.update(newVal)
          data['_' + key] = newVal
        }
      })
    })
  }
  // 初始化页面，遍历DOM，收集每一个key的变化，随之调整位置，以观察者方法存放起来
  compile(node) {
    [].forEach.call(node.childNodes, child => {
      if (!child.firstElementChild && /\{\{(.*)\}\}/.test(child.innerHTML)) {
        let key = RegExp.$1.trim()
        child.innerHTML = child.innerHTML.replace(new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'gm'), this.opt.data[key])
        Observer.target = child
        this.opt.data[key]
        Observer.target = null
      } else if (child.firstElementChild) {
        this.compile(child)
      }
    })
  }
}
// 常规观察者类
class Observer {
  constructor() {
    this.subNode = []
  }
  addSubNode(node) {
    this.subNode.push(node)
  }
  update(newVal) {
    this.subNode.forEach(node => {
      node.innerHTML = newVal
    })
  }
}
```

重点分析，梳理一下这段代码的思路，顺便了解下MVVM闭包的艺术

* observe函数 首先我们会对需要响应式的data对象进行for循环遍历，为data的每一个key映射一个观察者对象
  * 在ES6中，for循环每次执行，都可以形成闭包，因此这个观察者对象就存放在闭包中
  * 闭包形成的本质是**内层作用域中堆地址的暴露**，这里我们巧妙地用getter/setter函数暴露了for循环的观察者

* compile函数 我们从根节点向下遍历DOM，遇到mustache形式的文本，则映射成data.key对应的值，同时记录到观察者中
  * 当遍历到{{xxx}}形式的文本时，我们正则匹配出其中的变量，将它替换成data中的值
  * 为了满足后续响应式的更新，将该节点存储在key对应的观察者对象中，我们用getter函数巧妙地操作了闭包
  * 在页面初次渲染后，后续的eventLoop中，如果修改了key的值，实际会通过setter触发观察者的update函数，完成响应式更新
