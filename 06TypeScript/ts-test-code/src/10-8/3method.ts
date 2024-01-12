class StringUtil {
  constructor() {}

  static trimSpace(text: any) {
    if (typeof text === 'string') return text.replace(/\s+/g, '')
    return (' ' + text + ' ').replace(/\s/, '')
  }
}

// 方法装饰器
function FnInterceptor(...args: any[]) {
  return function(targetClassPrototype: any, fnName: string, dataProps: PropertyDescriptor) {
    const targetFn = dataProps!.value
    dataProps!.value = function(...args: any[]) {
      args = args.map(arg => {
        if (typeof arg === 'string') return StringUtil.trimSpace(arg)
        return arg
      })
      console.log('前置拦截 -> 输出args', args)
      targetFn.apply(this, args)
      console.log('后置拦截 -> 再次输出args')
    }
  }
}

// 方法装饰器实现拦截器前置、后置功能
class ReleService {
  public roleName: string = '管理员'
  constructor() {}

  @FnInterceptor()
  distribRoles(...args: any[]) {
    console.log('分配角色')
  }
}

let releService = new ReleService()
releService.distribRoles('测 试 一 下', 'ha ha ha ')

export {}
