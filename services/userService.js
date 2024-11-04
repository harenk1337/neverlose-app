import db from "../utils/db";
import {
	pushItemToUser
} from "../utils/request";
import signUtils from "../utils/signUtils.js"
export default {
	createTable() {
		return db.executeSql(`
			create table if not exists config  (
				id integer not null primary key autoincrement,
				user_id integer not null,
				api_key text not null
			)
		`)
	},

	async getConfig() {
		const sql = `select * from config`
		return await db.selectSql(sql)
	},

	async addConfig(config) {
		const sql = `insert into config (user_id, api_key) values ('${config.userId}', '${config.apiKey}')`
		try {
			return await db.executeSql(sql)
		} catch (error) {
			console.error('Error adding Config: ', error)
		}
	},

	async updateConfig(config) {
		const sql =
			`update config set user_id = '${config.userId}', api_key = '${config.apiKey}' where id = '${config.id}'`
		try {
			return await db.executeSql(sql)
		} catch (error) {
			console.error('Error update Config: ', error)
		}
	},

	async pushItem(data, itemName) {
		let config = await db.selectSql(`select * from config`)
		config = config[0]
		if (!config || !config.user_id || !config.api_key) {
			uni.showToast({
				icon: 'error',
				title: '请配置个人信息'
			})

			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/index/profile'
				})
			}, 1000)
			return 
		}
		
		const formData = {
			'user_id': config.user_id,
			'id': new Date().getTime(),
			'username': data.username,
			'code': data.items,
		}
		const sign = signUtils.sign(formData, config.api_key)
		formData['signature'] = sign

		return await pushItemToUser({
			itemName,
			data: formData
		})
	}
}