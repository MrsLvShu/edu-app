import Request from '@/utils/request.js'
import {upload} from '@/common/js/utils.js'
export default {
	// 注册
	userReg(data){
		return Request.request({
			url:'/mobile/reg',
			method:'POST',
			data
		})
	},
	// 登录
	userLogin(data){
		return Request.request({
			url : '/mobile/login',
			method : 'POST',
			data
		})
	},
	// 获取验证码
	userGetCode(data){
		return Request.request({
			url : '/mobile/get_captcha',
			method : 'POST',
			data
		})
	},
	// 绑定手机号
	userBindMobile(data){
    	return Request.request({
    		url : '/mobile/bind_mobile',
    		method : 'POST',
    		data
    	})
    },
	// 找回密码
	RetrievePassword(data){
		return Request.request({
			url:'/mobile/forget',
			method:'Post',
			data
		})
	},
	// 退出登录
	userLogout(data){
		return Request.request({
			url:'/mobile/logout',
			method:'POST',
			data
		})
	},
	// 更新资料
	updateUserInfo(data){
		return Request.request({
			url:'/mobile/update_info',
			method:'POST',
			data
		})
	},
	//更新头像
	uploadImg(filePath){
		return upload(({
			url:'/mobile/upload',
			// method:'POST',
			filePath
		}))
	},
	//修改密码
	editUserPassword(data){
		return Request.request({
			url:'/mobile/update_password',
			method:'POST',
			data
		})
	},
	// 消息列表
	messageList(data){
		return Request.request({
			url:`/mobile/notice/list?page=${data.page}&limit=${data.limit}`,
			method:'GET'
		})
	},
	userCoupon(data){
		return Request.request({
			url:`/mobile/user_coupon?page=${data.page}&limit=${data.limit}`,
			method:'GET'
		})
	},
	//我的订单
	userOrder(page,limit){
		return Request.request({
			url:`/mobile/order/list?page=${page}&limit=${limit}`,
			method:'GET'
		})
	},
	// 我的收藏
	userCollect(page,limit){
		return Request.request({
			url:`/mobile/user_fava?page=${page}&limit=${limit}`,
			method:'GET'
		})
	}
}