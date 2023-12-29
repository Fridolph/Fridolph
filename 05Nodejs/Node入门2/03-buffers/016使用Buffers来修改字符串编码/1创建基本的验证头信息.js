/**
 * 有时候，创建一个字符串数据后修改它的编码格式是很有用的，例如，
 * 当需要从一个使用基础验证的服务器请求数据时，你需要发送使用Base64编码的用户名和密码：
 *
 * am90bm55OmMtYmFk   这串是编码好的
 *
 * 在进行Base64编码前，基础验证需要把用户名和密码拼接到一起，用 : 分隔开来，例如，我们使用johnny作为用户名， 而c-bad作为密码：
 */

var user = 'johnny';
var pass = 'c-bad';
var authstring = user + ':' + pass;

/**
 * 现在我们需要把这个字符串转换为Buffer，然后修改它的编码格式。
 * Buffers可以按照字节数来分配，如之前我们看过的简单传入数字的创建方式。
 * Buffer也可以通过传入字符串数据来创建：
 */

// 将字符串数据转换为Buffer
var buf = new Buffer(authstring);

// 指定编码: 当使用字符串来创建Buffer时，默认为UTF-8字符串。但是当我们需要指定数据的编码时，
// 可以传入第二个可叙按的参数来表示对应的编码: 
// new Buffer('am90bm55OmMtYmFk', 'base64')
// 现在我们有一个Buffer来保存数据，可以使用toString('base64')方法来把它转换为base64编码的字符串：
// var encoded = buf.toString('base64');

var encoded = Buffer(user + ':' + pass).toString('base64');

console.log(buf);
console.log(encoded);