import { defineConfig } from 'vitepress'


export default defineConfig({

title: "G.Ark Docs",

description:"个人知识库",


themeConfig:{


logo:"/logo.png",


nav:[

{
text:"首页",
link:"/"
},

{
text:"教程",
link:"/guide/linux"
},

{
text:"工具",
link:"/tools/github"
}

],


search:{


provider:"local"


},



sidebar:{


"/guide/":[

{
text:"基础与网络",
items:[
{text:"个人常用Linux命令",link:"/guide/linux"},
{text:"机场前置+独立落地”链式代理",link:"/guide/lianshidaili"},
{text:"Clash Verge Rev 分流规则",link:"/guide/fenliuguize"}
]
},

{
text:"建站与部署",
items:[
{text:"Vercel部署",link:"/guide/deploy"},
{text:"GitHub+Vercel 搭建 YouTube 转播客站点",link:"/guide/github-vercel-youtube"},
{text:"Telegram 频道展示博客部署",link:"/guide/telegram-channel-blog"},
{text:"Twitter 监控页：前端 Vercel + 后端本机",link:"/guide/twitter-vercel"},
{text:"极简浏览器起始页 Astralis",link:"/guide/astralis-startpage"},
{text:"玩客云 Hexo + Cloudflare 隧道公网访问",link:"/guide/onecloud-hexo-cloudflare"}
]
},

{
text:"探针与监控",
items:[
{text:"Komari部署与美化",link:"/guide/komaribushu"},
{text:"WAWO-DNS修改与WARP安装",link:"/guide/wawo"},
{text:"CF-Server-Monitor突破免费额度",link:"/guide/cftanzhen"},
{text:"NAT VPS 部署哪吒监控",link:"/guide/nat-vps-nezha"}
]
},

{
text:"自动化与推送",
items:[
{text:"RSS-to-Telegram-Bot 部署",link:"/guide/rss-to-telegram"}
]
},

{
text:"币圈与工具",
items:[
{text:"OKX Boost X Launch 监控",link:"/guide/okx-boost"}
]
},

{
text:"AI 工具",
items:[
{text:"OpenAI 免费 GPT Plus 绑定 OpenClaw",link:"/guide/openai-gpt-plus-openclaw"},
{text:"搭建自己的 AI 中转服务",link:"/guide/ai-relay-build"}
]
},

{
text:"节点与效率",
items:[
{text:"节点分享网站代码",link:"/guide/node-share"},
{text:"Chrome 多开隔离账号",link:"/guide/chrome-multi-instance"},
{text:"查询电脑 IP 地址",link:"/guide/win10-ip"}
]
}

],




"/tools/":[


{

text:"工具",

items:[


{
text:"GitHub项目收藏",
link:"/tools/github"
},


{
text:"V2RayN",
link:"/tools/v2rayn"
},


{
text:"Win10装机软件",
link:"/tools/win10"
}


]

}


]

},



socialLinks:[

{
icon:"github",
link:"https://github.com/"
}

]


}

})