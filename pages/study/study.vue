<template>
	<view class="flex flex-column" style="height: 100%;width: 100%;">
		<menu-bar :item="item"></menu-bar>
		<i-tab-bar v-model.sync="tabIndex" @chang="clickTab"></i-tab-bar>
		<swiper  :current="tabIndex" class="flex flex-1 flex-column" @change="swiperChange">
			<swiper-item v-for="(item,i) in tabs" :key="i" class="text-center mt-2">
				<scroll-view style="height: 100%;width: 94%;" class="flex-1 px-2" :scroll-y="true" @scrolltolower="handleLoadMore(item)">
					<i-course-item v-for="(ele,index) in item.list" :key="index" :item="ele" type="row">
						<view slot="desc" class="font-sm text-light-muted my-1 text-left">学习进度</view>
					    <view class="font-sm">
					    	<text v-if="index == 0" class="text-danger mr-1">最近学习</text>
					    	<text class="text-muted">已学习 {{ ele.progress }}%</text>
					    </view>
					</i-course-item>
					<uni-load-more :status="item.loadStatus"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		<i-no-login v-if="!token"></i-no-login>
	</view>
</template>

<script>
	import menuBar from '@/pages/my/components/menu-bar.vue'
	import stuApi from'@/api/study.js'
	import { mapState } from 'vuex'
	export default {
		components:{
			menuBar
		},
		computed: {
			...mapState({
				token:state=>state.isToken
			})
		},
		data() {
			return {
				height:'428px',
				item:[
					{
						icon:'iconfont icon-OrderHistory',
						text:'帖子',
						page:'/pages/my-post/my-post'
					},
					{
						icon:'iconfont icon-pinglun2',
						text:'考试',
						page:'/pages/my-text/my-text'
					},
					{
						icon:'iconfont icon-shoucang1',
						text:'电子书',
						page:'/pages/my-book/my-book'
					}
				],
				tabIndex:0,
				tabs:[
					{
						name:"课程",
						loadStatus:"more",
						list:[],
						page:1,
						type:"course"
					},{
						name:"专栏",
						loadStatus:"more",
						list:[],
						page:1,
						type:"column"
					}
				]
			}
		},
		onShow() {
			this.getCourseList()
		},
		onShow(){
			if(this.token){
				this.tabs.forEach(item=>{
					item.page = 1
					item.loadStatus = 'more'
				})
				this.getCourseList()
			}
		},
		methods: {
			swiperChange(e){
				this.tabIndex = e.detail.current
				let tab = this.tabs[this.tabIndex]
				if(tab.loadStatus == 'more' && tab.page == 1){
					this.getCourseList()
				}
			},
			async getCourseList(){
				let tab  = this.tabs[this.tabIndex]
				tab.loadStatus='loading'
				try{
					const res = await stuApi.userHistory(tab.page,tab.type)
					console.log(res,'我的课程');
					tab.list = tab.page == 1 ? res.data.data.rows : [...tab.list,...res.data.data.rows]
					tab.loadStatus = res.data.data.rows.length < 10 ? 'noMore' : 'more'
				}catch(e){
					//TODO handle the exception
					tab.loadStatus = 'more'
					if(tab.page > 1){
						tab.page = tab.page - 1
					}
				}
			},
			handleLoadMore(e){
				if(e.loadStatus != 'more') return
				e.page = e.page + 1
				this.getCourseList()
			},
			clickTab(index){
				this.swiperChange({
					detail:{
						current:index
					}
				})
			}
		}
	}
</script>

<style>
page{
	display: flex;
	flex-direction: column;
	height: 100%;
}
</style>
