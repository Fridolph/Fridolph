// 2 编写业务类
export class UserService {
  users: Set<string[]>
  pname: string

  constructor() {
    // console.log('UserService构造器: ');
    this.users = new Set([])
    this.pname = '人民'
  }

  public login() {
    console.log(`${this.pname} 于 ${new Date().getDay()}号 登录了...`);
  }

  public register() {
    console.log(`${this.pname} 于 ${new Date().getDay()}号 注册了...`);
  }
}
