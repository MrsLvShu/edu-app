<template>
	<view>
		<view v-for="(item,index) in list" :key="index">
			<uni-card isFull note="true">
				<view class="flex justify-between">
					<text class="h4 font-weight-bold">{{ item.testpaper.title }}</text>
					<text class="font-sm" :class="item.answer_status ? 'text-success' : 'text-danger'">{{ item.answer_status ? '考试完成' : '考试中' }}</text>
				</view>
				<view class="flex my-3">
					<text class="flex-1">题目总数：{{ item.testpaper.question_count }}</text>
					<text class="flex-1" :class="item.read_status == 0 ? 'text-danger' : ''">最终得分：{{ item.read_status ? item.score : '正在阅卷' }}</text>
				</view>
				<view slot="footer" class="flex text-light-muted">
					{{ item.created_time }}
				</view>
			</uni-card>
			<view class="divider"></view>
		</view>
		
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
	import stuApi from '@/api/study.js'
	export default {
		data() {
			return {
				loadStatus:"loading",
				page:1,
				limit:5,
				list:[]
			}
		},
		onLoad() {
			this.getMyTest()
		},
		onReachBottom() {
			if(this.loadStatus != 'more'){
				return
			}
			this.page = this.page + 1
			this.getMyTest()
		},
		onPullDownRefresh() {
			this.page = 1
			this.getMyTest().finally(()=>{
				uni.stopPullDownRefresh()
			})
			
		},
		methods: {
			async getMyTest(){
				try{
					const res = await stuApi.myTest(this.page,this.limit)
					this.list = this.page==1?res.data.data.rows:[...this.list,...res.data.data.rows],
					this.loadStatus = res.data.data.rows.length<this.limit?'noMore':'more'
				}catch(e){
					//TODO handle the exception
					this.loadStatus = 'more'
					if(page>1){
						this.page=this.page-1
					}
				}
			}
		}
	}
</script>

<style>

</style>
