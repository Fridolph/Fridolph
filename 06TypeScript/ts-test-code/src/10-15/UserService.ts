// 2 编写业务类
export class UserService {
  constructor() {
    console.log('UserService构造器: ');
  }
  pname: string = '人民'
  public login() {
    console.log(`${this.pname} 于 ${new Date().getDay()}号 登录了...`);
  }
}
