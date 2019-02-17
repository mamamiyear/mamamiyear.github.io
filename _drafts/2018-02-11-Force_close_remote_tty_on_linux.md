---
layout:     post
title:      "强制关闭linux登录"
date:       2018-02-11 23:50:45 +0800
author:     mamamiyear
tag:        [linux]
SN:         
---

```Sh
$ who #查看目前登陆的用户和使用的终端
mmmy     tty1         2018-01-18 22:15
mmmy     pts/0        2018-01-19 23:13 (192.168.0.102)
mmmy     pts/1        2018-01-19 23:13 (192.168.0.102)
$ sudo pkill -kill -t tty1 #关闭tty1的登录终端
```

