[splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

    array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

---

示例

从第2位开始删除0个元素，插入“drum”

    var myFish = ["angel", "clown", "mandarin", "surgeon"];
    //从第 2 位开始删除 0 个元素，插入 "drum"
    var removed = myFish.splice(2, 0, "drum");
    //运算后的 myFish:["angel", "clown", "drum", "mandarin", "surgeon"]
    //被删除元素数组：[]，没有元素被删除


从第3位开始删除1个元素

    var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
    var removed = myFish.splice(3, 1);
    //运算后的myFish：["angel", "clown", "drum", "sturgeon"]
    //被删除元素数组：["mandarin"]

从第2位开始删除1个元素，然后插入“trumpet”

    var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
    var removed = myFish.splice(2, 1, "trumpet");
    //运算后的myFish: ["angel", "clown", "trumpet", "surgeon"]
    //被删除元素数组：["drum"]

从第0位开始删除2个元素，然后插入"parrot","anemone"和"blue"

    var myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
    var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');
    // 运算后的myFish： ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
    // 被删除元素数组：["angel", "clown"]

从第2位开始删除2个元素

    var myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
    var removed = myFish.splice(myFish.length - 3, 2);
    // 运算后的myFish： ["parrot", "anemone", "sturgeon"]
    // 被删除元素数组：["blue", "trumpet"]


从第2位开始删除所有元素

    var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
    var removed = myFish.splice(2);
    // 运算后的myFish ：["angel", "clown"]
    // 被删除的元素数组： ["mandarin", "sturgeon"]
