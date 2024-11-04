<script setup>
	import { onLaunch } from '@dcloudio/uni-app'
	import db from './utils/db';
	import itemService from './services/itemService';
	import userService from './services/userService';
	import orderService from './services/orderService';
	onLaunch(async () => {
		await db.createDatabase()
		await itemService.createTable()
		await userService.createTable()
		await orderService.createTable()
	})
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
