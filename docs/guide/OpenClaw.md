## 三、

## 二、不用买 API ！GPT-5.4 接入OpenClaw龙虾（小白极简安装教程）

OpenClaw在宣传中强调部署简单，上手便捷，但实际存在诸多实操难点：

- **环境依赖复杂**：需要Node.js 22.x+、Python、Docker，还要解决各种版本冲突
- **配置步骤多**：安装依赖 → 安装OpenClaw核心 → 配置大模型API → 放行端口 → 启动服务
- **官方甚至不建议在主力机部署**：因为它可以执行命令、访问文件，建议放在隔离环境（如云服务器或虚拟机）
- **本地运行还要考虑设备关机、断网问题**

在部署过程需提前安装Node.js环境，配置npm依赖，调试环节耗时不说且易出现权限报错，依赖缺失等问题，即便完成部署，后续修改模型API，调整文件目录后工具易出现运行异常，故障排查与修复通常需耗时20分钟以上才能实现工具正常启动。

**在此，推荐一种更适配测试场景的UI自动化解决方案-Codex，该工具无需复杂安装部署，无需额外调试，可快速落地UI自动化校验工作，彻底解决OpenClaw应用过程中的各类内耗问题。**

**Codex 是 OpenAI 推出的一款面向软件工程领域的智能代理系统。** 它并非单一工具，而是一个**统一的 AI 工作台**，可以通过桌面应用、命令行、Web 界面、IDE 插件等多种入口访问，背后由专用的 **codex-1 模型**（基于 OpenAI o3 模型针对软件工程任务优化而来）驱动。

**本地配置openclaw小龙虾\**\*\*🦞\*\**\*，使用Codex（桌面版、vscode插件、cli均可),无本地依赖，无需配置驱动，环境变量或 API Key，1 分钟完成初始化,仅需输入一句话即可轻松完成！**

**前置准备**

✅**翻墙工具，全局TUN模式节点切换到非香港地区**

使用高质量真全局的VPN，非娱乐VPN

✅**ChatGPT Business 团队成员账号**（成本15元/月 包售后）

走 API key 是按 token 计费， ChatGPT 订阅自带 Codex 额度，直接喂给龙虾就行，不需要额外买 OpenAI API，不需要花冤枉钱，OpenClaw 可以走 Codex OAuth 登录你的 ChatGPT 账号，这样用的是 20 刀订阅额度。*OpenAI 官宣明确允许使用,目前零风险，放心用。*(免费用户目前也有 Codex 权限)

[![图像](https://pbs.twimg.com/media/HDDmuSJbQAA716A?format=png&name=small)](https://pbs.twimg.com/media/HDDmuSJbQAA716A?format=png&name=small)

**下载OpenAI Codex桌面版**

官网免费下载：

https://openai.com/zh-Hans-CN/codex/

[![图像](https://pbs.twimg.com/media/HDDbuwUaMAQlZdl?format=jpg&name=small)](https://pbs.twimg.com/media/HDDbuwUaMAQlZdl?format=jpg&name=small)

**下载完成后登录账号如下，无需额外配置环境、无需安装驱动**

[![图像](https://pbs.twimg.com/media/HDDckBHbcAAZf5e?format=jpg&name=small)](https://pbs.twimg.com/media/HDDckBHbcAAZf5e?format=jpg&name=small)

**输入：“帮我用OAuth的方式接入OpenClaw”**

[![图像](https://pbs.twimg.com/media/HDDdskQaMAYteWQ?format=jpg&name=small)](https://pbs.twimg.com/media/HDDdskQaMAYteWQ?format=jpg&name=small)

**一路选择 “是”，按提示模型选择GPT-5.4 ,即可完成部署**

[![图像](https://pbs.twimg.com/media/HDDeVbSaMAcjfVY?format=jpg&name=small)](https://pbs.twimg.com/media/HDDeVbSaMAcjfVY?format=jpg&name=small)

**在Codex聊天框输入 “帮我把telegram接入我的龙虾”，把tg机器人的API Token直接喂给他**

[![图像](https://pbs.twimg.com/media/HDDf53JaUAAos9_?format=jpg&name=small)](https://pbs.twimg.com/media/HDDf53JaUAAos9_?format=jpg&name=small)

**获取 Telegram 机器人的 Token（API Token）非常简单，整个过程都在 Telegram 内部通过官方的“机器人之父” BotFather完成。**

**以下是具体步骤**：

1. **找到BotFather****：**打开Telegram，在顶部的搜索栏输入

   [@BotFather](https://x.com/@BotFather)

   。请认准名字旁边标有蓝色官方认证的勾号 (✅) 的账号。

2. **开始对话****：**点击进入与BotFather的聊天界面，点击屏幕下方的**开始**按钮（或者手动发送/start命令）。

3. **创建新机器人****：**向 BotFather 发送命令：/newbot。

4. **设置机器人名称****：** BotFather可以给机器人起一个名字。这个名字会显示在用户的斯托克列表和聊天窗口中，可以随时更改，也支持中文。

5. **设置机器人用户名****：**接着，你需要为机器人设置一个唯一的用户名。这个用户名**必须以bot结尾**（如：my_test_bot或MyTestBot），且设置后不能轻易修改。

6. **获取Token****：**如果用户名绑定占用，BotFather会回复一条恭喜您创建成功的长消息。在这条消息中，您可以找到一串红色的字符串，这就是您的**API Token**（格式通常类似123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ）。

> **⚠️****安全提醒：**此Token相当于您机器人的最高权限密码。请务必保管好。如果发现泄露，请随时向BotFather发送/revoke命令来重置Token。

[![图像](https://pbs.twimg.com/media/HDDhQzEaMAkzhHQ?format=png&name=900x900)](https://pbs.twimg.com/media/HDDhQzEaMAkzhHQ?format=png&name=900x900)

** Codex 额度查看**：打开 Codex 网页版➡️左侧菜单栏选 Codex➡️右上角点设置➡️左侧菜单选 Usage,

OpenClaw 消耗的是 Codex 额度，跟你平时用 ChatGPT 聊天的额度是分开的,不用白不用。

[![图像](https://pbs.twimg.com/media/HDDoPiXaMAI1H7i?format=jpg&name=small)](https://pbs.twimg.com/media/HDDoPiXaMAI1H7i?format=jpg&name=small)

## 一、OpenAI 免费 GPT Plus 绑定 OpenClaw 操作记录

> 今天发现 OpenAI 提供了 1 个月免费 GPT Plus。
> 于是我顺手领取并完成了与 OpenClaw 的绑定，整个流程记录如下。

------

一、订阅免费 GPT Plus

1. 必须使用网页端订阅

本次免费 GPT Plus 需要通过网页端完成订阅。在 iOS 端的在线订阅页面，并没有出现免费提示。

------

1. 网页端遇到的第一个问题：需要绑定支付方式

进入网页订阅流程后，首先遇到的问题是：

• 系统要求先绑定支付方式
• 我尝试使用 国内招行 Visa 卡
• 结果是：直接被拒绝，无法支付

也就是说，单独使用这张国内 Visa 卡，在当前订阅流程下无法成功完成操作。

------

1. 关键步骤：切换订阅国家/地区

在订阅页面的右下角，可以选择国家/地区。
系统一开始会根据代理地址自动定位，我这里默认显示的是日本。

后来的处理方式是：

• 将国家/地区从 日本
• 改为 德国

切换为德国后，支付界面发生了变化，出现了 PayPal 支付入口。

------

1. 通过 PayPal 完成支付

出现 PayPal 支付选项后，我采取了以下方式：

• 使用 PayPal
• 在 PayPal 中绑定 招行 Visa 卡
• 然后通过 PayPal 完成支付

结果：

• 支付成功
• GPT Plus 订阅成功开通
• 顺利拿到了这次 1 个月免费 GPT Plus

------

二、将 OpenAI 订阅绑定到 OpenClaw

完成 GPT Plus 订阅后，接着进行 OpenClaw 绑定 OpenAI 账号。

1. 在 OpenClaw Config 中进行绑定

进入 OpenClaw Config，开始绑定 OpenAI 订阅账号。

------

1. 终端会提示一个登录网址

绑定过程中，终端会输出一个登录网址。
此时需要：

• 点击该网址
• 跳转到本机浏览器打开网页
• 在网页中完成 OpenAI 账号登录

------

1. 登录后会生成回调地址

网页登录完成之后，浏览器会返回一个回调地址（callback URL）。

接下来的关键操作是：

• 将这个回调地址完整复制
• 粘贴回 OpenClaw 终端

完成这一步后，就可以成功完成 OpenAI 账号授权。

------

三、模型选择注意事项

绑定完成后，在 OpenClaw 的模型选择界面，有一个非常重要的注意点：

• 不要选择 OpenAI 系列模型
• 要选择 OpenAI Codex 系列模型