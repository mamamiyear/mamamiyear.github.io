---
layout:     post
title:      "MongoDB创建用户及授权方法"
date:       2018-01-28 20:05:45 +0800
author:     mamamiyear
tag:        [mongodb]
SN:         
---

### 1. 创建用户

**命令：**

```mongodb
db.createUser(user, writeConcern)
```

**说明：**

创建一个数据库新用户用db.createUser()方法，如果用户存在则返回一个用户重复错误。

- user这个文档创建关于用户的身份认证和访问信息；

  user格式如下：

  ```json
  { 
    user: "user name",
    pwd: "password",
    customData: { any content },
    roles: [
      { role: "root", db: "admin" } | <"role">
    ]
  }
  ```


- writeConcern这个文档描述保证MongoDB提供写操作的成功报告。

  writeConcern格式如下：

  ```json
  { w: <value>, j: <boolean>, wtimeout: <number> }
  ```

  w 参数：可选值：

  ​	<number>型 0, 1, 大于1的值

  ​	<string>型 "majority"

  ​	<tag set>

  j 参数：可选值：

  ​	<boolean>

  wtimeout 参数： 可选值：

  ​	<number> 大于等于0的值 意义：一个以毫秒为单位的时间

  ​	限定：仅在 w > 1 时适用

**注意：**

在哪个库下创建用户，则对应只能登陆到该库。

所以管理员必须切换到admin下创建用户，才能创建admin对应的管理员。同样的，它仍然只能在admin登录，但是它可以拥有其他库的权限。

也只有admin对应的用户才能创建一些高级权限。

**创建root用户实例如下：**

```mongodb
db.createUser({
	user: "root",
	pwd: "root",
	customData: {description: "this is root user."},
	roles: [
		{role: "root", db: "admin"},
		{role: "dbOwner", db: "admin"},
		{role: "userAdmin", db: "admin"},
		{role: "userAdminAnyDatabase", db: "admin"},
		{role: "dbAdmin", db: "admin"},
		{role: "dbAdminAnyDatabase", db: "admin"},
		{role: "readWrite", db: "admin"},
		{role: "readWriteAnyDatabase", db: "admin"},
		{role: "clusterAdmin", db: "admin"},
		{role: "clusterManager", db: "admin"},
		{role: "clusterMonitor", db: "admin"},
		{role: "hostManager", db: "admin"},
		{role: "backup", db: "admin"},
		{role: "restore", db: "admin"}
	]
})
```

**创建mamamiyear管理员实例如下：**

```mongodb
db.createUser({
	user: "mamamiyear",
	pwd: "password",
	customData: {description: "this is manager user."},
	roles: [
		{role: "userAdmin", db: "admin"},
		{role: "userAdminAnyDatabase", db: "admin"},
		{role: "dbAdmin", db: "admin"},
		{role: "dbAdminAnyDatabase", db: "admin"},
		{role: "readWrite", db: "admin"},
		{role: "readWriteAnyDatabase", db: "admin"},
		{role: "backup", db: "admin"},
		{role: "restore", db: "admin"}
	]
})
```

**创建普通用户模板如下：**

```Mongodb
db.createUser({
	user: "testuser",
	pwd: "123456",
	customData: {description: "this is manager user."},
	roles: [
		{role: "dbAdmin", db: "testdb"},
		{role: "readWrite", db: "testdb"},
	]
})
```

### Built-In Roles（内置角色）：

1. 数据库用户角色：

   - read
   - readWrite

2. 数据库管理角色：

   - dbAdmin
   - dbOwner
   - userAdmin

3. 集群管理角色：

   - clusterAdmin
   - clusterManager
   - clusterMonitor
   - hostManager；

4. 备份恢复角色：

   - backup
   - restore

5. 所有数据库角色：

   - readAnyDatabase
   - readWriteAnyDatabase
   - userAdminAnyDatabase
   - dbAdminAnyDatabase

6. 超级用户角色：

   - root  

   - 还有几个对应db为"admin"的角色间接或直接提供了系统超级用户的访问

     - dbOwner
     - userAdmin


     - userAdminAnyDatabase


7. 内部角色：
   - __system