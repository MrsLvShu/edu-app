<template>
	<view>
		<view class="px-2" v-for="(item,index) in bookList" :key="index">
			<i-course-item :item="item" type="row">
				<view class="border rounded-circle flex mr-2 align-center justify-center px-2 py-1 ml-auto text-muted"
				@click="gotoDetail(item)">
					<view class="">
						立即学习
					</view>
					<text class="iconfont icon-xiayibu ml-1"></text>
				</view>
			</i-course-item>
		</view>
		<uni-load-more></uni-load-more>
	</view>
</template>

<script>
	import stuApi from '@/api/study.js'
	export default {
		data() {
			return {
				page:1,
				limit:5,
				bookList:[]
			}
		},
		onLoad() {
			this.getBookList()
		},
		methods: {
			getBookList(){
				stuApi.myBook(this.page,this.limit).then(res=>{
					console.log(res);
					this.bookList = res.data.data.rows
				})
			},
			gotoDetail(item){
				this.navTo(`/pages/book-detail/book-detail?id=${item.id}`)
			}
		}
	}
</script>

<style>

</style>
