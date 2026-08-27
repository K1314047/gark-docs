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
link:"/guide/docker"
},

{
text:"工具",
link:"/tools/clash"
}

],


search:{


provider:"local"


},



sidebar:{


"/guide/":[

{
text:"服务器教程",

items:[

{
text:"Docker部署",
link:"/guide/docker"
},

{
text:"Linux基础",
link:"/guide/linux"
},

{
text:"OpenClaw",
link:"/guide/openclaw"
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
text:"Clash Verge",
link:"/tools/clash"
},


{
text:"V2RayN",
link:"/tools/v2rayn"
},


{
text:"Sing-box",
link:"/tools/singbox"
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