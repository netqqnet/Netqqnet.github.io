<script setup lang="ts" name="TeekLayoutProvider">
import Teek from "vitepress-theme-teek";
import ContributeChart from "./ContributeChart.vue";
import NotFound from "./404.vue";
import { useRouter } from "vitepress";
import { trackPageview } from "vitepress-theme-teek";
import { onMounted, watch } from "vue";
import { isClient } from "vitepress-theme-teek";

// 获取 VitePress 路由
const router = useRouter();

// 监听路由变化，调用百度统计的trackPageview函数
watch(
  () => router.route.path,
  (newPath) => {
    // 只在客户端运行时才调用trackPageview函数
    if (isClient) {
      // 从配置中获取百度统计ID
      const baiduId = "dc047fc743d8342d826086208bb74ab2";
      
      // 调用trackPageview函数，确保每次路由变化都能正确记录
      trackPageview(
        { id: baiduId, production: false },
        window.location.href
      );
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