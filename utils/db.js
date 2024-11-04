const dbName = 'nvl'
const dbPath = '_doc/nvl.db'

export default {
	async createDatabase() {
		let isOpen = plus.sqlite.isOpenDatabase({
			name: dbName,
			path: dbPath
		})
		if (isOpen) {
			return Promise.resolve()
		}

		return new Promise((resolve, reject) => {
			plus.sqlite.openDatabase({
				name: dbName,
				path: dbPath,
				success: resolve,
				fail: reject
			})
		})

	},

	selectSql(sql) {
		return new Promise((resolve, reject) => {
			plus.sqlite.selectSql({
				name: dbName,
				sql,
				success: resolve,
				fail: reject
			})
		})
	},

	executeSql(sql) {
		return new Promise((resolve, reject) => {
			plus.sqlite.executeSql({
				name: dbName,
				sql,
				success: resolve,
				fail: reject
			})
		})
	}
}