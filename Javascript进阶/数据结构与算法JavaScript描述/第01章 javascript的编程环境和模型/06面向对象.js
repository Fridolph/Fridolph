// 定义和使用Checking对象

function Checking(amount) {
  this.balance = amount;
  this.deposit = deposit;
  this.withdraw = withdraw;
  this.toString = toString;
}

function deposit(amount) {
  this.balance += amount;
} 

function withdraw(amount) {
  if(amount <= this.balance) {
    this.balance -= amount;
  }
  if(amount > this.balance) {
    console.log('您的余额不足');
  }
}

function toString() {
  return "Balance: " + this.balance;
}


var account = new Checking(500);
account.deposit(1000);
console.log(account.toString());

account.withdraw(750);
console.log(account.toString());
account.withdraw(800);
console.log(account.toString());