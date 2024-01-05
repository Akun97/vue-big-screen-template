<template>
  <div class="digital-item-component">
    <div
      v-if="isNumberString"
      class="box-item"
    >
      <div class="number-text-container">
        <!--动态切换效果-->
        <template v-if="animation">
          <div
            v-for="num in 10"
            :key="num"
            class="number-value"
            :style="numberDynamicStyle"
          >
            {{ num - 1 }}
          </div>
        </template>
        <div class="number-value">{{ data }}</div>
      </div>
    </div>
    <div v-else class="box-item mini">
      <div class="number-text-container">
        <div class="number-value">{{ data }}</div>
      </div>
    </div>
  </div>
</template>
 
<script setup lang="ts">
 
interface Props {
  data: string;
  // 是否添加动画效果
  animation?: boolean;
}
 
const props = withDefaults(defineProps<Props>(), {
  data: "0",
  animation: true,
});
 
const isNumberString = computed(() => {
  const numberValue = Number(props.data);
  return !isNaN(numberValue);
});
 
// 数字动态样式
const numberDynamicStyle = computed(() => {
  let numberValue = Number(props.data);
  if (isNaN(numberValue)) {
    numberValue = 0;
  }
  return {
    transform: `translate(0, -${numberValue * 100}%)`,
    transition: "transform 1s ease-in-out"
  };
});
</script>
 
<style lang="scss" scoped>
.digital-item-component {
  .box-item {
    width: 25px;
    height: 37px;
    font-size: 16px;
    border-radius: 4px;
    color: #fff;
    background-color: rgba(92,165,255,0.32);
    position: relative;
    overflow: hidden;

    .number-text-container {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;

      .number-value {
        flex: none;
        width: 25px;
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .mini {
    width: 14px !important;
    .number-value {
      width: 14px !important;
    }
  }
}
</style>