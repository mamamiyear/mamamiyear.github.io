---
layout: 	post
title:  	"Git使用及搭建Git服务器的总结"
date:   	2017-07-11 20:39:45 +0200
author:     mamamiyear
categories: tech-summary
tag:		git ssh
---

### Git仓库的概念

#####  普通仓库

一个存在本机的工程文件夹目录结构如下

图

其中file和dir是工程文件及文件夹而不是仓库

而.git文件夹才是工程项目的仓库，也就是普通的仓库，它存储着工程文件夹中所有的提交记录和历史版本。

普通仓库也是分布式git版本系统中的本地仓库。

##### 裸仓库

裸仓库与普通仓库的区别是，裸仓库没有在某个工程根目录下，它就是一个仓库，与工程源码文件及目录无关。

相同点是保存的也是某个项目的提交记录和历史版本。

裸仓库的更新来源于普通仓库的push，而普通仓库也从裸仓库pull到最新的版本信息。

通常，Git服务器端使用裸仓库，而开发组员则在工程根目录下创建本地仓库。在Git的默认设置下，本地仓库是不允许向另一个本地仓库push更新提交的，而只能向裸仓库push。

简单说来，裸仓库其实就是工程中本地仓库在远端的对应，只是远端不存储工程原文件。



### Git服务器搭建

以Ubuntu 16.04为例，项目名称Example，管理员名称git，用户组git

1. 安装git

   ```sh
   sudo apt install git
   ```

2. 添加git管理员

   ```sh
   sudo adduser git
   sudo passwd git
   ```

3. 创建git服务器文件夹

   ```sh
   su git
   cd ~
   mkdir gitRepository
   ```

4. 创建一个裸仓库

   ```sh
   cd gitRepository
   mkdir Example.git
   cd Example.git
   git init --bare # 创建裸仓库需要加上bare参数，否则是创建普通仓库
   ```

5. 至此一个空的仓库创建完毕，它等待着用户的本地仓库向它push提交信息。



### Git客户端访问

客户端初始访问有两种方式

##### clone空仓库到本地

当远端有一个空的裸仓库时而本地还未创建工程文件夹，则可以采用

```sh
git clone username@remoteip:url/project.git
```

的形式将远端的裸仓库克隆到本地，以本文Git服务器搭建中的例子为例则是

```sh
git clone git@192.168.1.1:/home/git/gitRepository/Example.git
```

之后会提示输入git用户的密码

这时Git默认设置则会在运行命令的目录下创建一个名为Example的文件夹，即工程文件夹。

Example的根目录中则会有.git的本地仓库，其中包含的信息与远端的裸仓库完全相同。

这样一个本地仓库克隆完毕，它等待着工程文件的编辑与提交。

##### remote add远端仓库

如果本地已经创建了工程目录，那么直接克隆便不可行了。这是我们就需要将远端仓库与本地仓库对应上，而对应的命令即为

```sh
git remote add username@remoteip:url/project.git
```

以本文Git服务器搭建中的例子为例

首先在工程目录下初始化本地仓库

```sh
git init # 注意没有bare参数，如果已经有本地仓库则跳过这一步
```

这一步过后再工程文件根目录下就有了.git的本地仓库

执行命令

```sh
git remote add git@192.168.1.1:/home/git/gitRepository/Example.git
```

就可以将远端仓库与本地仓库对应起来了，并且一个本地仓库可以对应多个远端仓库。



### 小结

到这里，我们基本上明白了仓库的概念与关系，同时也可以搭建简单的个人Git服务器了。 

---



### 多用户

上述描述中，我们只采用了git一个用户来进行操作，但实际工作中我们一定会有多个用户协同开发。本节就讨论多用户的情况。

Git是否有自己的用户管理系统暂时我不太清楚，这里采用linux的用户管理来进行。

1. 创建普通用户

   ```sh
   sudo useradd user1 # 这里不是用adduser，因为user1不需要拥有完整的用户目录和信息，它只是git的用户
   sudo passwd user1
   ```

2. 添加到git用户组

   ```sh
   sudo usermod -aG git user1 #第一个git是git用户组的意思，而不是git用户
   groups user1 # 这个可以查看user1所属的用户组
   ```

3. 修改仓库权限

   将仓库及其内部所有文件与文件夹权限改为drwxrwxr-x，标示拥有者与同组用户可以进行读写执行等操作，而其他用户则不能写入。

4. 至此，我们就可以使用user1来进行所有的操作了。

   不经过配置的情况下，user1与git在使用上没有区别，对仓库中提交和获取的权限也相同。这样是非常不安全的，所幸，Git可以对每个用户进行权限控制来解决这个问题。具体方式，留待后续学习。



### ssh登陆访问

由于Git采用linux用户管理，所以可以采用linux的SSH公钥验证方式进行免密登陆和访问。具体请参见SSH登陆简介。



### 几点对GitHub的简单想法

GitHub的访问，其实就是将http的URL映射为我们上述的服务器URL。

而对公开仓库，其他人只能访问不能修改也与我们上述的drwxrwxr-x权限相同。



### 后续学习

多用户下管理员处理各个用户的提交

多用户下各分支的权限管理

多用户下管理员将普通用户提交合并入主分支

管理员等级划分与权限分配

Git是否有自己的用户管理系统