---
layout:     post
title:      "gcc编译过程简述"
date:       2017-10-02 21:41:45 +0800
author:     mamamiyear
tag:        [c, gcc]
SN:         5
---

### gcc编译过程简述

##### 一步命令

```shell
gcc hello.c -o hello.bin
```

这是我们经常使用的编译方式，可以将带有main函数的.c文件编译为可执行文件。

以下将分步解释gcc的命令过程

##### 预处理

```sh
gcc -E -I .../dir1 -I .../dir2 hello.c -o hello.i
```

预处理主要工作是规范化文本，例如替换#include头文件，宏定义和添加一些注释等。但hello.i仍然为文本文件。

##### 编译

```sh
gcc -S hello.i -o hello.s
```

编译阶段将预处理后的文本编译为汇编，hello.s即为汇编代码。

##### 汇编

```sh
gcc -c main.s -o main.o
# or
as hello.s -o hello.o
```

编译汇编代码，将汇编代码编译为二进制文件

##### 生成

分为三种，生成可执行文件，生成静态库，生成动态库。

- 生成可执行文件

```sh
ld -o hello.bin hello.o other.o ...
```

将众多.o链接生成一个可执行文件

- 生成静态库

```sh
ar [srv] hello.a hello.o other.o ...
```

将多个.o打包成一个.a静态链接库

- 生成动态连接库

```sh
gcc -o hello.so [-shared -fPIC] hello.o other.o ...
```

将多个.o打包成为.so动态链接库

以上只是大致总结了一下gcc的编译流程，其中很多命令还有许多参数可选，效果也会不一样。实际工程中使用也并非会如此使用。







