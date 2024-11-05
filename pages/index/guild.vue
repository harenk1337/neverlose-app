<template>
	<view>
		<uni-nav-bar title="使用教程" :height="height" fixed left-icon="arrow-left" @clickLeft="handleBack"></uni-nav-bar>
		<view>
			<uni-collapse accordion>
				<uni-collapse-item title="第一步: 保存配置" show-animation open>
					<view class="uni-ma-15">
						<view>一对一粘贴保存即可</view>
						<br />
						<image mode="aspectFit" src="../../static/guild/userinfo.png" />
						<br />
						<br />
						<uni-link href="https://en.neverlose.cc/market/api" :show-under-line="false">
							<button type="primary">查看配置</button>
						</uni-link>
					</view>
					<br />
					<br />
				</uni-collapse-item>
				<uni-collapse-item title="第二步: 添加项目" show-animation>
					<view class="uni-ma-10">
						项目名可随便填写，主要是方便记住
						<br />
						<br />
						项目代码是你的参数链接 id 后面的字母数字，例如：chimera 的链接如下，那么 <text class="text">chimera</text> 就是项目代码
						<br />
						<br />
						<uni-link href="https://en.neverlose.cc/market/item?id=chimera" text="https://en.neverlose.cc/market/item?id=chimera"
							showUnderLine="false" font-size="18" color="#007BFF" />
						<br />
						<br />
						第二个是 cs2 市场评价第一的参数链接，<text class="text">uCMQ5D</text> 就是其项目代码
						
						<br />
						<br />
						<uni-link href="https://en.neverlose.cc/market/item?id=uCMQ5D" text="https://en.neverlose.cc/market/item?id=uCMQ5D"
							showUnderLine="false" font-size="18" color="#007BFF" />
					</view>
					<br />
					<br />
				</uni-collapse-item>
				<uni-collapse-item title="第三步: 开始使用" show-animation>
					<view class="uni-ma-10">
						输入你要绑定的用户名和项目，点击开始绑定即可。
						<br />
						绑定失败可前往订单查看原因。
						<br /><br /><br />
						<button @click="handleBack" type="primary">返回</button>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import MyNavBarVue from '../../components/MyNavBar.vue'

	const height = ref()

	onLoad(() => {
		uni.getSystemInfo({
			success: res => {
				height.value = res.statusBarHeight + 48 + 'px'
			}
		})
	})

	const handleBack = () => {
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
</script>

<style>
.text {
	color: red;
}
</style>