<template>
	<view>
		<view class="p-2">
			<i-course-item :item="courseList" type="row"></i-course-item>
		</view>
		<view class="divider"></view>
		<view class="">
			<uni-list>
				<uni-list-item title="优惠券" rightText="请选择优惠券(1张)" link to="/pages/my/coupon"></uni-list-item>
				<view class="flex">
					<uni-list-item title="支付方式"></uni-list-item>
					<view class=" text-success mt-2">
						微信支付
					</view>
				</view>
				
			</uni-list>
		</view>
		<view class="fixed-bottom p-2 border-top bg-white">
			<view class="bg-main main-btn" @click="gotoOrder">
				立即订购￥{{courseList.price}}
			</view>
		</view>
	</view>
</template>

<script>
	import courseApi from '@/api/course.js'
	export default {
		data() {
			return {
				id:null,
				courseList:{}
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getList()
		},
		methods: {
			async getList(){
				try{
					const {data} = await courseApi.getCourse(this.id)
					console.log(data,'order');
					if(data.code===20000){
						this.courseList =data.data
					}
					
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
/deep/ .uni-list-item__content:last-child{
margin-right: 200px;
}

</style>
