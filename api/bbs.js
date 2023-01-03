import Request from '@/utils/request.js'
import {upload} from '@/common/js/utils.js'
export default{
	// 获取帖子分类列表
	bbsCategory(page){
		return Request.request({
			url:`/mobile/bbs?page=${page}`,
			method:'GET'
		})
	},
	// 获取全部帖子内容
	bbsAllList(page,id,kw=''){
		return Request.request({
			url:`/mobile/post/list?page=${page}&keyword=${kw}&bbs_id=${id}`,
			method:'GET'
		})
	},
	// 选择社区
	chooseCommunity(page,limit){
		return Request.request({
			url:`/mobile/bbs?page=${page}&limit=${limit}`,
			method:'GET'
		})
	},
	uploadImg(filePath){
		return upload(({
			url:'/mobile/upload',
			filePath
		}))
	},
	//发布帖子
	publishPost(data){
		return Request.request({
			url:'/mobile/post/save',
			method:"POST",
			data
		})
	},
	//帖子详情
	bbsDetail(id){
		return Request.request({
			url:`/mobile/post/read?id=${id}`,
			method:'GET'
		})
	},
	// 帖子评论
	postComment(id,page){
		return Request.request({
			url:`/mobile/post_comment?post_id=${id}&page=${page}`,
			method:'GET'
		})
	},
	// 点赞
	support(data){
		return Request.request({
			url:'/mobile/post/support',
			method:'POST',
			data
		})
	},
	// 取消点赞
	unSupport(data){
		return Request.request({
			url:'/mobile/post/unsupport',
			method:'POST',
			data
		})
	},
}