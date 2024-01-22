<template>
  <screen-loading v-if="loading" class="absolute w-full h-full z-[2000]"></screen-loading>
  <div v-else class="w-full h-full px-[20px] pt-[87px] pb-[20px] grid grid-cols-screen gap-x-[20px]">
    <!-- 左 -->
    <div class="grid grid-rows-screen-left gap-y-[20px]">
      <module-box>
        <template v-slot:title>
          <module-title title="demo"></module-title>
        </template>
        <template v-slot:content>
          
        </template>
      </module-box>
      <module-box>
        <template v-slot:title>
          <module-title title="demo"></module-title>
        </template>
        <template v-slot:content>
          
        </template>
      </module-box>
      <module-box>
        <template v-slot:title>
          <module-title title="demo"></module-title>
        </template>
        <template v-slot:content>
          
        </template>
      </module-box>
    </div>
    <!-- 中 -->
    <div class="grid grid-rows-screen-center">
    </div>
    <!-- 右 -->
    <div class="grid grid-rows-screen-right gap-y-[20px]">
      <module-box>
        <template v-slot:title>
          <module-title title="demo"></module-title>
        </template>
        <template v-slot:content>
          
        </template>
      </module-box>
      <module-box>
        <template v-slot:title>
          <module-title title="demo"></module-title>
        </template>
        <template v-slot:content>
          
        </template>
      </module-box>
      <module-box>
        <template v-slot:title>
          <module-title title="demo"></module-title>
        </template>
        <template v-slot:content>
          
        </template>
      </module-box>
    </div>
  </div>
</template>

<script setup lang="ts">

const loading = ref<boolean>(true); // 加载标识

onMounted(() => {
	cancelLoading()
});

const cancelLoading = ():void => {
  Promise.all([

  ]).then(() => {
    loading.value = false;
  });
}

</script>