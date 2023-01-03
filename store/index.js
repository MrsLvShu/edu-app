import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo:uni.getStorageSync('userInfo')|| {}, 
		isToken: uni.getStorageSync('token')|| '' ,
		historyList:uni.getStorageSync('historyList') || []
	},
	getters:{
		hasLogin(state) {
			return !!state.isToken
		},
		// 用户信息
		hasUserInfo(state){
			return !!state.userinfo
		}
	},
	mutations:{
		init(state){
			state.userInfo=uni.getStorageSync('userInfo')|| {},
			state.isToken= uni.getStorageSync('token')|| ''  
		},
		setToken(state, data) {
			console.log(data,'token');
			const {token} = data
			if(token) {
				state.isToken = token
				uni.setStorageSync('token', token)
			}
			
			if(data.username) {
				state.userInfo = data
				uni.setStorageSync('userInfo', data)
			}
		},
		setPhone(state,data){
			console.log(data,'phone');
			state.userInfo.phone = data
			uni.setStorageSync('userInfo', state.userInfo)
		},
		setHistory(state,data){
			state.historyList = data
		},
		logout(state) {
			state.userInfo = {}
			state.isToken = ''
			uni.removeStorageSync('userInfo')
			uni.removeStorageSync('token')
		}
	}
})

export default store