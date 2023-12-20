class P {
    constructor(name) {
        this.name = name;
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
    constructor(name, code) {
        super(name);
        console.log("YG构造方法");
        this.code = code;
    }
    work() {
        super.say();
        this.doWork();
    }
    doWork() {
        console.log("I am working now !");
    }
}
//# sourceMappingURL=类.js.map