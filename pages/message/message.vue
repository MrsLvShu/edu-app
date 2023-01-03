<template>
	<view>
		<view class="p-2">
			<view class="bg-white rounded p-2" v-for="(item,index) in list" :key="index">
				<view>{{item.content}}</view>
				<text class="text-muted font-sm">{{item.created_time}}</text>
			</view>
			<view class="load-more">
				<text style="color: rgb(119, 119, 119);font-size: 15px;">没有更多数据了</text>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api/my.js'
	export default {
		data() {
			return {
				query:{
					page:1,
					limit:10
				},
				list:[]
			}
		},
		onLoad() {
			this.getMessageList()
		},
		onPullDownRefresh() {
			this.getMessageList()
			uni.stopPullDownRefresh()
		},
		methods: {
			async getMessageList(){
				try{
					const response = await api.messageList(this.query)
					console.log(response,'response');
					if(response.data.code===20000){
						this.list = response.data.data.rows
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #eeeeee;
}
.load-more{
	display: flex;
	flex-direction: row;
	height: 40px;
	align-items: center;
	justify-content: center;
}
</style>
