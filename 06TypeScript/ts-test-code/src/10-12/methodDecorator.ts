import 'reflect-metadata'

type MethodDecorator = (targetClassPrototype: any, fnName: string, dataprops: PropertyDescriptor) => void

export function Get(path: string): MethodDecorator {
  return function(targetClassPrototype, fnName, dataprops) {
    console.log('执行方法装饰器');
    Reflect.defineMetadata('path', path, targetClassPrototype, fnName)
  }
}
