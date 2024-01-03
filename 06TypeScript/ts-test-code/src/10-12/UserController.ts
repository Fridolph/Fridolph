import { UserService } from './UserService';
import CollectionInstance from './Collection'
import { Inject } from './injectDecorator';
import Controller from './ControllerDecorator'
import { Get } from './methodDecorator'
// 3 编写类 【控制器类】
@Controller('/user')
class UserController {
  // 依赖注入 - 即创建和使用分离
  @Inject('UserService')
  private userService?: UserService

  @Get('/user/login')
  public login() {
    let instance = CollectionInstance.get('userService')
    instance.login()
  }

  @Get('/user/logout')
  public logout() {
    let instance = CollectionInstance.get('userService')
    instance.logout()
  }
}

// let controller = new Controller()
// controller.login()

export {}
