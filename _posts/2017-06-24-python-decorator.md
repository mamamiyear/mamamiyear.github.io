---
layout: 	post
title:  	"python装饰器"
date:   	2017-06-24 19:49:45 +0200
author:     mamamiyear
categories: study-notes
tag:		python
SN:         2
---

## 函数装饰器

#### 前言

万物皆对象!!!

万物皆对象!!!

万物皆对象!!!

#### 装饰形式

装饰器采用@加装饰函数名称方式，写在被装饰函数定义之。

``` python
def decorator(*args):
    # do additional something
    pass

# 调用
@decorator(param1, param2)
def function():
    # do something
    pass
```

python中，装饰器的本质其实是”语法糖“，只是一种写法，并不牵扯性能问题。

#### 最简单的装饰器

本小节实现了一个打印无参函数执行时间的装饰器，被装饰函数应当是无参函数。

本小节中，被装饰函数应当是**无参函数**。
基本装饰器接收的参数为被装饰函数，主要目的是对被装饰函数进行一些额外的操作，不影响原本功能。例如

```python
# encoding=utf-8
from time import time

def decorator(func):
    """
    打印函数执行时间的装饰器
    """
    def dummy():
        # do nothing
        pass
    start = time()
    func()
    end = time()
    print func.__name__, "执行耗时", end-start, "秒."
	return dummy
    
    
@decorator    
def function():
    """
    无参函数
    """
    # do something
    pass
```

调用时只需要正常调用

```python
function()
```

即可打印出function函数的执行时间了，起到了装饰器的目的。下面说明

**装饰器运行的原理之一**：

**被装饰器装饰的函数在调用时不会调用函数本身，而会转为调用装饰器。并且，当装饰器会自动将被装饰函数对象作为装饰器的唯一参数。**

所以，以上代码相当于function**函数对象**作为参数传递给了装饰器函数，在装饰器内部对传参进行了显示调用，而用户调用function时，执行的其实是decorator。

那么dummy是干什么的呢？其实，如果没有定义dummy函数和return dummy的话则会报一个错误。这是python内部对装饰器的一个机制决定的，

**装饰器运行的原理之二**：

**装饰器应当返回的是一个可调用的对象，装饰器执行完成时会自动调用装饰器的返回值，而不会调用被装饰函数。如果返回值不是callable的或没有返回值，则会报一个无法调用的错误。**

由于本节中手动调用了function，所以采用解决方法就是定义一个空的dummy函数，并将**函数对象**作为返回值

以上代码执行过程相当于不采用装饰器写法的如下过程

```python
a = decorator(function)
a()
```

*可以看出，如果在装饰器中没有显示调用的话，其实并不会执行function函数*



#### 带参函数的装饰器

如果将上一小节中的被装饰函数改为

```python
@decorator
def function(param1, param2):
    print param1, param2
    # do something
    pass
```

那么装饰器就无法工作了，原因是装饰器无法获取用户调用function时传入的参数，自然也就无法在装饰器内部显示调用作为参数传入的函数对象了。

解决这个问题，需要用到**函数嵌套定义**。修改装饰器如下

```python
def decorator(func):
    """
    打印函数执行时间的装饰器
    """
    # do something
    def dummy(*args):
        start = time()
        func(*args)
        end = time()
        print func.__name__, "执行耗时", end - start, "秒."
    return dummy
```

可以看到将装饰主要代码移到dummy函数中，而dummy函数多了参数。这里用到了一个原理

**装饰器运行的原理之三**：

**当把装饰器返回一个可调用的函数对象时，会自动将被装饰函数的参数传递给该对象，如果参数不匹配则会报一个参数不正确的错误。**

结合原理二，可以看到，返回的对象被调用时会以被装饰函数的参数为参数。本节中返回的dummy就是那个对象。

调用方式不变

```python
function(p1, p2)
```

这样就实现了对带参函数的装饰器。

以上代码执行过程相当于不采用装饰器写法的如下过程

```python
a = decorator(function)
a(p1, p2)
```

*仍然可以看出，如果在装饰器中没有显示调用的话，其实并不会执行function函数*



#### 带参装饰器

其实这个说法不太准确，装饰器的参数应该是被装饰函数本身，只是这种写法看似装饰器有参数，故我将其成为带参装饰器。

仍然参照前例，打印函数执行时间，但这次我需要将信息写入日志文件，而且不同的函数需要写入的日志文件路径不同。此时我们就需要带参装饰器了。

修改装饰器如下：

```python
def write_log(url):
    def decorator(func):
        """
        打印函数执行时间的装饰器
        """

        # do something
        def dummy(*args):
            start = time()
            func(*args)
            end = time()
            strr = func.__name__ + " 执行耗时 " +  str(end - start) + " 秒.\n"
            print strr
            f = open(url, 'a')
            f.write(strr)
        return dummy

    return decorator
```

被装饰函数如下

```python
@write_log("./log")
def function(param1, param2):
    print param1, param2
    # do something
    pass
```

上述代码调用时会将function的执行时间写入log文件中，实现了一个带参的装饰器，适应了不同地方的需要。

其实仔细分析就可以看出，write_log并不是装饰器。它只是在@处被显示调用了，而装饰器是以对象的形式出现的，所以说write_log函数的返回值decorator函数对象其实才是真正的装饰器，它接收了被装饰函数function对象作为参数。

以上写法相当于

```python
a = write_log("./log")

@a
def function(param1, param2):
    print param1, param2
    # do something
    pass
```

这样应该就很容易理解了。但是装饰器本身就是”语法糖“，所以这里只是更进一步，可以写在一起，使代码更加简洁美观易读。

至此大致的函数装饰器用法就是这样了。