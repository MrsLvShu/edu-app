import Request from '@/utils/request.js'
export default {
	testList(id){
		return Request.request({
			url:`/mobile/testpaper/read?id=${id}`,
			method:'GET'
		})
	},
	supportExamination(data){
		return Request.request({
			url:'/mobile/user_test/save',
			method:'POST',
			data
		})
	}
}