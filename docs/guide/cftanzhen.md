---
slug: 2026-07-09-cf
title: CF-Server-Monitor突破免费额度限制，部署静态文件到GitHub Page
description: 教程
pubDate: 2026-07-09
tags:
  - 探针
---
本文是针对[CF-Server-Monitor](https://github.com/huilang-me/CF-Server-Monitor)项目V2.7.7+版本的补充说明，这个版本更新后，通过配置之后允许第三方跨域请求，也就是不同域名前端页面（纯静态，可以放在任意服务器，包括不限于自己的服务器，GitHub Page，Cloudflare Page，有https环境即可）可以调用本项目的后端接口。我同步调整了前端代码，支持一个前端调用多个不同的探针接口，实现同页面显示多账号的效果，实现Workers免费额度的突破。同时前端可以完全独立，给主题爱好者实现无限的可能。本次以简单的GitHub Page为例子。

前提准备：

一个或者多个Cloudflare/ 一个Github账号

教程开始

## 1. 部署探针

每个账号部署一个[CF-Server-Monitor](https://github.com/huilang-me/CF-Server-Monitor)探针项目，参考[CF-Server-Monitor安装喂饭教程](https://huilang.me/cf-server-monitor-setup/)

## 2. 部署前端

### 2.1 开启GitHub Page

点击自己Fork之前成功的CF-Server-Monitor项目的**Settings** → **Pages** →Build and deployment -> Source 下面下拉选择Github Actions，自动跳转后就可以了。

下方可用绑定域名，需要cname到 **[你的github ID].github.io** 。建议绑定域名，然后开启Cloudflare的CDN，不然国内可能无法访问。

![img](https://huilang.me/wp-content/uploads/2026/07/2026-07-03-32.png)

### 2.2 设置环境变量

再设置GitHub环境变量，点击自己项目的**Settings** → **Secrets and variables** → **Actions**

![img](https://huilang.me/wp-content/uploads/2026/07/2026-07-03-2.png)

点击 **New repository secret**

![img](https://huilang.me/wp-content/uploads/2026/07/2026-07-03-497.png)

| 变量               | 说明               | 示例                              |
| :----------------- | :----------------- | :-------------------------------- |
| `API_BASE`         | 逗号分隔的探针地址 | `https://a.com,https://b.com`     |
| `TITLE`            | 站点标题           | `服务器监控`                      |
| `BACKGROUND_IMAGE` | 背景图片 URL       | `https://cdn.example.com/bg.webp` |
| `CSP_STATIC`       | CSP白名单          | `https://cdn.example.com`         |

API_BASE注意，https开头，没有斜杠结尾，多个用英文逗号隔开

### 2.3 开启Action

Fork后，打开自己项目的Action

![img](https://huilang.me/wp-content/uploads/2026/07/2026-07-03-224.png)

点击 I understand my workflows, go ahead and enable them

### 2.4 运行Aciton

点击左侧Actions的Deploy to GitHub Pages ，然后右侧点 Run workflow,弹出的下拉中 点Run workflow。

![img](https://huilang.me/wp-content/uploads/2026/07/2026-07-03-607.png)

等待自动部署，这一步有时候较久（最近GitHub被AI搞太多，资源不太够，有时候需要排队很久），如果失败，点右上角Re-run jobs重试

部署成功，访问https://[你的github用户名].github.io/CF-Server-Monitor，这时候因为跨域会访问失败

![img](https://huilang.me/wp-content/uploads/2026/07/2026-07-03-243.png)

## 3. 设置允许跨域白名单

署成功后，在每个Workers环境变量增加允许跨域，和添加API_SECRET的方式一样，添加CORS_ALLOWED_ORIGINS，值为上面的 你自己的前端域名，比如https://[你的github用户名].github.io(注意https开头，结尾没有/)。如需要允许被多个域名跨域使用，可以用英文逗号隔开。

![img](https://huilang.me/wp-content/uploads/2026/06/2026-06-24-951.png)

到这里部署完成，访问你的GitHub Page地址（**https://[你的github ID].github.io/CF-Server-Monitor 或你绑定的域名**）即可。。

## 4. 登录授权以及CF盾

如果需要访问后台，或者关闭公开访问，因为多站点授权不一致，需要在每个站点的后台的JWT token设置成一样，就可以统一token管理。

要开启CF盾的话，多个站点都需要用同一个Turnstile密钥，且站点需要加到Turnstile白名单去。

 

## 自定义主题

可以根据GitHub项目的src/frontend二次开发，完全独立，无限可能。API接口可以参考 https://github.com/huilang-me/CF-Server-Monitor/blob/main/API.md