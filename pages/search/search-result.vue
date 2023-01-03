<template>
	<view>
		<i-tab-bar v-model.sync="tabIndex"></i-tab-bar>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(item,i) in tabs" :key="i">
				<mescroll-item :data="content" ref="mescrollItem" :i="i" :index="tabIndex" :tabs="tabs" :height="height"></mescroll-item>
			
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import mescrollItem from './components/course-list.vue'
	export default {
		data() {
			return {
				tabIndex : 0,
				searched : false,
				content: "",
				height:'',
				params: null,
				tabs:[{
					id: '1',
					name: '课程'
				}, {
					id: '2',
					name: '专栏'
				}]
			}
		},
		components:{
			mescrollItem
		},
		onNavigationBarSearchInputClicked() {
			console.log('333');
			this.navTo('/pages/search/search')
		},
		onLoad(options) {
			console.log(options,'options');
			this.content = options.keyword
			console.log(this.content,'内容');
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80) + 'px'
			// this.getCategoryList()
			this.listenerParams()
		},
		methods: {
			listenerParams(options) {
				console.log(options,'options');
				if (JSON.stringify(options) !== "{}") {
					this.params = options
					this.handleSetSearchValue()
				}
			},
		    swiperChange(e){
				this.tabIndex = e.detail.current
			},
			
		}
	}
</script>

<style>

</style>
