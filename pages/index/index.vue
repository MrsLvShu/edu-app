<template>
	<view class="content">
		<index-skeleton v-if="!loadingStatus"></index-skeleton>
		<view v-else>
			<!-- 搜索栏 -->
			<i-search-bar @click.native="navTo('/pages/search/search')"></i-search-bar>
			<!-- 轮播图 -->
			<i-swiper :data="swiperList"></i-swiper>
			<!-- 导航栏 -->
			<i-nav-bar :data="navList"></i-nav-bar>
			<!-- 优惠券 -->
			<i-coupon-bar :data="couponList" @receive="handleClick"></i-coupon-bar>
			<view class="divider"></view>
			<!-- 拼团 -->
			<view class="px-2">
				<i-list-title>
					<template v-slot:title>{{ courseTitle == 'group' ? '拼团' : '秒杀' }}</template>
				</i-list-title>
				<i-course-list :data="courseList" type="column"></i-course-list>
			</view>
			<view class="divider"></view>
			<!-- 最新列表 -->
			<view class="px-2">
				<i-list-title>
					<template v-slot:title>{{newList.title}}</template>
					<template v-slot:sub-title >
					<text @click="openCourseList">查看全部</text>
					</template>
				</i-list-title>
				<i-course-list :data="newList.data" type="row"></i-course-list>
			</view>
			<view class="divider"></view>
			<!-- 广告 -->
			<view class="advert">
				<image :src="advSrc" mode="aspectFill"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	import indexApi from '@/api/index.js'
	import indexSkeleton from "@/pages/index/index-skeleton"
	export default {
		data() {
			return {
				courseTitle:'',
				swiperList:[],
				navList:[],
				couponList:[],
				courseList:[],
				newList:[],
				advSrc:'',
				query:{
					page : 1,
					usable : 1
				},
				loadingStatus:false
			}
		},
		components : {
			indexSkeleton
		},
		onLoad() {
			this.getAllList()
			this.getCouponList()
			
		},
		watch:{
			"$store.state.userInfo":{
				handler(newVal){
					this.getCouponList()
				},
				immediate:true
			}
		},
		onPullDownRefresh() {
			this.getAllList()
			this.getCouponList()
		},
		methods: {
			// 获取全部列表
			async getAllList(){
				try{
					const res = await indexApi.getMobileIndex()
					// console.log(res.data);
	                this.courseTitle = res.data.data.filter(item=> item.type === 'promotion')[0].listType
					// console.log(this.courseTitle,'标题');
					this.getGroupBuyList(this.courseTitle,this.query)
					this.list = res.data.data
					this.swiperList = res.data.data[1].data
					this.navList = res.data.data[2].data
					this.newList = res.data.data[5]
					this.advSrc = res.data.data[6].data
					this.loadingStatus = true
				}catch(e){
					//TODO handle the exception
				}
			},
			// 获取优惠券信息
			async getCouponList(){
				try{
					const response = await indexApi.getCoupon()
					// console.log(response,'优惠券');
					this.couponList = response.data.data
				}catch(e){
					//TODO handle the exception
				}
			},
			// 获取拼团信息
			async getGroupBuyList(type,query){
				try{
					const response = await indexApi.getGroupBuy(type,query)
					// console.log(response,'拼团');
					this.courseList = response.data.data.rows
				}catch(e){
					//TODO handle the exception
				}
			},
			async handleClick(e){
				// console.log(e,'e');
				if(!e.isgetcoupon){
					const res = await indexApi.receiveCoupon({coupon_id:e.id})
					// console.log(res,'res');
					if(res.data.code===20000){
						this.$util.msg('领取成功')
						this.getCouponList()
						
					}else{
						this.$util.msg(res.data.data)
					}
				}
			},
			openCourseList(){
				uni.navigateTo({
					url: '/pages/list/list?module=course',
				});
			}
		}
	}
</script>

<style>
.advert{
	width: 750rpx;
	height: 340rpx;
}	
</style>
