<template>
  <div class="table-container">
    <table class="broker-table">
      <thead>
        <tr>
          <th style="min-width: 120px;">券商</th>
          <th style="min-width: 40px;">门槛</th>
          <th style="min-width: 80px;">股票</th>
          <th style="min-width: 80px;">过户费</th>
          <th style="min-width: 80px;">ETF</th>
          <th style="min-width: 80px;">逆回购</th>
          <th style="min-width: 120px;">软件支持</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(broker, index) in visibleBrokers" :key="broker.券商代号" :class="{ highlight: broker.recommend }">
          <td class="broker-cell">
            <div>
              {{ String(index + 1).padStart(2, '0') }} {{ broker.券商代号 }}
              <span v-if="broker.recommend" class="recommend-tag">推荐</span>
            </div>
            <span class="subtitle">{{ broker.推荐语 }}</span>
          </td>
          <td>{{ broker.入金门槛 || '-' }}</td>
          <td v-html="formatFeeText(broker.股票)"></td>
          <td>{{ broker.过户费 || '-' }}</td>
          <td v-html="formatFeeText(broker.ETF)"></td>
          <td>{{ broker.逆回购 || '-' }}</td>
          <td v-html="renderSoftwareSupport(broker.软件支持)"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface Broker {
  券商代号: string;
  券商: string;
  推荐语: string;
  入金门槛: string;
  股票: string;
  ETF: string;
  可转债: string;
  过户费?: string;
  逆回购?: string;
  港股通?: string;
  北交所?: string;
  软件支持: {
    同花顺?: string;
    通达信?: string;
    雪球?: string;
    腾讯自选股?: string;
    云条件单?: string;
    同花顺云条件单?: string;
  };
  永久费率要求: string;
  visible: boolean;
  recommend: boolean;
}

const brokers = ref<Broker[]>([]);
const visibleBrokers = computed(() => brokers.value.filter(broker => broker.visible));

onMounted(async () => {
  try {
    const response = await fetch('/nb/broker_data.json');
    const data = await response.json();
    brokers.value = data;
  } catch (error) {
    console.error('Failed to load broker data:', error);
  }
});

// 处理费率文本，拆分|并格式化
const formatFeeText = (text: string | undefined) => {
  if (!text) return '-';
  
  if (text.includes('|')) {
    const [main, sub] = text.split('|').map(part => part.trim());
    return `${main}<span class="subtitle">${sub}</span>`;
  }
  
  return text.trim();
};

// 渲染软件支持HTML
const renderSoftwareSupport = (software: Record<string, string> | undefined) => {
  if (!software || Object.keys(software).length === 0) {
    return '-';
  }
  
  let result = '<div class="software-support">';
  for (const [key, value] of Object.entries(software)) {
    if (value && value.trim() !== '') {
      result += `<span class="software-badge">${key}${value}</span>`;
    } else {
      result += `<span class="software-badge">${key}</span>`;
    }
  }
  result += '</div>';
  return result;
};
</script>

<style scoped>
.broker-table {
  width: auto;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 13px;
  text-align: left;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
}

.broker-table th,
.broker-table td {
  padding: 10px 7px;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

.broker-table th {
  background-color: var(--vp-c-bg-alt);
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.broker-table tr:hover {
  background-color: var(--vp-c-bg-soft);
}

/* 券商单元格样式 */
.broker-cell {
  font-weight: 500;
}

.broker-cell div {
  position: relative;
  width: fit-content;
  font-size: 1.2em;
  font-weight: 600;
}

/* 推荐标签样式 */
.recommend-tag {
  background-color: #e74c3c;
  color: white;
  padding: 2px 3px;
  border-radius: 2px;
  font-size: 0.6em;
  position: absolute;
  top: -8px;
  right: -27px;
  height: fit-content;
}

/* 高亮行样式 */
.highlight {
  background-color: var(--vp-c-warning-soft);
}

/* 软件支持样式 */
.broker-table :deep(.software-support) {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: flex-start;
}

.broker-table :deep(.software-badge) {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  padding: 2px 3px;
  border-radius: 4px;
  font-size: .8em;
}

/* 副标题样式 */
.subtitle,
.broker-table :deep(.subtitle) {
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  font-weight: normal;
  margin-top: 2px;
  display: block;
}
</style>