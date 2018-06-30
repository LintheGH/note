###git 生成密钥
- 检查是否已生成
cd ~/.ssh
1
如果能进入到.ssh文件目录下 ，则证明，之前生成过.ssh秘钥，可以直接使用里面的秘钥。 
如果不能进入到.ssh文件目录下，则： 
检测下自己之前有没有配置：git config user.name和git config user.email（直接分别输入这两个命令）

一、如果之前没有配置过 
1.配置 
git config –global user.name ‘xxxxx’ 
git config –global user.email ‘xxx@xx.xxx’

2.生成秘钥 
ssh-keygen -t rsa -C ‘上面的邮箱’

接着按3个回车 则：

Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/Mr.Yang/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Mr.Yang/.ssh/id_rsa.
Your public key has been saved in /c/Users/Mr.Yang/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:zA6wNJrFB6NcqS6eBog/AHlzQuvFjYpG759Yhh1lWGI xxxxxx@xxxxx.xxx(上面自己的邮箱)
The key's randomart image is:
+---[RSA 2048]----+
|    +E .         |
| ..+oo+          |
| oo+*+.o         |
|o.*===+o         |
|==+*... S        |
|B.+.o .o         |
|++o. +  .        |
| +o.+ .          |
|.  o.o           |
+----[SHA256]-----+

最后在.ssh目录下得到了两个文件：id_rsa（私有秘钥）和id_rsa.pub（公有密钥）

如果想登陆远端，则需要将rsa.pub里的秘钥添加到远端。

二、如果之前配置过 
则直接按上一点中的 2.生成秘钥 进行
