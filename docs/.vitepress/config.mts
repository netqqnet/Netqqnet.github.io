import { defineConfig } from 'vitepress'
import { defineTeekConfig } from "vitepress-theme-teek/config";

// Teek 主题配置
const teekConfig = defineTeekConfig({
    themeEnhance: {
      themeColor: {
        // https://vp.teek.top/guide/theme-enhance.html#%E4%B8%BB%E9%A2%98%E9%A3%8E%E6%A0%BC
         defaultColorName: "ep-red",
         //disabled:true,
      }, 
      spotlight: {
      disabled: true,
      },
      layoutSwitch: {
      disabled: true,
      },
    },
    teekHome: false, // 启用 Teek 首页
    author: {
    name: "老倔驴", // 作者名称
    link: "https://github.com/Kele-Bingtang", // 点击作者名称后跳转的链接
    },
});
const description = ["不仅仅是万一免五，持续更新的投资学习站,聚合多家优质券商，帮你寻找最优的交易费率"].toString();

// https://vitepress.dev/reference/site-config
export default defineConfig({
  extends: teekConfig,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/teek-logo-mini.svg",
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
      { text: "我要开户🔥", link: '/m5kh' }
    ],
    search: {
      provider: 'local'
    },
    socialLinks: [
      { icon: 'twitter', link: 'https://x.com/Ericlin668' }
    ],
    footer: {
      message: '',
      copyright: 'Copyright © 2023-present 老倔驴'
    }
  },
  title: "老倔驴",
  description: description,
  cleanUrls: false,
  lastUpdated: true,
  lang: "zh-CN",
  head: [
    [
      "link",
      { rel: "icon", type: "image/svg+xml", href: "/teek-logo-mini.svg" },
    ],
    ["link", { rel: "icon", type: "image/png", href: "/teek-logo-mini.png" }],
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
  ],
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
