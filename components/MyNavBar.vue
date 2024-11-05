<template>
	<view>
		<uni-nav-bar :title="title" :height="height" fixed :border="false" />
			<slot />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	defineProps({
		title: String
	})
	
	const height = ref('')
	onLoad(() => {
		uni.getSystemInfo({
			success: res => {
				height.value = res.statusBarHeight + 48 + 'px'
			}
		})
	})
	
</script>

<style lang="scss">

</style>