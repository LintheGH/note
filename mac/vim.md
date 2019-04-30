---
title: mac 连接远程服务器，实现文件的上传下载
tags: mac, vim
notbook: other
---

#### mac 实现连接远程服务器，并实现文件的上传下载
---
- 建立远程链接
    1. 打开终端
    2. 点击菜单的 `shell` -> `新建远程连接` 
    3. 选择 `安全 Shell(ssh)` -> 右侧`--已发现的服务器--` -> 右侧下方 `+` 号 -> 填入服务器地址
    4. 远程服务器的用户名填入下方的 `用户名` -> 连接
    5. 连接后输入服务器的密码 -> 连接成功
- 使用scp命令实现上传下载
    1. 从服务器上下载文件 `scp username@servername:/path/filename /Users/mac/Desktop（本地目录）`
        例如:`scp root@123.207.170.40:/root/test.txt /Users/mac/Desktop`就是将服务器上的/root/test.txt下载到本地的/Users/mac/Desktop目录下。注意两个地址之间有空格！
    2. 上传本地文件到服务器 `scp /path/filename username@servername:/path` ;
        例如`scp /Users/mac/Desktop/test.txt root@123.207.170.40:/root/`
    3. 从服务器下载整个目录 `scp -r username@servername:/root/（远程目录） /Users/mac/Desktop（本地目录）`
        例如:`scp -r root@192.168.0.101:/root/ /Users/mac/Desktop/`
    4. 上传目录到服务器 `scp -r local_dir username@servername:remote_dir`
        例如：`scp -r test root@192.168.0.101:/root/` 把当前目录下的test目录上传到服务器的/root/ 目录
- 


### 