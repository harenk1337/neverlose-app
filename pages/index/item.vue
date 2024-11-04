<template>
	<view>
		<MyNavBarVue title="项目管理">
			<uni-table ref="tableRef" border stripe emptyText="没有更多数据">
				<uni-tr>
					<uni-th align="center">项目名</uni-th>
					<uni-th align="center">项目代码</uni-th>
					<uni-th align="center" width="150">操作</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in tableData" :key="index">
					<uni-td align="center">{{ item.name }}</uni-td>
					<uni-td align="center">{{ item.code }}</uni-td>
					<uni-td>
						<view class="uni-group">
							<button size="mini" type="primary" @click="handleEdit(item.id)">修改</button>
							<button size="mini" type="warn" @click="showDelete(item)">删除</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<br />
			<view class="uni-ma-10">
				<button type="primary" @click="handleAdd">新增项目</button>
			</view>
		</MyNavBarVue>
		<view>
			<uni-popup ref="deleteDialogRef" type="dialog">
				<uni-popup-dialog cancelText="取消" confirmText="确定" title="删除项目" :content="deleteContent"
					@close="deleteDialogRef.close()" @confirm="handleDelete"></uni-popup-dialog>
			</uni-popup>
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
	import MyNavBarVue from '../../components/MyNavBar.vue';
	import itemService from '../../services/itemService';

	const tableRef = ref()
	const tableData = ref([])
	onLoad(async () => {
		tableData.value = await itemService.getItemList()
	})
	const handleAdd = () => {
		uni.navigateTo({
			url: `/pages/index/upsertItem`
		})
	}

	const handleEdit = id => {
		uni.navigateTo({
			url: `/pages/index/upsertItem?id=${id}`
		})
	}

	const deleteId = ref()
	const deleteDialogRef = ref()
	const deleteContent = ref('')
	const showDelete = (item) => {
		deleteId.value = item.id
		deleteContent.value = `你确定你要删除 ${item.name} 吗？`
		deleteDialogRef.value.open()
	}
	const handleDelete = async () => {
		await itemService.deleteById(deleteId.value).then(() => {
			uni.showToast({
				title: '删除成功!'
			})

			setTimeout(() => {
				uni.reLaunch({
					url: `/pages/index/item`
				})
			}, 500)
		})
	}
</script>

<style>
	.uni-group {
		display: flex;
		align-items: center;
	}
</style>