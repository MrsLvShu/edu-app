import Request from '@/utils/request.js'
export default {
	flashsaleList(data){
		return Request.request({
			url:`/mobile/flashsale?page=${data.page}&limit=${data.limit}&usable=${data.usable}`,
			method:'GET'
		})
	},
	groupList(data){
		return Request.request({
			url:`/mobile/group?page=${data.page}&limit=${data.limit}&usable=${data.usable}`,
			method:'GET'
		})
	},
	liveList(data){
		return Request.request({
			url:`/mobile/live/list?page=${data.page}&limit=${data.limit}`,
			method:'GET'
		})
	},
	columnList(data){
		return Request.request({
			url:`/mobile/column/list?page=${data.page}&limit=${data.limit}`,
			method:'GET'
		})
	},
	bookList(data){
		return Request.request({
			url:`/mobile/book/list?page=${data.page}&limit=${data.limit}`,
			method:'GET'
		})
	},
	textList(data){
		return Request.request({
			url:`/mobile/testpaper/list?page=${data.page}&limit=${data.limit}`,
			method:'GET'
		})
	}
}