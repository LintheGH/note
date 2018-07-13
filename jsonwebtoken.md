####定义

JSON Web Token（JWT）是一个非常轻巧的规范。这个规范允许我们使用JWT在用户和服务器之间传递安全可靠的信息。

####适用场景

-  	用于向Web应用传递一些非敏感信息。例如完成加好友、下订单的操作等等。

-  用于设计用户认证和授权系统。

-  实现Web应用的单点登录。

####JWT的组成

一个JWT实际上就是一个字符串，它由三部分组成：
-  **头部**、
-  **载荷**
-  **签名**。

####实例场景

在A用户关注了B用户的时候，系统发邮件给B用户，并且附有一个链接“点此关注A用户”。链接的地址：https://your.awesome-app.com/make-friend/?from_user=B&target_user=A。

让B用户不用登录就可以完成这个操作。

 

#####载荷（Payload）

可以先将上面的添加好友的操作描述成一个JSON对象。并添加一些其他的信息，帮助收到这个JWT的服务器理解这个JWT。
```javascript
{

"iss": "John Wu JWT",

"iat": 1441593502,

"exp": 1441594722,

"aud": "www.example.com",

"sub": "jrocket@example.com",

"from_user": "B",

"target_user": "A"

}
```
**前五个字段都是由JWT的标准所定义的。**

- `iss`: 该JWT的签发者
- `sub`: 该JWT所面向的用户
- `aud`: 接收该JWT的一方
- `exp`(expires): 什么时候过期，这里是一个Unix时间戳
- `iat`(issued at): 在什么时候签发的

将上面的JSON对象进行[base64编码]可以得到下面的字符串。这个字符串我们将它称作JWT的**Payload**（载荷）。

`eyJpc3MiOiJKb2huIFd1IEpXVCIsImlhdCI6MTQ0MTU5MzUwMiwiZXhwIjoxNDQxNTk0NzIyLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiZnJvbV91c2VyIjoiQiIsInRhcmdldF91c2VyIjoiQSJ9`

如果你使用Node.js，可以用Node.js的包[base64url](https://github.com/brianloveswords/base64url)来得到这个字符串。
```javascript
var base64url = require('base64url')

var header = {

"from_user": "B",

"target_user": "A"

}

console.log(base64url(JSON.stringify(header)))
```
// 输出：`eyJpc3MiOiJKb2huIFd1IEpXVCIsImlhdCI6MTQ0MTU5MzUwMiwiZXhwIjoxNDQxNTk0NzIyLCJhdWQiOiJ3d3cuZXhhbXBsZS5jb20iLCJzdWIiOiJqcm9ja2V0QGV4YW1wbGUuY29tIiwiZnJvbV91c2VyIjoiQiIsInRhcmdldF91c2VyIjoiQSJ9`

 

**小知识：Base64是一种编码，也就是说，它是可以被翻译回原来的样子来的。它并不是一种加密过程。**

######**头部（Header）**

头部用于描述关于该JWT的最基本的信息，例如其类型以及签名所用的算法等。这也可以被表示成一个JSON对象。
```
{

"typ": "JWT",

"alg": "HS256"

}
```
在这里，我们说明了这是一个JWT，并且我们所用的签名算法（后面会提到）是HS256算法。

对它也要进行Base64编码，之后的字符串就成了JWT的**Header**（头部）。

`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9`

##### **签名（签名）**

将上面的两个编码后的字符串都用点号连接在一起（头部在前），就形成了

`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0`

最后，我们将上面拼接完的字符串用HS256算法进行加密。在加密的时候，我们还需要提供一个密钥（secret）。如果我们用`mystar`作为密钥的话，那么就可以得到我们加密后的内容

`rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM`

这一部分又叫做**签名**。

最后将这一部分签名也拼接在被签名的字符串后面，我们就得到了完整的JWT

`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0.rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM`

于是，我们就可以将邮件中的URL改成

https://your.awesome-app.com/make-friend/?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcm9tX3VzZXIiOiJCIiwidGFyZ2V0X3VzZXIiOiJBIn0.rSWamyAYwuHCo7IFAgd1oRpSP7nzL7BF5t7ItqpKViM

这样就可以安全地完成添加好友的操作了！