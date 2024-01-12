import 'reflect-metadata'

export default function ControllerDecorator(rootPath: string) {
  return function <T extends {new (...args: any): any}>(targetClass: T) {
    console.log('执行【类】装饰器', targetClass, '类上的路径', rootPath);

    console.log('----------下面处理所有 fnName 上的装饰器 -----------');

    Object.keys(targetClass.prototype).forEach(fnName => {
      console.log('fnName: ', fnName)
      let reqPath = Reflect.getMetadata('path', targetClass.prototype, fnName)

      console.log('类上的reqPath: ', reqPath)
    })
  }
}
