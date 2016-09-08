// http.ServerResponse 是返回给客户端的信息，决定了用户最终能看到的结果。它也是由 http.Server 的 request 事件发送的，作为第二个参数传递，一般简称为response 或 res。

// http.ServerResponse 有三个重要的成员函数，用于返回响应头、响应内容以及结束请求。 

// response.writeHead(statusCode, [headers])：向请求的客户端发送响应头。

// statusCode 是 HTTP 状态码，如 200 （请求成功）、404 （未找到）等。

// headers是一个类似关联数组的对象表示响应头的每个属性。该函数在一个请求内最多只能调用一次，如果不调用，则会自动生成一个响应头。

// response.write(data, [encoding])：向请求的客户端发送响应内容。data 是一个 Buffer 或字符串，表示要发送的内容。如果 data 是字符串，那么需要指定encoding 来说明它的编码方式，默认是 utf-8。

// 在 response.end 调用之前，response.write 可以被多次调用。 

// response.end([data], [encoding])：结束响应，告知客户端所有发送已经完成。
// 当所有要返回的内容发送完毕的时候，该函数 必须 被调用一次。它接受两个可选参数，意义和 response.write相同。如果不调用该函数，客户端将永远处于等待状态。