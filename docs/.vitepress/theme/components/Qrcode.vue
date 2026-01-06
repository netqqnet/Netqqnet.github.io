<template>
  <div>
    <img :src="qrcodeUrl" width="200" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const qrcodeUrl = ref<string>('/qrcode/qiwei2_pp.png');

onMounted(() => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const channel = urlParams.get('channel');
    
    // 根据不同渠道设置不同二维码
    switch (channel) {
      case '1':
        qrcodeUrl.value = '/qrcode/qiwei2_pp.png';
        break;
      case '2':
        qrcodeUrl.value = '/qrcode/xinyuqw.png';
        break;
      case '3':
        qrcodeUrl.value = '/qrcode/qw_jinli.jpg';
        break;
      // 可以添加更多渠道
      default:
        qrcodeUrl.value = '/qrcode/qw_jinli.jpg';
    }
  } catch (error) {
    console.error('Failed to get URL params:', error);
  }
});
</script>