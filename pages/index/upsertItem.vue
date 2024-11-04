<template>
	<view>
		<uni-nav-bar :title="title" :height="height" fixed left-icon="arrow-left" @clickLeft="handleBack"></uni-nav-bar>
		<view class="uni-ma-15">
			<uni-forms ref="formRef" :model="formData" label-position="top" :rules="rules">
				<uni-forms-item label="项目名" name="itemName" required>
					<uni-easyinput v-model="formData.itemName" prefix-icon="star" placeholder="请输入项目名"
						trim></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item label="项目代码" name="itemCode" required>
					<uni-easyinput v-model="formData.itemCode" prefix-icon="locked" placeholder="请输入项目代码"
						trim></uni-easyinput>
				</uni-forms-item>
			</uni-forms>
			<button type="primary" @click="saveItem" :loading="loading">保存项目</button>
			<br />
			<button type="default" @click="handleBack" >返回</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import itemService from '../../services/itemService';

	const height = ref()
	const title = ref('新增项目')
	const loading = ref(false)
	const formRef = ref()
	const formData = ref({
		id: void 0,
		itemName: void 0,
		itemCode: void 0
	})
	const rules = {
		itemName: {
			rules: [{
				required: true,
				errorMessage: '项目名不能为空！'
			}]
		},
		itemCode: {
			rules: [{
				required: true,
				errorMessage: '项目代码不能为空！',
			}, {
				pattern: /^[A-Za-z0-9]{6}$/,
				errorMessage: '项目代码是长度为 6 的字母数字！'
			}]
		}
	}


	onLoad(async (data) => {
		uni.getSystemInfo({
			success: res => {
				height.value = res.statusBarHeight + 48 + 'px'
			}
		})
		if (data.id !== void 0) {
			title.value = '修改项目'
			const [result] = await itemService.getById(data.id)
			formData.value = {
				...result
			}
		}
	})

	const handleBack = () => {
		uni.reLaunch({
			url: '/pages/index/item'
		})
	}
	const saveItem = async () => {
		await formRef.value.validate().then(async () => {
			await itemService.addItem(formData.value).then(() => {
				uni.reLaunch({
					url: '/pages/index/item'
				})
			})
		}).catch(err => {
			console.log("校验失败", err);
		})
	}
</script>

<style>

</style>