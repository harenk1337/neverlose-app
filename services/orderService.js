import db from "../utils/db";
export default {
	createTable() {
		return db.executeSql(`
			create table if not exists orders  (
				id integer not null primary key autoincrement,
				username text not null,
				item_name text not null,
				status text not null,
				reason text not null,
				create_time text not null
			)
		`)
	},
	
	async getOrderList() {
		const sql = `select id, username, item_name as itemName, status, reason, create_time as createTime 
		from orders`
		return await db.selectSql(sql)
	},
	
	async createOrder(data) {
		const sql = `insert into orders ('username', 'item_name', 'status', 'reason', 'create_time') values 
		('${data.username}', '${data.itemName}', '${data.status}', '${data.reason}', '${data.createTime}')
		`
		try {
			return await db.executeSql(sql)
		} catch (error) {
			console.error('Error update Config: ', error)
		}
	}
}