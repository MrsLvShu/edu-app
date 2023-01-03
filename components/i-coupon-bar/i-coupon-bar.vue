<template>
	<view class="p-2 bar">
		<scroll-view class="scroll-row" scroll-x v-if="scrollType">
			<view class="coupon" v-for="(item,index) in data" :key="index" :class="item.isgetcoupon?'active':''">
				<view>
					<text class="font-md">￥{{item.price}}</text>
					<text class="font-sm">{{item.type=='course'?'适用课程':'适用专栏'}}：{{item.value.title}}</text>
				</view >
				<view @click="handleClick(item)" >
					{{item.isgetcoupon?'已领取':word}}
				</view>
			</view>
		</scroll-view>
		
		<view v-else class="coupon_my mb-3" v-for="(item,index) in data" :key="index">
			<view>
				<text class="font-md">￥{{item.price}}</text>
				<text class="font-sm">{{item.type=='course'?'适用课程':'适用专栏'}}：{{item.title}}</text>
			</view>
			<view>
				{{item.used==0?'立即使用':'已过期'}}
			</view>
		</view>
	</view>
</template>

<script>
	import indexApi from '@/api/index.js'
	export default {
		name:"i-coupon",
		props : {
			data : {
				type : Array,
				default : () => []
			},
			word:{
				type:String,
				default:'领取'
			},
			scrollType:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				receive:true
			};
		},
		methods:{
			async handleClick(e){
				this.$emit('receive',e)
			}
		}
	}
</script>

<style lang="scss">
	.coupon{
		display: inline-flex;
	    min-width: 310rpx;
	    color : #fff;
	    margin-right: 30rpx;
	}
	.coupon > view:first-child{
		padding: 20rpx 30rpx;
		background-color: #d39e00;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-right: 4rpx dashed #fff;
	} 
	.coupon > view:last-child{
		width: 130rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffc107;
		font-size: 30rpx!important;
		
	}
	.coupon_my{
		display: inline-flex;
		width: 100%;
		color : #fff;
		margin-right: 30rpx;
	}
	.coupon_my > view:first-child{
		padding: 20rpx 30rpx;
		width: 100%;
		background-color: #d39e00;
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: center;
		border-right: 4rpx dashed #fff;
	} 
	.coupon_my > view:last-child{
		min-width: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #ffc107;
		font-size: 30rpx!important;
		
	}
	.active > view:first-child{
		background-color: #dae0e5 !important;
	}
	.active > view:last-child{
		background-color: #dae0e5 !important;
	}
</style>