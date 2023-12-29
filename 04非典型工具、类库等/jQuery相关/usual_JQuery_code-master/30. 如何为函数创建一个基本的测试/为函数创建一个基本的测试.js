//把测试单独放在模块中 
//module("Module B"); 

test("some other test", function () { 
    //指明测试内部预期有多少要运行的断言 
    expect(2); 
    //一个比较断言，相当于JUnit的assertEquals 
    equals(true, false, "failing test"); 
    equals(true, true, "passing test"); 
});