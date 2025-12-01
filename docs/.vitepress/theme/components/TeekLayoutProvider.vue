<script setup lang="ts" name="TeekLayoutProvider">
import Teek from "vitepress-theme-teek";
import ContributeChart from "./ContributeChart.vue";
import NotFound from "./404.vue";
import { useRouter } from "vitepress";
import { watch } from "vue";
import { isClient } from "vitepress-theme-teek";

// 获取 VitePress 路由
const router = useRouter();

// 监听路由变化，调用百度统计和Google统计的页面跟踪方法
watch(
  () => router.route.path,
  (newPath) => {
    // 百度统计
    if (isClient && window._hmt) {
      // 直接调用百度统计的原生_trackPageview方法，不传递任何参数
      // 让百度统计自己处理当前页面的URL和来源信息
      // 这样可以保留完整的来源信息
      window._hmt.push(["_trackPageview"]);
    }
    
    // Google统计
    if (isClient && window.gtag) {
      // 调用Google统计的页面浏览事件
      // 对于Google Analytics 4，使用page_view事件
      // 对于Universal Analytics，使用config命令
      window.gtag("event", "page_view", {
        page_path: newPath
      });
    }
  },
  { immediate: true } // 立即执行一次
);
</script>

<template>
  <Teek.Layout>
    <template #teek-archives-top-before>
      <ContributeChart />
    </template>

    <template #not-found>
      <NotFound />
    </template>
  </Teek.Layout>
</template>

<style lang="scss">
.tk-my.is-circle-bg {
  margin-bottom: 20px;

  .tk-my__avatar.circle-rotate {
    margin-top: 200px;
  }
}
</style>