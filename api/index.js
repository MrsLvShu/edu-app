import Request from '@/utils/request.js'
export default{
	//获取首页所有信息列表
	getMobileIndex(){
		return Request.request({
			url : '/mobile/index',
			method:'GET'
		})
	},
	//获取优惠券列表
	getCoupon(){
		return Request.request({
			url : '/mobile/coupon',
			method : 'GET'
		})
	},
	// 获取拼团列表
	getGroupBuy(type,data){
		return  Request.request({
			url : '/mobile/' + type,
			method : 'GET',
			data
		})
	},
	//领取优惠券
	receiveCoupon(data){
		return Request.request({
			url:'/mobile/user_coupon/receive',
			method:'POST',
			data
		})
	}
}