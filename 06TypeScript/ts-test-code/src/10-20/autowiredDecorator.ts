import 'reflect-metadata'
// import CollectionInstance from "./Collection";
// import UserController from "./UserController";

type MyPropDecorator = (targetClassPrototype: any, propertyKey: string | symbol) => void

export default function AutoWired(injected: string): MyPropDecorator {
  return (targetClassPrototype, propertyKey) => {
    // PropClass = UserService 类
    let PropClass = Reflect.getMetadata('design:type', targetClassPrototype, propertyKey);

    // 增加 ...
    let PropClassObj = new PropClass();
    // CollectionInstance.set(propertyKey, PropClassObj)
    // 这样会导致 用户的控制器类实例化 2 次，后一次调用覆盖了前一次

    // 利用如下方式：有以下好处
    // 由于 targetClassPrototype + propertyKey 是一个组合的 key
    // 不会被覆盖，充分保证数据属性中的 value 的 唯一性
    Reflect.defineProperty(targetClassPrototype, propertyKey, {
      value: PropClassObj
    })
    console.log("🚀 ~ AutoWired:", targetClassPrototype, propertyKey, '\n 🚀 value -> ', PropClassObj)
  }
}
