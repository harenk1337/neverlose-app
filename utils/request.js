const BASEURL = 'https://neverlose.cc/api/market/give-for-free'
const handleRequest = async (options, resolve, reject) => {
	uni.showLoading({
		title: `开始绑定 ${options.itemName}...`
	})
	uni.request({
		url: BASEURL,
		method: 'POST',
		data: options.data,
		success: response => {
			return resolve(response)
		},
		fail: err => {
			return reject(err)
		},
		complete() {
			uni.hideLoading()
		}
	})
}

export const pushItemToUser = (options = {}) => {
	return new Promise((resolve, rejects) => {
		handleRequest(options, resolve, rejects)
	})
}