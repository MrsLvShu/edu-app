<template>
	<view>
		<view class="position-relative">
			<image :src="detail.cover" style="width: 100%;height: 420rpx;" class="bg-light"></image>
			<view class="text-white font-sm p-1" style="position: absolute;right: 20rpx;bottom: 20rpx;background-color: rgba(0,0,0,0.4);">
				专栏
			</view>
		</view>
		<i-tab-bar v-model.sync="current" :tabs="tabs"></i-tab-bar>
		<view v-if="current == 0" class="animate__animated animate__fadeIn animate__faster">
			<view v-if="firstLoad" class="flex flex-column p-3">
				<text class="mb-1" style="font-size: 38rpx;">{{ detail.title }}</text>
				<view class="flex align-center justify-between">
					<text class="font-sm text-light-muted">{{ detail.sub_count }} 人学过</text>
					<view class="" @click="handleCollect">
						<text class="iconfont icon-shoucang1" :class="detail.isfava?'text-main':''" style="font-size: 25px;"></text>
					</view>
				</view>
				<view v-if="!detail.isbuy" class="flex mt-2 align-end">
					
					<text class="text-danger font-lg">￥{{ detail.price }}</text>
					<text class="font-sm text-light-muted ml-1 text-through">￥{{ detail.t_price }}</text>
				</view>
			</view>
			
			<!-- <view v-else class="flex flex-column p-3">
				<skeleton width="600rpx" height="75rpx" oClass="mb-2"></skeleton>
				<skeleton width="150rpx" height="70rpx"></skeleton>
				<view class="flex mt-2 align-end">
					<skeleton width="150rpx" height="70rpx"></skeleton>
					<skeleton width="150rpx" height="40rpx" oClass="ml-1"></skeleton>
				</view>
			</view> -->

			<view class="divider"></view>
			
			<uni-card title="专栏简介" isFull>
				<group-works v-if="!detail.isbuy" ref="groupWorks" @updateData="getData"></group-works>
				
				<rich-text :nodes="detail.content">
					<view class="flex justify-center py-3 text-muted">
						加载中...
					</view>
				</rich-text>
			</uni-card>
		</view>
		<!-- 目录 -->
		<view v-else class="animate__animated animate__fadeIn animate__faster">
			<view class="p-3">
				<view class="border rounded bg-light text-muted p-2">
					共 {{ list.length }} 节
				</view>
			</view>
			
			<i-menu-item v-for="(item,index) in list" :key="index" :title="item.title" :index="index" @click="openPlay(item)">
				<view class="flex">
					<text class="border text-danger rounded border-danger font-small px-1 mt-1 mr-1">
						{{ item.type | formatType}}
					</text>
					<text v-if="item.price == 0" class="border text-danger rounded border-danger font-small px-1 mt-1">
						免费试看
					</text>
				</view>
			</i-menu-item>
			
		</view>
		<view class="fixed-bottom p-2 border-top bg-white" v-if="!detail.isbuy">
			<view class="bg-main main-btn" @click="gotoOrder" >
				{{btn}}
			</view>
		</view>
	</view>
</template>

<script>
	import courApi from '@/api/course.js'
	export default {
		filters: {
	        formatType(t) {
	        	let c = {
	        		media:"图文",
	        		audio:"音频",
	        		video:"视频"
	        	}
	        	return c[t];
	        }
	    },
		data() {
			return {
				firstLoad:false,
				current:0,
				tabs:[{
			    	name:"简介",
			    },{
			    	name:"目录",
			    }],
				detail:{
					id: 0,
					title: "",
					cover: "",
					try: "",
					price: "",
					t_price: "",
					type: "media",
					sub_count: 0,
					content: "",
					isbuy: false,
					isfava:false
				},
				list:[],
				group_id:0,
				// 拼团/秒杀详情
				activeData:null,
				flashsale_id:0
			}
		},
		computed:{
			btn(){
				if(this.detail.flashsale){
					return '立即秒杀￥'+this.detail.flashsale.price
				}
				if(this.detail.group){
					return '立即拼团￥'+this.detail.group.price
				}
				if(this.detail.price == 0){
					return '立即学习'
				}
				return  '立即订购￥'+this.detail.price
			}
		},
		onLoad(e) {
			// console.log(e,'e');
			this.detail.id = e.id
			if(!this.detail.id){
				this.$util.msg('非法参数')
				setTimeout(()=>{
					this.navBack()
				},700)
				return
			}
			
			if(e.group_id){
				this.group_id = e.group_id
			}
			
			if(e.flashsale_id){
				this.flashsale_id = e.flashsale_id
			}
		},
		onShow(){
			this.getData()
		},
		onBackPress() {
			console.log(111);
			this.navTo('/pages/index/index')
		},
		methods: {
			getData(){
				courApi.getColumn({
					id:this.detail.id,
					group_id:this.group_id,
					flashsale_id:this.flashsale_id
				}).then(res=>{
					this.detail = res.data.data
					res.data.data.content =res.data.data.content.replace(/\<img/gi, '<img style="width:100%;height:auto"')
					// console.log(res);
					if(res.data.data.group){
						this.activeData = {
							type:"group",
							data:res.data.data.group
						}
						this.$refs.groupWorks.init(this.group_id)
					}
					
					if(res.flashsale){
						this.activeData = {
							type:"flashsale",
							data:res.data.data.flashsale
						}
					}
					
					this.list = res.data.data.column_courses
					// console.log(this.detail);
					uni.setNavigationBarTitle({
						title:this.detail.title
					})
				}).catch(err=>{
					if(err == '该记录不存在'){
						setTimeout(()=>{
							this.navBack()
						},700)
					}
				}).finally(()=>{
					this.firstLoad = true
				})
			},
			openPlay(item){
				if(item.price != 0 && !this.detail.isbuy){
					return this.$toast('请先购买该专栏')
				}
				this.navTo(`/pages/course/course?id=${item.id}&column_id=${this.detail.id}`)
			},
		}
	}
</script>

<style>

</style>
