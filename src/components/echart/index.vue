<template>
  <div
    ref="chartRef"
    :id="id"
    :class="className"
    :style="{
      height: height,
      width: width
    }"
  ></div>
</template>

<script setup lang="ts">
import theme from '@/common/echart/style/theme.js' // 引入默认主题
import * as echarts from 'echarts'

interface Props {
  id?: string; // 图表唯一 id
  className?: string; // 图表类名
  width: string; // 图表宽度
  height: string; // 图表高度
  options?: any; // 图表数据项
}
const props = withDefaults(defineProps<Props>(), {
  options: () => ({})
});

const chartRef = ref<HTMLElement>();
const charts = {
  chart: null
}

onMounted(() => {
  // 定义实例
  echarts.registerTheme('myTheme', theme); // 覆盖默认主题
  charts.chart = echarts.init(chartRef.value, 'myTheme');
  initChart();
})

onBeforeUnmount(() => {
  charts.chart.dispose();
  charts.chart = null;
})

// 监听改变
watch(() => props.options, val => {
  val && initChart(val)
}, {
  deep: true
});

/**
 * 初始化echart
 * @param data 数据项
 * @param clearCaching 是否清除缓存
 */
  const initChart = (data?: any, clearCaching = true) => {
  if (data || props.options) {
    charts.chart.setOption(data || props.options, clearCaching)
  }
}

const resize = () => {
  charts.chart.resize();
}

const clear = () => {
  charts.chart.clear();
}

const dispatchAction = (obj?:any):void => {
  charts.chart.dispatchAction(obj);
}

const chartEvent = (event:string, callback:void):void => {
  charts.chart.on(event, callback);
}

defineExpose({
  chartRef,
  initChart,
  dispatchAction,
  chartEvent,
  resize,
  clear
});

</script>