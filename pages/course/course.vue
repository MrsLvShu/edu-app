<template>
	<view>
		<view v-if="!detailList.isbuy" class="img position-relative" style="width: 100%;height: 215px;">
			<img :src="detailList.cover" />
			<view class="type position-absolute font-sm">{{detailList.type|fliterGroupType}}</view>
		</view>
		
		<video v-else-if="detailList.type == 'video'" :src="detailList.content" controls style="width: 100%;height: 420rpx;" :poster="detailList.cover" @timeupdate="onVideoTimeUpdate"></video>
		<i-audio v-else-if="detailList.type === 'audio'" :poster='detailList.cover' :src="detailList.content" @onProgress="onAudioProgressUpdate"></i-audio>
		<!-- 拼团倒计时 -->
		<view class="flex justify-between bg-danger text-white px-3 py-2" v-if="groupId">
			<view class="flex flex-column align-start">
				<view class="flex align-center">
					<text class="font mr-1">￥{{groupList.price}}</text>
					<text class="font-sm text-through">￥{{detailList.price}}</text>
				</view>
				<view class="bg-white rounded text-danger font-sm py-1 px-2 mt-1">
					<text>{{groupList.p_num}}人拼团</text>
				</view>
			</view>
			<view class="flex align-center">
				<text class="font-sm">距结束</text>
				<view class="">
					<uni-countdown :day="d" :hour="h" :minute="m" :second="s" />
				</view>
			</view>
		</view>
		<!-- 标题 -->
		<view class="flex flex-column p-3">
			<text class="mb-1" style="font-size: 19px;">{{detailList.title}}</text>
			<view class="flex align-center justify-between">
				<text class="font-sm text-light-muted">{{detailList.sub_count}} 人学过</text>
				<view class="" @click="handleCollect">
					<text class="iconfont icon-shoucang1" :class="detailList.isfava?'text-main':''" style="font-size: 25px;"></text>
				</view>
			</view>
			<view class="flex mt-2 align-end " v-if="!detailList.isbuy">
				<text class="text-danger font-lg">￥{{detailList.price}}</text>
				<text class="font-sm text-light-muted ml-1 text-through">￥{{detailList.t_price}}</text>
			</view>
		</view>
		<view class="divider"></view>
		<!-- 拼单 -->
		<view class="" v-if="groupId">
			<uni-card title="1人在拼单,可直接参与" :isShadow="false" isFull>
				<swiper>
					<swiper-item>
						<view class="swiper-item flex align-center border-bottom" style="position: absolute;width: 100%;height: 100%;transform: translate(0px,0%);translateZ:(0px);">
							<image src="" mode="" class="rounded-circle bg-dark mr-2" style="width: 39px;height: 39px;"></image>
							<text>qwqwqw</text>
							<view class="ml-auto font">
								<view class="">
									还差<text class="text-danger">1人</text>拼成
								</view>
								<view class="flex align-center font text-muted">
									<text>剩余</text>
									<uni-countdown :show-day="false" :day="d" :hour="h" :minute="m" :second="s"></uni-countdown>
								</view>
							</view>
							<button type="primary" class="mx-1" size="mini">去拼单</button>
						</view>
					</swiper-item>
				</swiper>
			</uni-card>
		</view>
		<!-- 简介 -->
		<view class="">
			<uni-card :title="(detailList.isbuy && detailList.type === 'media') ? '课程内容' : '课程简介'" :border="false" :isShadow="false" isFull spacing="5rpx">
				<view id="media">
					<mp-html :content="(detailList.isbuy && detailList.type == 'media') ? detailList.content : detailList.try" @load="onMediaReady">
						<view class="flex justify-center py-3 text-muted">
							加载中...
						</view>
					</mp-html>
				</view>
			</uni-card>
		</view>
		<view class="fixed-bottom p-2 border-top bg-white">
			<view class="bg-main main-btn" @click="gotoOrder" v-if="!detailList.isbuy">
				立即订购￥{{groupId?groupList.price:detailList.price}}
			</view>
		</view>
	</view>
</template>

<script>
	const courseType = {
		media: "图文",
		audio: "音频",
		video: "视频",
		column: "专栏"
	}
	import courseApi from '@/api/course.js'
	let windowHeight = uni.getSystemInfoSync().windowHeight
	export default {
		data() {
			return {
				id:null,
				detailList:[],
				groupId:null,
				flashId:null,
				groupList:{},
				d:0,
				h:0,
				m:0,
				s:0,
				progress:0,
				scrollTop:0,
				mediaHeight:0,
				column_id:0,
			}
		},
		filters: {
			fliterGroupType(type){
				return courseType[type]
			}
		},
		onLoad(options) {
			// console.log(options,'id');
			this.id = options.id
			if(!this.id){
				this.$toast('非法参数')
				setTimeout(()=>{
					this.navBack()
				},700)
				return
			}
			if(options.column_id){
				this.column_id = options.column_id
			}
			if(options.group_id){
				thisgroupId = options.group_id
			}
			if(options.flashsale_id){
				this.flashId = options.flashsale_id
			}
			this.getDetails()
			
		},
		onShow() {
			this.getDetails()
		},
		onPageScroll(e){
			
			if(this.detailList.isbuy && this.detailList.type == 'media' && e.scrollTop > this.scrollTop){
				this.scrollTop = e.scrollTop

				this.sumMediaProgress()
			}
		},
		beforeDestroy(){
			this.updateUserHistory()
		},
		methods: {
			async getDetails() {
				if(this.groupId){
					const {data} = await courseApi.getCourse(this.id,this.groupId,this.flashId)
					// console.log('data', data)
					uni.setNavigationBarTitle({
						title: data.data.title
					})
					data.data.try = data.data.try.replace(/\<img/gi, '<img style="width:100%;height:auto"')
					this.detailList = data.data
					this.groupList = data.data.group
					this.getTime()
				}else{
					const {data} = await courseApi.getCourse(this.id)
					uni.setNavigationBarTitle({
						title: data.data.title
					})
					data.data.try = data.data.try.replace(/\<img/gi, '<img style="width:100%;height:auto"')
					this.detailList = data.data
				}
			},
			async handleCollect(){
				try{
					if(!this.detailList.isfava){
						const {data} = await courseApi.userCollect({goods_id:this.detailList.id,type:'course'})
						console.log(data,'收藏');
						if(data.code==20000){
							this.$util.msg('收藏成功')
							this.getDetails()
						}
					}else{
						const {data} = await courseApi.userUnCollect({goods_id:this.detailList.id,type:'course'})
						console.log(data,'收藏');
						if(data.code==20000){
							this.$util.msg('取消收藏成功')
							this.getDetails()
						}
					}
					
				}catch(e){
					//TODO handle the exception
				}
			},
			gotoOrder(){
				this.navTo(`/pages/create-order/create-order?id=${this.id}&type=course`)
			},
			getTime(){
				let day = new Date(this.groupList.end_time)
				
				let cha = new Date(this.groupList.end_time).getTime()- new Date().getTime()
				console.log(cha,'day');
				this.d = parseInt(cha/1000/60/60/24)
				this.h = parseInt(cha/1000/60/60%24)
				this.m = parseInt(cha/1000/60%60)
				this.s = parseInt(cha/1000%60)
			},
			onAudioProgressUpdate(p){
				this.progress = p
			},
			onVideoTimeUpdate(e){
				let { currentTime,duration } = e.detail
				if(duration > 0){
					this.progress = ((currentTime/duration)*100).toFixed(2)
				}
			},
			updateUserHistory(){
				if(!this.detailList.isbuy) return
				let d = {}
				if(this.column_id == 0){
					d = {
						id:this.id,
						type:"course",
						progress:this.progress
					}
				} else {
					d = {
						id:this.column_id,
						type:"column",
						detail_id:this.id
					}
				}
				console.log(d,'d');
				courseApi.updateUserHistory(d)
			},
			onMediaReady(){
				const Query = uni.createSelectorQuery().in(this)
				console.log(1111);
				Query.select('#media').boundingClientRect(data=>{
					this.mediaHeight = parseInt(data.height)
					
					this.sumMediaProgress()
				}).exec()
			},
			// 计算图文课程学习进度
			sumMediaProgress(){
				if(this.mediaHeight > 0){
					this.progress = (((this.scrollTop + windowHeight)/this.mediaHeight)*100).toFixed(2)
					this.progress = this.progress > 100 ? 100 : this.progress
					console.log(this.progress);
				}
			},
		}
	}
</script>

<style lang="scss">
.img{
	img{
		width: 100%;
		height: 98%;
	}
	.type{
		right: 20rpx;
		bottom: 15rpx;
		background-color: #868686;
		color: #fff;
		padding: 10rpx 11rpx;
	}
}
/deep/ .uni-card .uni-card__header .uni-card__header-content .uni-card__header-content-title{
	font-size: 16px !important;
	color: #333 !important;
}
/deep/ .uni-card .uni-card__content{
	font-size: 16px;
	color: #333;
}
/deep/ .uni-countdown:first-child .uni-countdown__number{
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    width: 26px !important;
	    height: 24px !important;
	    line-height: 24px !important;
	    margin: 2px !important;
	    text-align: center !important;
	    font-size: 12px !important;
		border-radius: 0 !important;
		border-color: rgb(255, 255, 255);
		color: rgb(255, 255, 255) !important;
		background-color: rgb(195, 21, 46);
}
/deep/ .uni-countdown:last-child .uni-countdown__number{
	width: 26px !important;
	height: 24px !important;
	line-height: 24px !important;
	margin: 2px !important;
	text-align: center !important;
	font-size: 14px !important;
	border-radius: 0 !important;
}
/deep/ .uni-countdown:first-child .uni-countdown__splitor{
	color:rgb(255, 255, 255) !important ;
}
/deep/ .uni-countdown:last-child .uni-countdown__splitor{
	font-weight: 700;
}
/deep/ uni-swiper{
	height: 65px !important;
}
</style>
