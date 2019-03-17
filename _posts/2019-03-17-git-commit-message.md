---
layout:     post
title:      "git提交记录书写规范"
date:       2019-03-17 22:50:00 +0800
author:     mamamiyear
tag:        [git]
SN:         5

typora-root-url: ..
---

###  介绍

​	git的提交记录在开发中有着重要的作用，一个好的git提交记录是可以帮助自己和团队成员能够更好协作的工具。反之，一个不规范，不明确的提交记录会成为团队开发中降低效率的绊脚石。本文就来介绍一下什么样的git提交记录才是一个优秀的开发人员所需要的。

### 格式

​	git的提交记录需要遵循一定的格式，格式如下：

```
<type>(<scope>): <subject> # only one line
# blank line
[body] # maybe one or more lines
# blank line
[footer] # maybe one or more lines
```

​	可以看到，git的提交记录分为了三个部分。分别是只占一行的提纲和可选的内容及注脚，下面分别对三项进行描述。

### 提纲

提纲是只占一行的、总体描述本次提交的信息。它包含三个部分：

1. **type**

   type是描述本次提交类型的，根据经验一般分为下面几类：

   - feat：新功能（feature）

     代表本次提交是做了新的功能性开发。

   - fix：修补bug

     代表本次提交是为了修复某个问题。

   - docs：文档（documentation）

     代表本次提交是对文档内容进行了修改。

   - style： 格式

     代表本次提交是对某些代码的格式做了变化，但没有修改任何代码内容，不影响代码运行的任何行为。

   - refactor：重构

     即没有新增功能，也不是修改bug，但对代码内容进行了变动。

   - test：增加测试

     对测试代码进行的新增、修改或删除。

   - chore：构建过程或辅助工具的变动

     对于工程化相关的内容，例如自动化脚本等做出的改动。

   - other：其他

     确实不属于上述改动的变化，但是一般不建议使用。

2. **scope**

   scope是本次修改的作用域，通常按照项目划分的子系统或模块为粒度，也可以是全局。

3. **subject**

   subject是对本次修改目的或行为作出的描述，通常不超过50个字符，遵循以下规范。

   - 以动词开头，使用第一人称现在时，比如`change`，而不是`changed`或`changes`
   - 第一个字母小写
   - 结尾不加句号（`.`）

```
feat(control layer): blance requests from host
```



### 内容

内容可以有多行，一般对本次提交进行详细描述，可以列为若干条。一般针对较大的修改，为了使别人可以看懂具体做了哪些，就可以编写内容来描述。

```
more detials:
1. change theme color by blue.
2. change theme icon by new logo.
```



### 注脚

注脚通常情况下不使用，仅在两种情况下使用。

- 不兼容以前版本的改动

  如果当前代码与上一个版本不兼容，则 Footer 部分以`BREAKING CHANGE`开头，后面是对变动的描述、以及变动理由和迁移方法。

  ```
  BREAKING CHANGE: a module struct field type changed.
  
      To migrate the code follow the example below:
  
      Before:
  	struct Example_S my_struct;
  	my_struct->property = 0;
  
      After:
  	struct Example_S my_struct;
      my_struct->property = malloc(sizeof(int));
      memset(my_struct->property, 0, sizeof(int));
  	
  	Example_S's field 'property' change type from int to int*, and you should malloc memory for real value by your self;
  ```

- 关闭Issue

  如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。

  ```bash
  Closes #123
  # or
  Closes #123, #245, #992
  ```



### Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以`revert:`开头，后面跟着被撤销 Commit 的 Header。通常git会自动生成这样一条message。

```bash
revert: feat(pencil): add 'graphiteWidth' option
This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```



### 好处

1. 提供更多的历史信息，方便快速浏览。

   比如，下面的命令显示上次发布后的变动，每个commit占据一行。你只看行首，就知道某次 commit 的目的。

```bash
$ git log <last tag> HEAD --pretty=format:%s
```

2. 可以过滤某些commit（比如文档改动），便于快速查找信息。

   比如，下面的命令仅仅显示本次发布新增加的功能。

```bash
$ git log <last release> HEAD --grep feature
```

3. 可以直接从commit生成Change log。

   Change Log 是发布新版本时，用来说明与上一个版本差异的文档，具体工具本文暂不做讨论。

![git-message-change-log](/assets/2019-03-17-git-commit-message/git-message-change-log.png)



本次先说这么多吧，希望大家都能养成良好的git提交message的书写习惯，为自己也为他人。