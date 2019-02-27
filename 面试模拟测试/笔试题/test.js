// *组合继承
function Parent(name) {
  this.name = name
  this.players = [1,2,3]
}

function Child() {
  Parent.call(this)
  this.type = 'child5'
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

// *深拷贝
// 1. 变量定义 - 节省性能开销
// 2. for in hasOwnProperty
// 3. 递归
/**
 * 对象的深拷贝
 * @param {Object} source 源对象
 * @param {Object} target 实现拷贝的对象
 */
function deepClone(source, target = {}) {
  let toString = Object.prototype.toString
  let arrType = '[object Array]'

  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (toString.call(source[key]) === arrType) {
          source[key] = []
        } else {
          source[key] = {}
        }
        deepClone(source[key], target[key])
      } else {
        source[key] = target[key]
      }
    }
  }
}

// *JS原型 继承
// 通过构造函数生成的每个实例都包含一个指向原型对象的内部指针 __proto__
// 每个构造函数constructor 都有一个原型对象 prototype
// 原型对象包含一个指向构造函数的指针 constructor

// 原型链并非完美
// 1. 原型链包含引用类型的原型时，该引用类型会被所有实例共享
// 2. 在创建子类型时,不能向超类的构造函数传递参数


function extend(subClass, superClass) {
  let F = function() {}
  F.prototype = superClass.prototype
  subClass.prototype = new F()
  subClass.prototype.constructor = subClass

  subClass.superClass = superClass.prototype
  if (superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass
  }
}

// *说说跨域
// 1. jsonp 利用script标签读取资源没有跨域限制
// 通过动态创建script 读取相应地址的资源 写好相应callback处理
// 2. window.name window.domain + iframe
// 3. websocket socket.io
// 4. CORS 主流 简单请求 复杂请求
// 设置 Origin Access-Control-Allow-Origin
// 5. postMessage
// 6. node proxy server
// 7. nginx

// *网络安全相关
// XSS Cross site Scirpting 跨站脚本攻击 恶意代码注入
// 1. 用户输入转义  2. 白名单过滤
// CSRF cross site request forgery 跨站请求伪造  利用用户的登录状态去发起恶意请求
// 2. get不对数据进行修改 2. 不让第三方拿cookie 3. 阻止第三方请求接口 4. 验证信息 token referrer

// *浏览器输入URL到渲染过程
// 1. 解析URL变为IP dns解析~ 浏览器内部缓存 -> 本地host文件 -> 根域名 -> 顶级域名 -> 主域名
// 2. 经过三次握手与服务器通信建立http连接(SYN -> SYN + ACK -> ACK + 1)
// 3. HTTP报文传输，根据状态码 返回相应资源
// 4. 拿到资源 index.html 读取 请求相应资源 link script 请求线程、渲染引擎线程
// 5. html -> DOM树
// 6. css -> CSSOM树
// 7. render tree -> Layout
// 8. GPU绘制，图层合并，呈现页面
// 9. 浏览器Event loop -> 等待响应用户操作

// 事件循环
// 浏览器
// EventLoop (microTask macroTask) -> Task -> Call Stacks
// 1. 执行完macroTask
// 2. 再去执行所有微任务
// 3. UI rendering ...
// 4. 开启新的一轮EventLoop

// Node
// event loop 六阶段 该阶段的队列事件执行完或到达上限 进入下一阶段
// 1. timer
// 2. IO
// 3. idle , prepare
// 4. poll 执行到一直为空。 看是否有setImmediate，没就下一阶段
// 5. check 也会检查 setImmediate
// 6. close callbacks
