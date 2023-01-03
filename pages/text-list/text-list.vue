<template>
	<view>
		<mescroll-uni
			 :ref="'mescrollRef'+i" 
			 @init="mescrollInit"  
			 :down="downOption"
			  @down="downCallback" 
			  :up="upOption"
			   @up="upCallback" >
		<view class="" v-for="(item,index) in testList" :key="index">
			<uni-card :is-shadow="false" is-full spacing="0" :border="false">
				<view class="flex justify-between">
					<view class="h4 font-weight-bold">{{item.title}}</view>
					<view class="text-danger font-sm">时长:{{item.expire}}分钟</view>
				</view>
				<view class="flex my-3 font-md">
					<text class="flex-1">题目总数：{{item.question_count}}</text>
					<text class="flex-1">总分数：{{item.total_score}}</text>
					<text class="flex-1">及格分：{{item.pass_score}}</text>
				</view>
				<view slot="actions" class="card-actions" >
					<view class="flex justify-end  border-top p-2">
						<view class="bg-main main-btn px-2" style="height: 40px; font-size: 16px;"s :class="item.is_test?'bg-main-disabled':''" @click="handleTest(item)">
							{{item.is_test?'你考过了':'参加考试'}}
						</view>
					</view>
				</view>
			</uni-card>
			<view class="divider"></view>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import navApi from '@/api/navList.js'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		data() {
			return {
				query:{
					page:1,
					limit:5
				},
				testList:[],
				downOption: {
					auto: false 
				},
				upOption: {
					auto: false,
					noMoreSize: 4, 
					empty : {
						icon : "",
						tip : "暂无相关数据~" ,
					}
				},
			}
		},

		onShow() {
			this.getTestList()
		},
		methods: {
			async getTestList(){
				try{
					const res = await navApi.textList(this.query)
					console.log(res,'考试');
					this.testList = res.data.data.rows
				}catch(e){
					//TODO handle the exception
				}
			},
			async upCallback(page) {
				console.log(page,'page');
				this.query.page = page.num
				this.query.limit = page.size
				const res = await navApi.textList(this.query)
				if(res.data.code ===20000){
					const list = res.data.data.rows
					this.testList = this.testList.concat(list)
					this.mescroll.endBySize(list.length, res.data.data.count);
				}
				
			},
			handleTest(item){
				console.log(item,'item');
				if(!item.is_test){
					uni.showModal({
						content: '是否要开始考试?',
						success: async (res) => {
							if(res.confirm) {
								this.navTo(`/pages/test-detail/test-detail?id=${item.id}`)
							}
						}
					})
				}
				
			}
		}
	}
</script>

<style lang="scss">
/deep/ .uni-card .uni-card__content{
	color: #333;
}
</style>
