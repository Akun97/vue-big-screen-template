<template>
  <fullscreen v-model="full">
    <el-config-provider :locale="zhCn">
      <template v-if="showApp">
        <div 
          class="w-[100vw] h-[100vh] overflow-hidden bg-black flex items-center justify-center"
          @dblclick="openFull"
        > 
          <router-view />
        </div>
      </template>
    </el-config-provider>
  </fullscreen>
</template>

<script setup lang="ts">
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

const full = ref<boolean>(false);
const envStore = store().env;
const { showApp } = storeToRefs(envStore);

envStore.getEnv();

const openFull = () => {
  full.value = !full.value;
}

</script>