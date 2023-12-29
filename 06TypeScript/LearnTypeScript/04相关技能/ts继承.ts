class Pay {
	constructor(
    bank_card_no: string,
    balance: number,
    cost: number,
    tokenid: string
  ) {
    this.bank_card_no = bank_card_no
    this.balance      = balance
    this.cost         = cost
    this.tokenid      = tokenid
  }
	                          // 支付父类
	bank_card_no: string      // 捆绑银行卡号
	balance     : number      // 银行卡余额
	cost        : number      // 本次消费费用
	tokenid     : string      // 登录后用户访问令牌
	pay() {
    console.log('Pay的支付方法');
  }
}

enum PayType {
	WebChat           = 1,
	AliPay            = 2,
	CloudFlashPayment = 3,
}

  // 银行卡支付
class ATMPay extends Pay {
	bank_network: string       // 银行网点
  bankno_type                // 银行卡类型
  bank_card_psw              // 银行卡密码
  custname                   // 顾客姓名
}

  // 手机支付
class MobilePay extends Pay {
	constructor(
		bank_card_no: string,
		balance     : number,
		cost        : number,
		tokenid     : string,
		type        : PayType,
		change      : number,
		openid      : string,
		appid       : string
	) {
    // super可以表示父类的构造方法
		super(bank_card_no, balance, cost, tokenid)
		this.type   = type
		this.change = change
		this.openid = openid
		this.appid  = appid
	}
	type  : PayType
	change: number   // 支付平台零钱
	openid: string   // 用户识别身份id
	appid : string   // 微信小程序 appid
  pay() {
    // 在子类中，把父类方法重写后， 通过super调用父类重写的方法
    super.pay()
    console.log('我是子类的 pay 方法')
  }
}

let webChatPay = new MobilePay('1111', 300, 100, '12dkks34k2', PayType.WebChat, 10, 'userid_sdfkjk123', 'appid_21347kdj21')
