<template>
	<view>
		<view class="">
			<mescroll-uni
				 :ref="'mescrollRef'+i" 
				 @init="mescrollInit"  
				 :down="downOption"
				  @down="downCallback" 
				  :up="upOption"
				   @up="upCallback" >
				   <i-course-item @click.native="goToDetails(item.id)" :item="item" type="row" :imgWid="imgWidth"  v-for="(item,ind) in bookList" :key="ind" :show="true"></i-course-item>
				</mescroll-uni>
		</view>
		
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
					limit:10
				},
				bookList:[],
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
				imgWidth:true
			}
		},
		onLoad() {
			this.getBookList()
		},
		methods: {
			async getBookList(){
				try{
					const res = await navApi.bookList(this.query)
					console.log(res,'电子书');
					if(res.data.code===20000){
						this.bookList = res.data.data.rows
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async upCallback(page) {
				console.log(page,'page');
				this.query.page = page.num
				this.query.limit = page.size
				const res = await navApi.bookList(this.query)
				console.log(res,'专栏');
				if(res.data.code ===20000){
					const list = res.data.data.rows
					this.bookList = this.bookList.concat(list)
					this.mescroll.endBySize(list.length, res.data.data.count);
				}
				
			},
			goToDetails(id){
				this.navTo("/pages/course/course?id=" + id)
			}
		}
	}
</script>

<style>

</style>
