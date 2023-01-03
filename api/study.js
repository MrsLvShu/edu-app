import Request from '@/utils/request.js'

export default{
	//我的帖子
	myPost(page,limit){
		return Request.request({
			url:`/mobile/mypost?page=${page}&limit=${limit}`,
			method:'GET'
		})
	},
	replyPost(data){
		return Request.request({
			url:'/mobile/post/reply',
			method:'POST',
			data
		})
	},
	//我的考试
	myTest(page,limit){
		return Request.request({
			url:`/mobile/user_test/list?page=${page}&limit=${limit}`,
			method:'get'
		})
	},
	userHistory(page,type){
		return Request.request({
			url:`/mobile/user_history/list?page=${page}&type=${type}`,
			method:'GET'
		})
	},
	//我的电子书
	myBook(page,limit){
		return Request.request({
			url:`/mobile/mybook?page=${page}&limit=${limit}`,
			method:'GET'
		})
	},
	//电子书详情
	bookDetail(id){
		return Request.request({
			url:`/mobile/book/read?id=${id}`,
			method:'GET'
		})
	}
}