<template>
  <div :class="`${bg} w-full h-[44px] bg-full bg-no-repeat bg-center flex items-center justify-between`">
    <div 
      class="pl-[48px] pr-[8px] flex-1 text-[20px] text-white break-all leading-[30px] line-clamp-1" 
      :title="title"
    >
      {{title}}
    </div>
    <div class="flex-grow-0 flex-shrink-0">
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  title?: string;
  bg?: string;
}
withDefaults(defineProps<Props>(), {
  title: '',
  bg: 'bg-title-mini'
});

</script>