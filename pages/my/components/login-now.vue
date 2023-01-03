<template>
	<view>
		<view class="title flex p-3 align-center">
			<view class="title_left bg-light">
				<image :src="userInfo.avatar?userInfo.avatar:'/static/logo.png'" mode="" v-show="isToken"></image>
			</view>
			
			<view class="text-white pl-3 flex-1" v-if="isToken" @click="gotoLogin">
				<view class="">
					<text class="font-md mb-2">{{userInfo.username}}</text>
					<text class="font-sm ml-3" style="color: #fdc00a;">永久会员</text>
				</view>
				<view class="">
					<text class="font-sm">暂无描述</text>
				</view>
			</view>
			<view v-else class="flex flex-column pl-3 flex-1 text-white" @click="gotoLogin">
				<text class="font-md mb-2">立即登录</text>
				<text class="font-sm">登录解锁更多功能</text>
			</view>
			<view v-if="isToken" class="iconfont icon-set mr-2" style="color: white;"></view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		
		computed: {
			...mapState(['userInfo','isToken']),
		
		},
		methods: {
			gotoLogin(){
				if(this.isToken){
					this.navTo('/pages/my/user')
				}else{
					this.navTo('/pages/login/login')
				}
			},
			
		}
	}
</script>

<style lang="scss">
.title_left{
	width: 60px;
	height: 60px;
	border-radius: 50%;
	
	image{
		border-radius: 50%;
	}
}
</style>
