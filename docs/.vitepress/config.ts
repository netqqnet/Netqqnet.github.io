import { defineConfig } from 'vitepress'
import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置
const teekConfig = defineTeekConfig({
    themeEnhance: {
      enabled: true,
      position:"top",
      themeColor: {
        // https://vp.teek.top/guide/theme-enhance.html#%E4%B8%BB%E9%A2%98%E9%A3%8E%E6%A0%BC
         defaultColorName: "vp-red",
         disableHelp: true,
         //disabled:true,
         disabled: false,
         defaultSpread: true,
         customize: {
          vitepressTheme: true,
          elementPlusTheme: false,
         }
      }, 
      spotlight: {
      disabled: true,
      },
      // 布局切换配置
      layoutSwitch: {
        disabled: true, // 禁用布局切换
      },
    },
    teekHome: false, // 启用 Teek 首页
    author: {
    name: "老倔驴", // 作者名称
    link: "https://github.com/Kele-Bingtang", // 点击作者名称后跳转的链接
    },
  // 页脚配置
    footerInfo: {
      // 页脚信息，支持 HTML 格式（位于主题版权上方）
      topMessage: ["已帮助上千人降低交易成本，满意度100%！"],
      // 页脚信息，支持 HTML 格式（位于主题版权下方）
      // bottomMessage: ["上面的内容和图标都可以修改（本条内容也可以隐藏的）"],
      // 主题版权配置
      theme: {
        show: false, // 是否显示主题版权，建议显示
        // name: "", // 自定义名称
        // link: "", // 自定义链接
      },
      // 博客版权配置
      copyright: {
        show: true, // 是否显示博客版权
        createYear: 2021, // 创建年份
        suffix: "老倔驴", // 后缀
      },
      // ICP 备案信息配置
      icpRecord: {
        name: "蜀ICP备2025135343号",
        link: "http://beian.miit.gov.cn/",
      },
    },
    siteAnalytics: [
    // {
    //   provider: "google",
    //   options: {
    //     id: "G-HNLW1TZV86",
    //   },
    // },
    {
      provider: "umami",
      options: {
        id: "399104e8-a096-4d90-aa8e-c0d4d44589f3",
        src: "https://cloud.umami.is/script.js",
      },
    },
  ],
});
const description = ["不仅仅是万一免五，持续更新的投资学习站,聚合多家优质券商，帮你寻找最优的交易费率"].toString();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base : "",
  extends: teekConfig,
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
    ["meta", { property: "og:image", content: "" }],
    ["meta", { property: "og:url", content: "" }],
    ["meta", { property: "og:description", description }],
    ["meta", { name: "description", description }],
    ["meta", { name: "author", content: "老倔驴" }],
    // 禁止浏览器缩放
    // [
    //   "meta",
    //   {
    //     name: "viewport",
    //     content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
    //   },
    // ],
    ["meta", { name: "keywords", description }],
    // 百度统计官方代码，直接添加到head中
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
    // 微软Clarity分析官方代码，直接添加到head中
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
    // https://vitepress.dev/reference/default-theme-config
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
      { text: "福利开户🔥", link: '/kh' }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/Ericlin668' },
      { icon: 'telegram', link: 'https://t.me/laojuelv' },
    ],
  },
  markdown: {
    // 开启行号
    lineNumbers: true,
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true,
    },
    // 更改容器默认值标题
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
    },
  },
  sitemap: {
    hostname: "https://laojuelv.com", // ** 换成你的域名
    transformItems: (items) => {
      const permalinkItemBak: typeof items = [];
      // 使用永久链接生成 sitemap
      const permalinks = (globalThis as any).VITEPRESS_CONFIG.site.themeConfig
        .permalinks;
      items.forEach((item) => {
        const permalink = permalinks?.map[item.url];
        if (permalink)
          permalinkItemBak.push({ url: permalink, lastmod: item.lastmod });
      });
      return [...items, ...permalinkItemBak];
    },
  },
})
