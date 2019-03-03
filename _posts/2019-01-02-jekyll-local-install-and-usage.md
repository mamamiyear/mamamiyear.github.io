---
layout:     post
title:      "Jekyll本地安装及使用"
date:       2019-01-02 14:00:00 +0800
author:     mamamiyear
tag:        [other]
SN:         2

typora-root-url: ..
---

### 简介

​	Jekyll 是一款静态博客网页生成器。跟普通网站不同，Jekyll 并没有服务器，它依据一定规则的静态文件来表征网页样式，通过解析固定格式的 Markdown 文件直接生成静态网页来显示你的博客内容。当前许多主流代码仓都支持 Jekyll ，例如 github、coding 等，都可以通过配置指定仓库来生成个人博客网页。



### 本地安装

​	本文将介绍 Ubuntu 16.04 系统的安装方式，其他系统安装方式不做详细介绍，可以类比操作。

​	**注意：不推荐在 Windows 安装 Jekyll **。

- 安装 Ruby 、RubyDevKit 和 RubyGem

```bash
sudo apt install gcc g++ make  # gem需要依赖gcc g++ make，如已安装则可跳过
sudo apt install ruby ruby-dev rubygems  # jekyll 基于ruby，需要安装ruby、ruby-dev、rubygems
```

- 更换gem源

```bash
gem sources  # 如果命令结果是 https://rubygems.org/ 则代表默认源，国内无法访问，需要换源
gem sources --remove http://rubygems.org/  # 删除原有默认源
gem sources -a http://gems.ruby-china.com  # 添加 gem 国内源
gem sources -c  # 清空源缓存
gem sources -u  # 更新源缓存
```

- 安装 Jekyll

```bash
sudo gem install jekyll  # 安装 jekyll
```



### 基本使用

- 下载一个jekyll 模板

  你可以在 Github 搜索你喜欢的 Jekyll 博客，也可以下载本博客的源码进行修改。下面以本博客的源码为例进行展示。

  ```bash
  git clone git@github.com:mamamiyear/mamamiyear.github.io.git
  ```

- 目录介绍

  ```bash
  一个jekyll工程的基本结构：
  .
  ├── _config.yml
  ├── _drafts
  |   ├── begin-with-the-crazy-ideas.md
  |   └── on-simplicity-in-technology.markdown
  ├── _includes
  |   ├── footer.html
  |   └── header.html
  ├── _layouts
  |   ├── default.html
  |   └── post.html
  ├── _posts
  |   ├── 2017-10-29-why-every-programmer-should-play-nethack.makrdown
  |   └── 2018-04-26-barcamp-boston-4-roundup.md
  ├── _data
  |   └── members.yml
  ├── _site
  └── index.html
  ```

  下面介绍一下这些结构的用途

  - _config.yml

    保存配置数据。很多配置选项都会直接从jekyll的命令行中进行设置，但是如果你把那些配置写在这儿，你就不用非要去记住那些命令了。

  - _drafts

    drafts 是未发布的文章。这些文件的格式中都没有 `title.MARKUP` 数据。

  - _includes

    你可以加载这些包含部分到你的布局或者文章中以方便重用。可以用这个标签 `{% include file.ext %}` 来把文件 `_includes/file.ext` 包含进来。

  - _layouts

    layouts 是包裹在文章外部的模板。布局可以在 YAML 头信息中根据不同文章进行选择。 这将在下一个部分进行介绍。标签 `{{ content }}`可以将content插入页面中。

  - _posts

    这里放的就是你的文章了。文件格式很重要，必须要符合:`YEAR-MONTH-DAY-title.MARKUP`。文件格式可以在文章中自己定制，但是数据和标记语言都是根据文件名来确定的。

  - _data

    这里存放优化网站格式的用的配置。Jekyll会自动加载这个目录下的yaml文件（以.yml 或者.ymal结尾的）。如果有个文件 `members.yml` 在这个目录下，那你可以使用`site.data.members` 来访问文件中的内容。

  - _site

    一旦 Jekyll 完成转换，就会将生成的页面放在这里（默认）。最好将这个目录放进你的 `.gitignore` 文件中。

  - index.html

    主网页文件。

  - 其他html、markdown文件

    如果这些文件中包含 YAML 头信息部分，Jekyll 就会自动将它们进行转换。

  - 其他文件夹and文件

    其他一些未被提及的目录和文件如 `css` 还有 `images` 文件夹，`favicon.ico` 等文件都将被完全拷贝到生成的 site 中。

- 启动用法

  ```bash
  jekyll build
  # => 当前文件夹中的内容将会生成到 ./site 文件夹中。
  
  jekyll build --destination <destination>
  # => 当前文件夹中的内容将会生成到目标文件夹<destination>中。
  
  jekyll build --source <source> --destination <destination>
  # => 指定源文件夹<source>中的内容将会生成到目标文件夹<destination>中。
  
  jekyll build --watch
  # => 当前文件夹中的内容将会生成到 ./site 文件夹中，
  #    查看改变，并且自动再生成。
  
  jekyll serve
  # => 一个开发服务器将会运行在 http://localhost:4000/
  
  jekyll serve --detach
  # => 功能和`jekyll serve`命令相同，但是会脱离终端在后台运行。
  #    如果你想关闭服务器，可以使用`kill -9 1234`命令，"1234" 是进程号（PID）。
  #    如果你找不到进程号，那么就用`ps aux | grep jekyll`命令来查看，然后关闭服务器。[更多](http://unixhelp.ed.ac.uk/shell/jobz5.html).
  
  jekyll serve --watch
  # => 和`jekyll serve`相同，但是会查看变更并且自动再生成。
  ```

  在执行过程中可能会有其他的依赖软件，需要单独安装。



至此，基本上可以开始你的博客之旅了，更多参考请参见[官方中文文档](https://www.jekyll.com.cn/)