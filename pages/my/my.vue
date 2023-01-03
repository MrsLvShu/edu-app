<template>
	<view>
		<view class="container bg-main">
			<login-now></login-now>
			<menu-bar :item="item"></menu-bar>
		</view>
		<i-my-list :item="list"></i-my-list>
	</view>
</template>

<script>
	import loginNow from './components/login-now.vue'
	import menuBar from './components/menu-bar.vue'
	import list from '@/config/my-list-bar.js'
	export default {
		components:{
			loginNow,
			menuBar
		},
		data() {
			return {
				list:list(),
				item:[
					{
						icon:'iconfont icon-OrderHistory',
						text:'订单',
						page:'/pages/order/order'
					},
					{
						icon:'iconfont icon-pinglun2',
						text:'消息',
						page:'/pages/message/message'
					},
					{
						icon:'iconfont icon-shoucang1',
						text:'收藏',
						page:'/pages/collect/collect'
					},
					{
						icon:'iconfont icon-e-learning-monitor',
						text:'在学',
						page:'/pages/study/study'
					}
				]
			}
		},
		onNavigationBarButtonTap(e){
			console.log('e',e);
			this.navTo('/pages/my/setting')
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.container{
	width: 100%;
	height: 175px;
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
}

</style>
