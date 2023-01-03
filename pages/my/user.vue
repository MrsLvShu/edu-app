<template>
	<view>
		<i-my-list v-model="form" :item="userList" @chooseImg="chooseImg" @chooseSex="chooseSex"></i-my-list>
		<view class="p-3">
			<view class="login-btn bg-main" @click="handleSubmitForm">保存</view>
		</view>
		
	</view>
</template>

<script>
	import list from '@/config/user-info-list.js'
	import api from '@/api/my.js'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				userList:list(),
				form:{
					avatar:this.$store.state.userInfo.avatar,
					nickname:this.$store.state.userInfo.nickname,
					sex:this.$store.state.userInfo.sex
				}
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			chooseImg(){
				uni.chooseImage({
				    count: 1,
				    sizeType: ['compressed'],
				    success: async (res) => {
				        console.log(res.tempFilePaths,'res.tempFilePaths')
						const filePath = res.tempFilePaths[0]
						uni.showLoading({title: '更换头像中',mask: true })
						const {code, message, data} = await api.uploadImg(filePath)
						console.log(code, data,'code,data')
						if(code === 20000) {
							this.userInfo.avatar = data
							this.form.avatar = data
							console.log('this.userInfo.avatar',this.userInfo.avatar);
							// this.updateUserInfo()
						}else {
							
							this.$util.msg("头像更新失败，请重试")
						}
						uni.hideLoading()
				    }
				})
			},
			editName(){
				
			},
			chooseSex(){
				let sex =['男','女']
				uni.showActionSheet({
				    itemList: sex, 
				    success: (res) => {
						if(res.tabIndex === this.userInfo.sex) return
				       this.userInfo.sex = sex[res.tapIndex]
					   this.form.sex = sex[res.tapIndex]
					   // this.updateUserInfo()
				    }
				});
			},
			handleSubmitForm(){
				console.log(this.form);
				this.userInfo.nickname = this.form.nickname
				this.updateUserInfo()
				
			},
			async updateUserInfo() {
				const res = await api.updateUserInfo(this.userInfo)
				console.log('更新用户信息', res)
				if(res.data.code==20000){
					this.$store.commit('setToken', this.userInfo)
					this.userList = list()
					this.$util.msg('资料更新成功')
					uni.switchTab({
						url:"/pages/my/my"
					})
				}
				if(res.statusCode!==200){
					this.$util.msg(res.data.data)
					return
				}
				
				uni.hideLoading()
			},
		}
	}
</script>

<style>

</style>
