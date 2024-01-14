import collectionInstance from './Collection'
import { UserService } from './UserService'
import { InjectContructor } from './InjectContructorDecorator'

class UserController {
  // 依赖注入
  constructor(@InjectContructor('userService')
  private userService?: UserService, private count?: string) {

  }

	public login() {
		let peopleServiceInstance = collectionInstance.get('userService')
		peopleServiceInstance.login()
	}
}

// let controller = new UserController()
// controller.login()

export {}
