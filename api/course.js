import Request from '@/utils/request.js'
export default {
	getCourse(id,groupId=0,flashId=0){
		return Request.request({
			url:`/mobile/course/read?id=${id}&column_id=0&group_id=${groupId}&flashsale_id=${flashId}`,
			method:'GET'
		})
	},
	userCollect(data){
		return Request.request({
			url:'/mobile/collect',
			method:'POST',
			data
		})
	},
	userUnCollect(data){
		return Request.request({
			url:'/mobile/uncollect',
			method:'POST',
			data
		})
	},
	getColumn(data){
		return Request.request({
			url:`/mobile/column/read?id=${data.id}&group_id=${data.group_id}&flashsale_id=${data.flashsale_id}`
		})
	},
	updateUserHistory(data){
		return Request.request({
			url:'/mobile/user_history/update',
			method:'post',
			data
		})
	}
}