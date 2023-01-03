<template>
	<view>
		<view class="p-2" v-for="(item,index) in list" :key="index">
			<i-course-item type="row" :item="item.goods">
				
					<view class="text-ellipsis font-sm text-secondary" slot="ms">
						<!-- <mp-html :content="item.goods.try"></mp-html> -->
						<rich-text :nodes="item.goods.try" class="text-ellipsis"></rich-text>
					</view>
				<!-- <text class="text-ellipsis font-sm text-secondary">{{item.goods.try}}</text> -->
				
			</i-course-item>
		</view>
		
		<uni-load-more></uni-load-more>
	</view>
</template>

<script>
	import myApi from '@/api/my.js'
	export default {
		data() {
			return {
				page:1,
				limit:10,
				list:[]
			}
		},
		onReachBottom() {
			this.page = this.page+1
			this.getMyCollect()
		},
		onLoad() {
			this.getMyCollect()
		},
		methods: {
			async getMyCollect(){
				try{
					const res = await myApi.userCollect(this.page,this.limit)
					console.log(res,'res');
					this.list = this.page==1?res.data.data.rows:[...this.list,...res.data.data.rows]
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>

</style>
