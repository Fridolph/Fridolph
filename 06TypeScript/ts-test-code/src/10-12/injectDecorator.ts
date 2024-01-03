import 'reflect-metadata'
import CollectionInstance from './Collection'

type MyPropertyDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void
export function Inject(injectId?: string): MyPropertyDecorator {
  return (targetClassPrototype, propertyKey) => {
    console.log('进入 注入属性装饰器 injectId 为', injectId);
    // 重要
    let InjectServiceClass = Reflect.getMetadata('design:type', targetClassPrototype, propertyKey) // Reflect.getMetadata 拿到装饰器修饰的 属性的 类型
    // console.log('InjectServiceClass: ', InjectServiceClass);
    // InjectServiceClass.set('userService', new InjectServiceClass())
    // console.log('InjectServiceClass.prototype: ', InjectServiceClass.prototype);
  }
}
