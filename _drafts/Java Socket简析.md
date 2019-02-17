---
layout:     post
title:      "Java Socket学习笔记"
date:       2019-02-10 01:30:00 +0800
author:     mamamiyear
tag:        [mysql]
SN:         
---

# Java Socket学习笔记

### 入门知识

1. Socket称为套接字，是一种网络通信接口
2. Socket本质上是平等的，不区分服务端客户端，但我们在实现逻辑上一般分为服务端Socket和客户端Socket，是双向通信模式（如果对Socket不了解，可以先简单查看一下Scoket的相关基础知识）
3. 服务端监听类为java.net.ServerSocket，客户端和服务端的套接字核心类都为java.net.Socket
4. 创建ServerSocket实例后，该实例会监听你所设置的地址和端口
5. 创建Socket实例后，就可以尝试连接你指定的地址和端口，如果有Socket服务则会成功连接


### 基础学习

#### 客户端

​	本来应该先看服务端的，但是服务端涉及两种方式，单线程服务和多线程服务，所以为了叙述方便，这里首先来看客户端方面的使用方法。因为还没写服务端，我们先假设服务端已经启动，在监听客户端的连接了，细节可以先不予考虑。

​	首先我们需要定义我们想连接的ip和port，就定为127.0.0.1和6666吧。接着就可以创建Socket对象了，代码如下：

```java
String ip = "127.0.0.1";
int port = 6666;
Socket socket = new Socket(ip, port);
```

这时，我们就已经创建了一个客户端套接字并且与服务端套接字对接成功了。说人话就是通过Socket连上服务端了，可以进行信息的发送和接收了。

​	下面我们来看看如何发送信息。发送信息需要先获取套接字的输出流：

```java
OutputStream outStream = socket.getOutputStream();
```

通常为了我们使用方便，通常采用包装类进行包装，根据不同需要可以采用不同的包装类，这里我们为了方便描述采用PrintWriter对输出流进行包装

```java
PrintWriter writer = new PrintWriter(outStream);
```

然后就可以使用writer进行信息的发送了

```java
String message = "hello server, this is client.";
writer.println(message); //还有print()方法，性质一样不再赘述
wirter.flush(); //将信息刷入输出流
//信息发送完后关闭资源
writer.close();
outStream.close();
socket.close();
```

*注：很多教程上说PrintWriter可以使用wirte方法，即wirter.write(message)，代替println方法。但是我没有成功，还不知道原因，等待后续再研究吧。*

这样就可以吧消息发送给套接字的另一端了。

​	然后在看看接收信息， 同样需要先获取套接字的输入流：

```java
InputStream inStream = socket.getInputStream();
```

同样我们进行一下包装，不过是用读取类包装，这里采用InputStreamReader和BufferedReader包装：

```java
InputStreamReader streamReader = new InputStreamReader(inStream);
BufferedReader reader = new BufferedReader(streamReader);
```

接收信息与发送不同，需要被动持续等待发送者发送信息，直到收到结束信号或关闭流时才结束：

```java
String info;
while ((info = reader.readLine()) != null) {
  System.out.println("Hello,我是客户端，服务器说：" + info);
}
```

这里有一点需要注意，BufferedReader的readline()方法比较特殊，实际上readLine()是一个阻塞函数，当没有数据读取时，就一直会阻塞在那，而不是返回null;  readLine()只有在数据流发生异常或者另一端被关闭时，才会返回null值。详细IO方面的知识将会在另外的文章中说明。

​	BufferedReader的这个方法的特性让我们不用自己考虑阻塞等待的问题，使用很方便，但需要我们手动关闭流来释放资源，所以上面的代码应该增加一个条件判断，如下：

```java
String info;
boolean quit;
while ((info = reader.readLine()) != null) {
  System.out.println("Hello,我是客户端，服务器说：" + info);
  if (quit) {
    break;
  }
}
//需要关闭的资源
reader.close();
streamReader.close();
inStream.close();
socket.close();
```

至此，我们可以总结一下客户端的全貌了。代码如下：

```java
public class Client {
    public Client() {
        try {
            Socket socket = new Socket("127.0.0.1", 44444);
            PrintWriter out = new PrintWriter(socket.getOutputStream());
            BufferedReader in = 
              new BufferedReader(new InputStreamReader(socket.getInputStream()));
            String message = "hello server, this is client.";
			writer.println(message);
			wirter.flush();
            
          	String info;
			boolean quit;
			while ((info = reader.readLine()) != null) {
  				System.out.println("Hello,我是客户端，服务器说：" + info);
  				if (quit) break;
			}
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
			reader.close();
			streamReader.close();
			inStream.close();
			socket.close();
        }
    }
}
```

#### 服务端

**单线程**

单线程服务端即只允许一个连接，在一个连接未处理完之前，不能处理下一个连接。

首先服务端需要启动一个监听端口的Socket服务，使得当有Socket连接时，能够自动创建与之对接的套接字。我们设定端口仍然为6666， ip不用指定，因为它只监听本机的IP地址。

```java
int port = 6666;
ServerScoket serverSocket = new ServerSocket(port);
//开始监听
Socket socket = serverSocket.accpet();
```

serverSocket.accpet()是一个阻塞方法，当没有连接时线程将阻塞在此，等待连接。当有连接时，它会创建一个对应的套接字并返回。

因为Socket通信本质并没有客户端与服务端的区分，所以其他内容与客户端基本一致，直接来看最终实现：

```java
public class Server {
    public static final int PORT = 6666;
    private ServerSocket serverSocket;
    public Server() {
        serverSocket = new ServerSocket(PORT);
    }
    public void init() {
        try {
          	while (true) {
                Socket socket = serverSocket.accept();
                PrintWriter writer = new PrintWriter(socket.getOutputStream());
            	BufferedReader reader = 
                  new BufferedReader(new InputStreamReader(socket.getInputStream()));
              	String message = "hello client, we have connected.";
				writer.println(message);
             	wirter.flush();
          		String info;
				boolean finished;
              	try {
                  	while ((info = reader.readLine()) != null) {
              			String message = "This is server, I receive your message: ";
						writer.println(message);
                  		writer.println(info);
						wirter.flush();
                  		if (finished) break;
					}
              	} catch (Exception exp) {
              	} finally {
                	reader.close();
					writer.close();
					socket.close();
              	}
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```





