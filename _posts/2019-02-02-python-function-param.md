---
layout:     post
title:      "Python参数解释"
date:       2019-02-02 14:00:00 +0800
author:     mamamiyear
tag:        [python]
SN:         3

typora-root-url: ..
---

​	python的函数参数形式分为四种，普通参数，有默认值的普通参数，参数列表，参数字典。定义顺序也必须按照以下顺序定义：

```mermaid
graph LR
A(普通参数)
B(默认参数)
C(无名参数)
D(关键字参数)
A --> B
B --> C
C --> D
```

### 参数形式

#### 普通参数

```python
# 定义
def function(param1, param2)

# 调用
function(1, 2)
```

普通参数这就是一般的参数，调用时需要传入实参。

#### 默认参数

```python
# 定义
def function(param1=1, parame2=2):

# 调用
function(1, 2)
```

默认参数也是普通参数，但是它有默认值，调用时可传递实参，也可以不传递该参数，它将使用默认值。

#### 无名参数

```python
# 定义
def function(*args):

# 调用
function(1, 2, 3, 4)
# or
args = (1, 2, 3, 4)
function(*args)
```

无名参数是一个`tuple`类型，它标示一串参数，但是没有对应的形参名称。调用时，可传入一串参数，也可以使用`tuple`传入（传入时需要前面加`*`）。

#### 关键字参数

```python
# 定义
def function(**kwargs):

# 调用
function(param1=1, param2=2, param3=3)
# or
kwargs = {"param1": 1, "param2": 2, "param3": 3}
function(**kwargs)
```

关键字参数是一个`dict`形式，它表示一组参数，参数形参名是`kwargs`的key，实参值是`kwargs`的value。调用时，可以使用一组默认参数形式传入，也可以使用`dict`传入（传入时需要前面加`**`）。

#### 复合使用

```python
# 定义
def function(param1, param2=2, *args, **kwargs):
    print("param1: %d" % param1)
    print("param2: %d" % param2)
    print("args: ", end='')
    for a in args:
        print("%d " % a, end='')
    print()
    for k in kwargs:
        print("%s: %d" % (k, kwargs[k]))

# 调用
args = (4, 5, 6)
kwargs = {"kw1": 11, "kw2": 12} 
function(1, 3, *args, **kwargs)
print("========================")
# or
function(1, 3, *args, kw1=11, kw2=12)
print("========================")
# or
function(1, 3, 4, 5, 6, **kwargs)
print("========================")
# or
function(1, 3, 4, 5, 6, kw1=11, kw2=12)
print("========================")
```

执行结果如下：

```
param1: 1
param2: 3
args: 4 5 6 
kw1: 11
kw2: 12
========================
param1: 1
param2: 3
args: 4 5 6 
kw1: 11
kw2: 12
========================
param1: 1
param2: 3
args: 4 5 6 
kw1: 11
kw2: 12
========================
param1: 1
param2: 3
args: 4 5 6 
kw1: 11
kw2: 12
========================
```

可以看出，每种调用方式的结果都一样。说明**调用时，解释器会先匹配普通参数和默认参数，匹配完成后再将剩下的没有形参的参数组装为tuple，作为无名参数，最后将未出现在函数定义中的形参变为关键字参数字典传入**。*这样也能够解释为什么四种参数需要按顺序定义。*

