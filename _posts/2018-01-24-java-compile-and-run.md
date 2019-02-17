---
layout:     post
title:      "Java编译与执行简述"
date:       2018-01-24 23:06:45 +0800
author:     mamamiyear
tag:        [java]
SN:         6
---

## Javac

```sh
javac -cp classpath -d outpath source_list
```

**解释**

其实重点在于理解java编译中的classpath。classpath就是java的搜索路径，javac在编译时会去这个路径搜索所有需要的类，如果没有就会报告错误。classpath从jdk7开始包含几个部分：

- jdk所在目录的系统库
- 环境变量CLASSPATH所设置的路径
- 编译时加入的-cp或者-claspath参数

## Java

```sh
java -cp classpath Main
```

**解释**

重点还是classpath，这次是告诉java虚拟机去哪里加载主类以及其他类，所以必须要包含主类所在的路径，当然如果加载的类里没有main函数会报错。值得注意的是，类必须是全名称。

**P.S. 如果实在主类所在目录执行，且无需显式地指定其他classpath，那么会java会自动将当前目录加入classpath，但是如果一旦显式地指定-classpath或者-cp，那么也必须显式地将主类目录加入其中。**

## jar

使用jar进行打包的时候，打包的时编译好的字节码文件，而不是源码文件。

### 带main函数的jar包

```sh
touch manifest #首先创建一个文件，名称可以自定
echo "Main-Class: main.Main" >> manifest #编辑manifest文件内容，注意格式:后面有空格 后跟类全名。
jar -cvfm hello.jar manifest -C path/ .
#example:
#jar -cvfm hello.jar ~/projects/javaCompile/manifest -C ~/projects/javaCompile/out/ .
java -jar hello.jar #执行
```

### 不带main函数的jar包

```sh
jar -cvfM hello.jar -C path/ ./path/files.class
```

