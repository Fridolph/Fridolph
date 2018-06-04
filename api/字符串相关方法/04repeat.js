/** 
 * str: String
 * count: Number
 */

// let resultString = str.repeat(count);
"abc".repeat(-1)     // RangeError: repeat count must be positive and less than inifinity
"abc".repeat(0)      // ""
"abc".repeat(1)      // "abc"
"abc".repeat(2)      // "abcabc"
"abc".repeat(3.5)    // "abcabcabc" 参数count将会被自动转换成整数.
"abc".repeat(1/0)    // RangeError: repeat count must be positive and less than inifinity

({toString : () => "abc", repeat : String.prototype.repeat}).repeat(2)   
//"abcabc",repeat是一个通用方法,也就是它的调用者可以不是一个字符串对象.