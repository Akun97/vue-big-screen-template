<template>
  <div class="digital-flop-component">
    <DigitalItem
      v-for="(item, index) in integerDigitalArray"
      :key="getItemKey(index)"
      :data="item"
      :animation="animation"
    ></DigitalItem>
    <template v-if="decimalDigitalArray.length > 0">
      <DigitalItem
        data="."
        :animation="false"
      ></DigitalItem>
    </template>
    <DigitalItem
      v-for="(item, index) in decimalDigitalArray"
      :key="index"
      :data="item"
      :animation="animation"
    ></DigitalItem>
  </div>
</template>
 
<script setup lang="ts">
/**
 * @Description: 数字翻牌器组件
 * @version 1.0.0 2022-06-05 22:10:42
 */
 
interface Props {
  value: number;
  minLength?: number | undefined;
  maxLength?: number | undefined;
  // 小数位数
  decimalPlaceNumber?: number;
  // 是否显示千分位
  isShowSeparator?: boolean;
  // 是否添加动画效果
  animation?: boolean;
}
 
const props = withDefaults(defineProps<Props>(), {
  value: 0,
  minLength: 0,
  isShowSeparator: false,
  animation: true,
  decimalPlaceNumber: 4
});
 
// 整数数组
const integerDigitalArray = ref<string[]>([]);
// 小数数组
const decimalDigitalArray = ref<string[]>([]);
 
watch(
  () => props.value,
  () => {
    initDigitalData(props.value);
  },
  { immediate: true }
);
 
/**
 * 设置整数数组
 * @param digitalValue
 */
function initDigitalData(digitalValue: number) {
  let integerArray = [];
  // 显示小数位
  if (props.decimalPlaceNumber > 0) {
    const value = Number(digitalValue.toFixed(props.decimalPlaceNumber)).toString();
    const index = value.indexOf(".");
    if (index !== -1) {
      decimalDigitalArray.value = value.substring(index + 1).split("");
      integerArray = value.substring(0, index).split("");
    } else {
      decimalDigitalArray.value = [];
      integerArray = digitalValue.toString().split("");
    }
  } else {
    decimalDigitalArray.value = [];
    integerArray = digitalValue.toString().split("");
  }
  const addZero = (array: string[], minLength: number) => {
    if (array.length < minLength) {
      array.unshift("0");
      addZero(array, minLength);
    }
  };
  if (props.minLength) {
    addZero(integerArray, props.minLength);
  }
  if (props.maxLength && integerArray.length > props.maxLength) {
    console.error(
      `传入的数字${digitalValue}已经超过最大长度${props.maxLength}`
    );
  }
  // 添加千分位
  if (props.isShowSeparator) {
    integerArray = addSeparator(integerArray);
  }
  integerDigitalArray.value = integerArray;
}
 
/**
 * 添加千分号
 * @param array
 */
function addSeparator(array: Array<string>) {
  const dataArray = array.reverse();
  const separatorArray = [];
  while (dataArray.length) {
    separatorArray.push(dataArray.splice(0, 3).join(""));
  }
  return separatorArray.join(",").split("").reverse();
}
 
// 设置关键字，从小数位开始向左为1，避免出现数字变大时的显示问题
function getItemKey(index: number) {
  return integerDigitalArray.value.length - index;
}
</script>
 
<style lang="scss" scoped>
.digital-flop-component {
  display: flex;
  align-items: flex-end;
  flex-wrap: nowrap;
 
  .digital-item-component {
    margin-right: 4px;
  }
 
  .digital-item-component:last-child {
    margin-right: 0;
  }
}
</style>