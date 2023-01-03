<template>
	<view>
		<view class="list bg-white mb-2 p-3" v-for="(item,index) in orderList" :key="index">
			<view class="flex justify-between center font-sm" style="color: #636c77;">
				<text>订单时间:{{item.created_time}}</text>
				<text>订单号:{{item.no}}</text>
			</view>
			<view class="pt-4">
				<text>{{item.goods}}</text>
			</view>
			<view class="price text-right text-danger pb-3 pt-2 font-weight-bold" style="font-size: 18px;">
				<text>￥{{item.total_price}}</text>
			</view>
			<view class="font pt-3">
				<text :class="item.status=='success'?'text-success':''">{{item.status=='success'?'交易成功':'等待支付'}}</text>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import myApi from '@/api/my.js'
	export default {
		data() {
			return {
				page:1,
				limit:5,
				orderList:[],
				loadStatus:"loading"
			}
		},
		onLoad() {
			this.getMyOrder()
		},
		onReachBottom() {
			if(this.loadStatus != 'more'){
				return
			}
			this.page = this.page + 1
			this.getMyOrder()
		},
		methods: {
			async getMyOrder(){
				try{
					const res = await myApi.userOrder(this.page,this.limit)
					// console.log(res,'res');
					this.orderList = this.page==1?res.data.data.rows:[...this.orderList,...res.data.data.rows],
					this.loadStatus = res.data.data.rows.length<this.limit?'noMore':'more'
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f3;
	}
.price{
	border-bottom: $uni-underline;
}
</style>
