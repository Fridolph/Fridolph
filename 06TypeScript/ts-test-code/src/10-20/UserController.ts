import 'reflect-metadata'
import { UserService } from './UserService';
import CollectionInstance from "../10-15/Collection";
import AutoWired from "./autowiredDecorator";

// 装饰器执行顺序：
// 1. 属性装饰器 -> 2. 方法参数装饰器 -> 3. 方法装饰器 -> 4. 类装饰器
class UserController {
  // 修改Inject 为更为专业的 AutoWired 单词
  @AutoWired('userService')
  private userService!: UserService

  public login() {
    // let userService: UserService = CollectionInstance.get('userService')
    // userService.register()

    let userService: UserService = Reflect.getOwnPropertyDescriptor(UserController.prototype, 'userService')!.value
    userService.register()
  }
}

let controller = new UserController()
controller.login()

export default UserController


// 实现步骤
// 1. 建立伪接口类 UserServiceInterface
// 2. 修改 UserService 的名字为 userServiceImplements 类
// 3. 修改自动装配装饰器【Autowired】代码：见增加和修改部分
// 4. 最后别忘了修改控制器中的 login 方法
