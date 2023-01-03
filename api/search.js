import Request from '@/utils/request.js'
export default{
	getCourseList(data){
		return Request.request({
			url:`/mobile/search?keyword=${data.content}&page=${data.page}&type=${data.type}`,
			method:'get'
		})
	}
}