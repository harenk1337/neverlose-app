<template>
	<view>
		<MyNavBarVue title="订单管理">
			<view>
				<uni-table ref="tableRef" border stripe emptyText="没有更多数据">
					<uni-tr>
						<uni-th align="center" width="120">用户名</uni-th>
						<uni-th align="center" width="120">项目名</uni-th>
						<uni-th align="center" width="80">状态</uni-th>
						<uni-th align="center">原因</uni-th>
						<uni-th align="center">时间</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in tableData" :key="index">
						<uni-td align="center">{{ item.username }}</uni-td>
						<uni-td align="center">{{ item.itemName }}</uni-td>
						<uni-td align="center">{{ item.status }}</uni-td>
						<uni-td align="center">{{ item.reason }}</uni-td>
						<uni-td align="center">{{ item.createTime }}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</MyNavBarVue>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import MyNavBarVue from '../../components/MyNavBar.vue'
	import orderService from '../../services/orderService';
	
	const tableRef = ref()
	const tableData = ref([])
	onLoad(async () => {
		tableData.value = await orderService.getOrderList()
	})
</script>

<style>

</style>