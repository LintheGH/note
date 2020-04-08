### git 常用命令
- 版本回退
  - `git log` 查看历史记录
  - `git reset --hard HEAD^` 回退到上一次版本
  - `git reset --hard HEAD^` 回到上上次版本
  - `git reset --hard HEAD~100` 回到前100 的版本
  - `git reset --hard 1094a` 后面 1094a 是commit id 可以用 git log 查看，这条命令可以回到任意版本（回到过去再回到未来）
  - `git reflog` 查看命令历史（关闭后可查看）
- 撤回修改
  - `git checkout -- <file>`  丢弃工作区的全部修改
  - `git checkout -- readme.txt` 文件 readme.txt 工作区的修改会全部撤销（回到最后一次 add 或 commit 之前）
  - `git reset head <file>` 把暂存区的 readme.txt 文件重新放回工作区(已提交的内容想要撤销可以先把文件放回工作区再用 git checkout 命令撤销)

  - `git add/rm <file>` 添加/删除文件
- 分支
  - `git branch` 查看分支
  - `git branch <name>` 创建分支
  - `git checkout <name>` 切换分支
  - `git checkout -b <name>` 创建 + 切换分支
  - `git merge <name>` 合并某分支到抢钱分支
  - `git branch -d <name>` 删除某个分支，强行删除用大写的 `-D` 做参数 
  - `git log --graph` 查看分支合并图
  - `git push origin <localbranchname>:<remotebranchname>`将本地分支推送远程分支，：后不带远程分支名则自动匹配同名分支，不存在则创建
  - `git pull origin <remotebranchname>:<localbranchname>` 将远程分支拉取到本地分支
  - `git push origin :<remotebranchname>`删除远程分支
  - `git push origin `如当前分支存在追踪情况，推送当前分支到远程同名分支
  - `git push origin <remotebranchname>` 推送当前分支到远程分支
  - `git pull origin <localbranchname>`拉取远程分支到当前分支
  - `--no-ff` 参数表示普通合并，合并后的历史有分支
  - `git branch --track origin/<remotebranchname> <localbranchname>` 建立远程分支与本地分支关联
  - `git pull origin <remotebranchname> --allow-unrelated-histories` 允许拉取历史不相关的远程仓库（当本地与远程仓库的历史不相同的时候，Git会认为两个仓库不相关而拒绝拉取、推送 ）
- 暂存工作区
  - `git stash` 把当前工作现场储存起来
  - `git stash list` 查看暂存的工作现场
  - `git stash pop` 恢复工作现场同时删除，清空stash list

- 打标签
  - `git tag <tagname>`用于新建一个标签，默认为HEAD，也可以指定一个commit id
  - `git tag -a <tagname> -m "blablabla..."`可以指定标签信息
  - `git tag`可以查看所有标签
  - `git push origin <tagname>`可以推送一个本地标签；
  - `git push origin --tags`可以推送全部未推送过的本地标签；
  - `git tag -d <tagname>`可以删除一个本地标签；
  - `git push origin :refs/tags/<tagname>`可以删除一个远程标签。

- 多人协作开发
  1. 首先，可以试图用`git push origin <branch-name>`推送自己的修改；

  2. 如果推送失败，则因为远程分支比你的本地更新，需要先用`git pull`试图合并；

  3. 如果合并有冲突，则解决冲突，并在本地提交；

  4. 没有冲突或者解决掉冲突后，再用`git push origin <branch-name>`推送就能成功！

  5. 如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令`git branch --set-upstream-to <branch-name> origin/<branch-name>`。

  这就是多人协作的工作模式，一旦熟悉了，就非常简单。

- 配置gitignore
  - 在项目未push到远程仓库时，在git本地仓库根目录创建 .gitignore 文件（文件没有名字，无法在系统中创建，需要用git bash 窗口中使用 linux 命令创建
    - # 以'#'开始的行，被视为注释. 
    - 以斜杠“/”开头表示目录；
    - 以星号“*”通配多个字符；
    - 以问号“?”通配单个字符
    - 以方括号“[]”包含单个字符的匹配列表；
    - 以叹号“!”表示不忽略(跟踪)匹配到的文件或目录；
  
  -  push后再更新 gitignore 文件后，提交远程仓库并不会生效，原因在于 git 已经创建了已经提交到远程仓库到文件到版本控制，此时需要运行一下命令
    ```
      git rm -f --cached . // 清除已经托管在git中文件
      git add . // 重新托管文件，此时会依据 .gitignore 文件中到配置生效
      git commit -m 'update .gitignore' // 提交信息
    ```