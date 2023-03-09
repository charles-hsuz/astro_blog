---
title: 关于spawnfailed
tags: 'hexo,github'
categories: help
slug: cbadfe7e
date: 2023-01-17 01:57:20
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091657180.png'
---
# Spawn Failed 的一些解决办法

基于github的hexo博客在部署时常出现`Spawn failed`错误，这里提供一些解决方法：

**Case 1** 首先，确认你的账号设置没有问题，在终端中使用：
```
git config --global user.email "你的邮箱"
git config --global user.name "你的用户名"
```

**Case 2** “重启”你的git：
删除`.deploy_git`文件夹，然后执行`git config --global core.autocrlf false`

**Case 3** 重新配置网络代理：
打开`config.yml`注意是根目录的配置文件，不是主题目录下的
```
deploy:
type: 'git'
- repo: https://github.com/yourname/yourname.github.io.git
+ repo: git@github.com:yourname/yourname.github.io.git
branch: master
```

**Final** 
删除`public`文件夹后hexo三连：
```
hexo cl
heco g
hexo d
```

如果还不行就重启一下电脑试试😎