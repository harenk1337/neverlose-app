import db from "../utils/db";
export default {
	createTable() {
		return db.executeSql(`
			create table if not exists items  (
				id integer not null primary key autoincrement,
				name text not null,
				code text not null
			)
		`)
	},

	async getItemList() {
		const sql = `select * from items`
		return await db.selectSql(sql)
	},
	
	async getById(id) {
		const sql = `select id as id, name as itemName, code as itemCode from items where id = '${id}'`
		return await db.selectSql(sql)
	},

	async addItem(item) {
		const sql = `insert into items('name', 'code') values ('${item.itemName}', '${item.itemCode}')`
		try {
			return await db.executeSql(sql)
		} catch (error) {
			console.error('Error adding item: ', error)
		}
	},
	
	async updateItem(item) {
		const sql = `update items set name = '${item.itemName}', code ='${item.itemCode}' where id = '${item.id}'`
		try {
			return await db.executeSql(sql)
		} catch (error) {
			console.error('Error update item: ', error)
		}
	},
	
	async deleteById(id) {
		const sql = `delete from items where id = '${id}'`
		try {
			return await db.executeSql(sql)
		} catch (error) {
			console.error('Error delete item: ', error)
		}
	}
}