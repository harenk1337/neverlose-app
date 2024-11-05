<template>
	<view>
		<MyNavBarVue title="个人信息">
			<view class="uni-ma-15">
				<uni-forms ref="formRef" :model="formData" label-position="top" :rules="rules">
					<uni-forms-item label="User ID" name="userId" required>
						<uni-easyinput v-model="formData.userId" prefix-icon="person" placeholder="请输入 User ID"
							trim></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="API key" name="apiKey" required>
						<uni-easyinput v-model="formData.apiKey" prefix-icon="locked" placeholder="请输入 API key"
							trim></uni-easyinput>
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="saveConfig">保存信息</button>
				<br />
				<uni-link href="https://en.neverlose.cc/market/api" :show-under-line="false">
					<button type="default">查看配置</button>
				</uni-link>
			</view>
		</MyNavBarVue>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import userService from '../../services/userService';
	import MyNavBarVue from '../../components/MyNavBar.vue';
 
	const formRef = ref()
	const formData = ref({
		id: '',
		userId: '',
		apiKey: ''
	})
	const rules = {
		userId: {
			rules: [{
				required: true,
				errorMessage: 'User ID 不能为空！'
			}, {
				pattern: /^\d{6}$/,
				errorMessage: 'User ID 是长度应为 6 的数字！'
			}]
		},
		apiKey: {
			rules: [{
				required: true,
				errorMessage: 'apiKey 不能为空！',
			}, {
				pattern: /^[A-Za-z0-9]{25}$/,
				errorMessage: 'apiKey 长度应为 25！'
			}]
		}
	}

	onLoad(async () => {
		let data = await userService.getConfig()
		data = data[0]
		formData.value = { ...data }
	})
	const saveConfig = async () => {
		formRef.value.validate().then(async () => {
			if (formData.value.id && formData.value.id !== '') {
				await userService.updateConfig(formData.value)
				uni.showToast({
					title: '保存成功!'
				})
			} else {
				await userService.addConfig(formData.value)
				uni.showToast({
					title: '保存成功!'
				})
			}
		}).catch(err => {
			console.log("校验失败", err);
		})
	}
</script>

<style>

</style>