---
layout:     post
title:      "mysql-5.7安装及配置"
date:       2019-02-09 02:30:00 +0800
author:     mamamiyear
tag:        [mysql]
SN:         9
---

## 一、安装

### Ubuntu 安装

```sh
$ sudo apt install mysql-server-5.7
```

### tar 包安装

- #### 下载

  地址: https://dev.mysql.com/downloads/mysql/5.7.html#downloads

  选择Linux - Generic版本，并选取对应的操作系统位数，下载tar.gz包

  ![mysql-5.7-download-page](../assets/2019-02-09-mysql-5.7-install-and-setting/mysql-5.7-download-page.png)

  传至Linux服务器的~/downloads下，并执行解压命令，**解压位置自选，我这里以~/applications为例**

  ```sh
  $ tar zxvf mysql-*.tar.gz -C ~/applications
  ```

- #### 安装

- #### 配置

