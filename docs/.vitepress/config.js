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
text:"教程",

items:[

{
text:"个人常用Linux命令",
link:"/guide/linux"
},

{
text:"机场前置+独立落地”链式代理",
link:"/guide/lianshidaili"
},

{
text:"CF-Server-Monitor突破免费额度",
link:"/guide/cftanzhen"
},

{
text:"Clash Verge Rev 分流规则",
link:"/guide/fenliuguize"
},

{
text:"Komari部署与美化",
link:"/guide/komaribushu"
},

{
text:"Vercel部署",
link:"/guide/deploy"
}

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