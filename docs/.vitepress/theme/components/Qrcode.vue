<template>
  <div>
    <img :src="qrcodeUrl" width="200" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { customConfig } from '../customConfig';
import { setCookie, getCookie } from '../utils/cookie';

const qrcodeConfig = customConfig.qrcode;
const qrcodeUrl = ref<string>(qrcodeConfig.default);

onMounted(() => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let utmSource = urlParams.get('utm_source');
    
    // 如果 URL 中没有参数，尝试从 Cookie 获取
    if (!utmSource) {
      utmSource = getCookie('utm_source');
    } else {
      // 如果 URL 中有参数，更新 Cookie (30天)
      setCookie('utm_source', utmSource, 7);
    }
    
    // 根据不同渠道设置不同二维码
    if (utmSource) {
      const source = utmSource.toLowerCase();
      
      if (qrcodeConfig.channels[source]) {
        qrcodeUrl.value = qrcodeConfig.channels[source];
      }
    }
  } catch (error) {
    console.error('Failed to get URL params:', error);
  }
});
</script>