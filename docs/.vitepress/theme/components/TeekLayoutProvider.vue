<script setup lang="ts" name="TeekLayoutProvider">
import Teek from "vitepress-theme-teek";
import ContributeChart from "./ContributeChart.vue";
import NotFound from "./404.vue";
import { useRouter } from "vitepress";
import { watch } from "vue";
import { isClient } from "vitepress-theme-teek";

// 获取 VitePress 路由
const router = useRouter();

// 监听路由变化，调用百度统计的_trackPageview方法
// 百度统计脚本已通过主题的siteAnalytics配置自动加载
watch(
  () => router.route.path,
  (newPath) => {
    if (isClient && window._hmt) {
      // 直接调用百度统计的原生_trackPageview方法，不传递任何参数
      // 让百度统计自己处理当前页面的URL和来源信息
      window._hmt.push(["_trackPageview"]);
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