import 'reflect-metadata'
import collectionInstance from './Collection'


type MyParameterDecorator = (target: Object, paramName: string, paramIndex: number) => void

export function InjectContructor(injectId?: string | symbol): MyParameterDecorator {
  // console.log('injectId: ', injectId);
  return (targetClass, name, index) => {
    // targetClass类 == 获取的是使用这个装饰器的类，本例是 UserController类
    console.log('targetClass: ', targetClass);
    console.log('paramName: ', name);
    // console.log('paramIndex: ', index);
    let constructorParamArr = Reflect.getMetadata('design:paramtypes', targetClass)
    console.log('constructorParamArr: ', constructorParamArr);
    let paramObj = new constructorParamArr[index]()
    console.log('paramObj: ', paramObj);

    collectionInstance.set(injectId!, paramObj)
  }
}
