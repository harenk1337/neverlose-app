<template>
	<view>
		<MyNavBarVue title="首页">
			<view class="uni-ma-15">
				<uni-forms ref="formRef" :model="formData" label-position="top" :rules="rules">
					<uni-forms-item label="用户名" name="username" required>
						<uni-easyinput v-model="formData.username" prefix-icon="person" placeholder="输入要绑定的 NL 用户名"
							trim></uni-easyinput>
					</uni-forms-item>
					<uni-forms-item label="绑定项目" name="items" required>
						<uni-data-checkbox v-model="formData.items" mode="button" :localdata="itemList"
							:map="{text: 'name', value: 'code'}" />
					</uni-forms-item>
				</uni-forms>
				<view v-if="itemList.length < 1">
					<text>暂无项目</text>
					<br />
					<br />
				</view>
				<button v-if="itemList.length < 1" type="primary" @click="handlePush('item')">点击去新增项目</button>
				<br v-if="itemList.length >= 1" />
				<button v-if="itemList.length >= 1" type="primary" @click="onSubmit" :loading="loading">开始绑定</button>
				<br />
				<button type="warn" @click="handlePush('guild')">使用教程</button>
				<br />
				<button type="default" @click="handlePush('order')">查看订单</button>
			</view>
		</MyNavBarVue>
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
	import MyNavBarVue from '../../components/MyNavBar.vue';
	import userService from '../../services/userService';
	import orderService from '../../services/orderService';

	const loading = ref(false)
	const itemList = ref([])
	onLoad(async () => {
		const data = await itemService.getItemList()
		itemList.value = data
	})

	const formRef = ref()
	const formData = ref({
		username: void 0,
		items: void 0
	})
	const rules = {
		username: {
			rules: [{
				required: true,
				errorMessage: '用户名不能为空！'
			}]
		},
		items: {
			rules: [{
				required: true,
				errorMessage: '请选择一个项目！',
			}]
		}
	}


	const reasonMap = {
		'This user already has this item.': '用户已拥有该项目',
		'User doesn\'t exist.': '用户不存在',
		'Invalid key.': 'API ID设置错误,请检查',
		'signature error': 'API KEY设置错误,请检查',
		'item error(must be approved, paid and public)': '项目错误,必须已通过且设置为付费且公开(Public)',
		'invalid item': '项目代码设置错误,请检查'
	}
	const onSubmit = async () => {
		await formRef.value.validate().then(async () => {
			const itemName = itemList.value.filter(i => i.code === formData.value.items)[0]['name']
			const {
				data
			} = await userService.pushItem(formData.value, itemName)
			await orderService.createOrder({
				username: formData.value.username,
				itemName,
				status: data.success ? '成功' : '失败',
				reason: data.success ? '无' : reasonMap[data['error']],
				createTime: new Date().toISOString().substring(0, 19).replace('T', ' ')
			})
			uni.showToast({
				title: data.success ? '绑定成功！' : '绑定失败！',
				icon: data.success ? 'success' : 'error'
			})
		}).catch(err => {
			console.log('校验出错: ', err);
		})
	}

	const handlePush = (path) => {
		uni.reLaunch({
			url: `/pages/index/${path}`
		})
	}
</script>

<style>
</style>