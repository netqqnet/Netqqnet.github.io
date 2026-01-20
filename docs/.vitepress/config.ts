import { defineConfig } from 'vitepress'

const description = "不仅仅是万一免五，持续更新的投资学习站,聚合多家优质券商，帮你寻找最优的交易费率";

export default defineConfig({
  title: "老倔驴",
  description: description,
  cleanUrls: false,
  lastUpdated: true,
  lang: "zh-CN",

  head: [
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: "/favicon.ico" },
    ],
    ["link", { rel: "icon", type: "image/png", href: "/favicon.ico" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:locale", content: "zh-CN" }],
    ["meta", { property: "og:title", content: "老倔驴" }],
    ["meta", { property: "og:site_name", content: "老倔驴" }],
    ["meta", { property: "og:description", content: description }],
    ["meta", { name: "description", content: description }],
    ["meta", { name: "author", content: "老倔驴" }],
    ["meta", { name: "keywords", content: description }],
    // 百度统计
    [
      "script",
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?dc047fc743d8342d826086208bb74ab2";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();`
    ],
    // 微软Clarity分析
    [
      "script",
      {},
      `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ugcn97sz7d");`
    ],
  ],

  themeConfig: {
    logo: "/logo-mini.png",
    darkModeSwitchLabel: "主题",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新时间",
    outline: {
      level: [2, 4],
      label: "本页导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    nav: [
      { text: '首页', link: '/' }, 
      {
        text: "投资开户",
        items: [
          { text: "🔥大A开户", link: "/kh" },
          { text: "港美股开户", link: "/Business/gmg" },
          { text: "期货开户", link: "/Business/qh" },
        ],
      },
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/Ericlin668' },
      // { icon: 'telegram', link: 'https://t.me/laojuelv' }, // telegram icon might need checking if supported by default theme, but usually ok
    ],
  },
  
  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
  },

  sitemap: {
    hostname: "https://laojuelv.com",
  },
})
