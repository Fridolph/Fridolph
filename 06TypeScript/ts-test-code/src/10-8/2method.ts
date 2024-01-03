// 方法装饰器
/**
 *
 * @param {*} targetClassPrototype
 * @param {string} fnName
 * @param {PropertyDescriptor} methodDescriptor
 */
function MyMethodDecorator(fnPath: string) {
  return function(targetClassPrototype: any, fnName: string, fnDescriptor: PropertyDescriptor) {
    console.log('最外层接收的参数: ', fnPath);
    console.log('目标类的原型: ', targetClassPrototype);
    console.log('装饰的方法名: ', fnName);
    console.log('方法装饰器: ', fnDescriptor)

    // fnDescriptor.value() 执行被装饰器修饰的方法
  }
}

// 目标类
class ReleService {
  public roleName: string = '管理员'
  constructor() {

  }

  @MyMethodDecorator('/searchFood')
  distribRoles() {
    console.log('分配角色')
  }
}

export {}
