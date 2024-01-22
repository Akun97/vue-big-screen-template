<template>
  <div id="index" ref="appRef">
    <div class="w-full h-full bg-page relative overflow-hidden">
			<!-- 头部 -->
			<header class="w-full h-[77px] bg-head bg-full bg-center bg-no-repeat pt-[17px] flex justify-center items-start absolute top-0 left-0 z-[3000]">
				<div class="text-white text-[30px] tracking-[4px] font-douyu leading-[39px]">{{ title }}</div>
				<!-- <template v-if="showView"> -->
					<nav 
						class="flex flex-col absolute right-0 top-[12px] items-end"
						:style="`${showMiniMenuBefore ? '' : 'height: 36px;'}`"
						@dblclick="stopBubbling"
						@click="stopBubbling"
						@mouseenter="showMiniMenuEnter"
						@mouseleave="showMiniMenuLeave"
					>
						<div class="w-[44px] h-[36px] flex-shrink-0 flex-grow-0 cursor-pointer flex items-center justify-center bg-menu/[0.1] shadow-menu border-menu border-solid border-[1px] border-r-0 rounded-l-[20px]">
							<img class="w-[24px] h-[24px] ml-[4px]" :src="require('@/assets/icon_menu.png')" />
						</div>
						<template v-for="(item, index) in miniMenuList" :key="index">
							<template v-if="item.url !== route.path">
								<a 
									class="mini-menu-item block no-underline transition-all ease-in-out overflow-hidden h-[36px] cursor-pointer mt-[10px] first:mt-[16px] leading-[36px] rounded-l-[20px] border-b-[1px] border-b-menu/[0.7]"
									:style="{ width: `${showMiniMenu ? '160' : '0'}px`, transitionDuration: `${0.3+index*0.2}s !important` }"
									:href="goProject(item)"
								>
									<span class="text-white text-[16px] ml-[20px]">{{ item.label }}</span>
								</a>
							</template>
						</template>
					</nav>
				<!-- </template> -->
			</header>
			<!-- <template v-if="showView"> -->
				<main
					class="w-full h-full bg-main bg-full bg-center bg-no-repeat"
					@dblclick="stopBubbling"
				>
					<div class="w-full h-full">
						<!-- 内容 -->
						<router-view v-slot="{ Component, route }">
							<component :is="Component" :key="route.name"></component>
						</router-view>
					</div>
				</main>
			<!-- </template> -->
		</div>
  </div>
</template>

<script setup lang="ts">
import jsCookie from 'js-cookie';

// * 适配处理
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
// 登录校验
// const { showView, getInfo } = useAuthorization();
// 右上角菜单
const showMiniMenuBefore = ref<boolean>(false);
const showMiniMenu = ref<boolean>(false);
const miniMenuList = markRaw([
	{ label: '返回入口', url: `${store().env.URL_MAIN}`, token: true },
]);
const route = useRoute();
const title = ref<string>('');

watch(() => route, (newV) => {
  title.value = newV.meta.title as string;
}, {
  immediate: true,
  deep: true
});

// 生命周期
onMounted(() => {
	// todo 屏幕适应
	windowDraw();
	calcRate();
	// getInfo();
})

onUnmounted(() => {
	unWindowDraw();
})

const stopBubbling = (e) => {
	e.stopPropagation();
}

const showMiniMenuEnter = () => {
	showMiniMenuBefore.value = true;
	nextTick(() => {
		if (showMiniMenuBefore.value) {
			showMiniMenu.value = true;
		}
	});
}

const showMiniMenuLeave = () => {
	showMiniMenu.value = false;
	setTimeout(() => {
		if (!showMiniMenu.value) {
			showMiniMenuBefore.value = false;
		}
	}, 300+(miniMenuList.length - 1)*200);
}

const goProject = (item:any):string => {
	if (item.token) {
		return `${item.url}?token=${jsCookie.get("Zgw-Token")}`;
	} else {
		return `${window.location.origin}/#${item.url}`;
	}
}

</script>

<style lang="scss" scoped>
.mini-menu-item {
	background: linear-gradient(90deg, #095EDD 0%, rgba(10,15,38,0.4) 100%);
}
</style>