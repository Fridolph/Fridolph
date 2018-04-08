class P {
  constructor(public name: string) {
    console.log("P 类构造好了");
    this.name = name;
  }

  say() {
    console.log(`my nam is ${name}`);
  }
}

const ren = new P("fri");
ren.say();

class YG extends P {
  constructor(name: string, code: string) {
    super(name);
    console.log("YG构造方法");
    this.code = code;
  }

  code: string;

  work() {
    super.say();
    this.doWork();
  }

  private doWork() {
    console.log("I am working now !");
  }
}
