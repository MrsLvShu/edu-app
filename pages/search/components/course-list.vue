<template>

	<mescroll-uni 
		 :ref="'mescrollRef'+i" 
		 @init="mescrollInit" 
		 :height="height" 
		 :down="downOption"
		  @down="downCallback" 
		  :up="upOption"
		   @up="upCallback" >
		   <i-course-item @click.native="goToDetails(item.id)" :item="item" type="row" v-for="(item,ind) in courseList" :key="ind"></i-course-item>
		</mescroll-uni>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import api from '@/api/search.js'
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		data() {
			return {
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
				courseList : [],
				searchData:{
					content:'',
					page:1,
					type:'course',
					size:10
				}
			}
		},
		props: {
			i: Number,
			index: {
				type: Number,
				default () {
					return 0
				}
			},
			data:{
				type:String,
				
			},
			params: {
				type: Object,
				default: () => {}
			},
			content: {
				type: String,
				default: '',
			},
			height:[String,Number]
		},
		mounted() {
			console.log("params", this.params)
			this.params && Object.keys(this.searchData).forEach(key=>{
				console.log("key", key)
				this.searchData[key] = this.params[key] || null
			})
			
			console.log("search",this.searchData)
		},
		methods: {
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			search(data) {
				if(data){
					Object.assign(this.searchData, data)
				}
				this.mescroll.resetUpScroll(true)
			},
			async upCallback(page) {
				console.log(page,'page');
				console.log(this.index,'content');
				this.searchData.content = this.data && this.data.trim() || ""
				this.searchData.page = page.num
				this.searchData.size = page.size
				if(this.index===0){
					this.searchData.type="course"
				}else{
					this.searchData.type="column"
				}
				const res= await api.getCourseList(this.searchData)	
				if(res.data.code===20000){
					const list = res.data.data.rows
					if(page.num === 1){
						this.courseList = []
						this.mescroll.scrollTo(0,0)
					}
					this.courseList = this.courseList.concat(list)
					this.mescroll.endBySize(list.length, res.data.data.count);
				}else{
					this.$util.msg(res.data.data)
				}
				console.log(res,'rows');
			},
			goToDetails(id){
				this.navTo("/pages/course/course?id=" + id)
			}
		}
	}
</script>

<style lang="scss">
// scroll-view{
// 	height: 559px;
// }
</style>
