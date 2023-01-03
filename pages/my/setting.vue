<template>
	<view>
		<i-my-list :item="list" @clearStorage="clearStorage"></i-my-list>
		<view class="p-3" v-if="$store.state.userInfo">
			<view class="login-btn bg-main" @click="handleLoginOut">退出登录</view>
		</view>
	</view>
</template>

<script>
	import list from '@/config/setting-list-bar.js'
	import {mapState} from 'vuex'
	import api from '@/api/my.js'
	export default {
		computed: {
			...mapState(['userInfo']),
		},
		data() {
			return {
				list:list()
			}
		},
		methods: {
			//退出登录
			handleLoginOut(){
				uni.showModal({
					content: '是否要退出登录?',
					success: async (res) => {
						if(res.confirm) {
							const res = await api.userLogout(this.$store.state.istoken)
							console.log(res,'res');
							if(res.data.code === 20000) {
								this.$util.msg(res.data.data)
								this.$store.commit('logout')
								setTimeout(() => {
									this.navBack()
								}, 300)
							}else {
								this.$util.msg(res.data.data)
							}
						}
					}
				})
			},
			//清除缓存
			clearStorage(obj){
				console.log('obj',obj);
				uni.showModal({
					content:'是否要清除缓存?',
					success: async (res) => {
						console.log(res,'清除缓存');
						if(res.confirm){
							// uni.clearStorage()
							this.$set(obj,'text','0KB')
							this.$util.msg('清除成功')
							// this.list=list()
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
/deep/ .my-list .list-item{
	border: none !important;
}
</style>
