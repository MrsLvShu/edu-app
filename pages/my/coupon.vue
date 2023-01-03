<template>
	<view>
		<i-coupon-bar :data="couponList" word="立即使用" :scrollType="type"></i-coupon-bar>
	</view>
</template>

<script>
	import userApi from '@/api/my.js'
	export default {
		data() {
			return {
				couponList:[],
				type:false,
				query:{
					page:1,
					limit:10
				}
			}
		},
		onLoad() {
			this.getCouponList()
		},
		methods: {
			// 获取优惠券信息
			async getCouponList(){
				try{
					const response = await userApi.userCoupon(this.query)
					console.log(response,'优惠券');
					this.couponList = response.data.data.rows
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>

</style>
