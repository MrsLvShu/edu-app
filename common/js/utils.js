import config from '@/config/index.js'
import store from '@/store/index.js'
export const msg = (title = '', param={}) => {
	if(!title) return;
	uni.showToast({
		title,
		duration: param.duration || 1500,
		mask: param.mask || false,
		icon: param.icon || 'none'
	});
}

export const upload =(options = {})=>{
	return new Promise((resolve,reject)=>{
		const isToken = store.state.isToken
		uni.uploadFile({
		    url: config.baseURL + options.url, 
		    filePath: options.filePath,
		    name: options.name || 'files',
			formData: options.data || {},
			timeout: 8000, 
			header: {'token': `${isToken}`,
			'appid':config.appid
			 },
			success: (res) => {
				if(res.statusCode === 200) {
					console.log('res.data', res.data)
					resolve(JSON.parse(res.data))
				}else {
					reject(res)
				}
			},
			fail: (err) => {
				msg('请求接口失败')
				reject(err)
			},
		})
	})
	
}
let _throttleRunning = false // 用来检测有没有开启节流

export const throttle = (callback, delay = 500) => {


	if (_throttleRunning) {
		return
	}

	_throttleRunning = true

	setTimeout(() => {
		callback()
		_throttleRunning = false
	}, delay)
}