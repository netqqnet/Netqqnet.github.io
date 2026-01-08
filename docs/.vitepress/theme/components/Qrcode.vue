<template>
  <div>
    <img :src="qrcodeUrl" width="200" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { customConfig } from '../customConfig';

const qrcodeConfig = customConfig.qrcode;
const qrcodeUrl = ref<string>(qrcodeConfig.default);

onMounted(() => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source');
    
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