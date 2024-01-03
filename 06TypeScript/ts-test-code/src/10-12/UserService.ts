// 2 编写业务类
export class UserService {
  pname: string = '人民'
  public login() {
    console.log(`${this.pname} 于 ${new Date().getDay()}号 登录了...`);
  }
}
