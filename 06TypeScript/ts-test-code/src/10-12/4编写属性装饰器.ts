// 4. 编写属性装饰器
// import 'reflect-metadata'
// import CollectionInstance from './Collection'

// type MyPropertyDecorator = (target: Object, propertyKey: string | symbol) => void

// export function Inject(injectId?: string): MyPropertyDecorator {
//   return (targetClassPrototype, propertyKey) => {
//     console.log('进入 注入属性装饰器 Inject ...');
//     console.log('targetClassPrototype: ', targetClassPrototype)
//     console.log('propertyKey: ', propertyKey)
//     console.log('注入id = injectId: ', injectId);

//     // 重要
//     const InjectServiceClass = Reflect.getMetadata('design:type', targetClassPrototype, propertyKey)
//     CollectionInstance.set('userService', new InjectServiceClass())

//     console.log('InjectServiceClass.prototype: ', InjectServiceClass.prototype)
//   }
// }
