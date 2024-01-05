<template>
  <div class="w-full h-full flex flex-col">
    <slot name="title"></slot>
    <div class="flex-1 w-full h-full relative z-0">
      <div class="absolute w-full h-full overflow-hidden">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>