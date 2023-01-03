<template>
	<view class="flex flex-column align-center">
		<view class="flex flex-wrap" v-if="flash !=='column'">
			<view class="mr-2 mb-2" v-for="(item,index) in flashList" :key="index">
				<i-course-item :item="item" :priceName="flash" @click.native="goToDetails(item)"></i-course-item>
			</view>
		</view>
		<view class="" v-if="flash=='column'">
			<mescroll-uni
				 :ref="'mescrollRef'+i" 
				 @init="mescrollInit"  
				 :down="downOption"
				  @down="downCallback" 
				  :up="upOption"
				   @up="upCallback" >
				   <i-course-item :item="ele" type="row" v-for="(ele,ind) in flashList" :key="ind" @click.native="goToDetails(ele)" ></i-course-item>
				</mescroll-uni>
		</view>
		
		<view class="load-more" v-if="flash !=='column'">
			<text style="color: rgb(119, 119, 119);font-size: 15px;">没有更多数据了</text>
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
					limit:10,
					usable:1
				},
				flashList:[],
				flash:'',
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
		onLoad(options) {
			console.log(options,'nav');
			switch (options.module){
				case 'flashsale':
				    uni.setNavigationBarTitle({
				    	title:'秒杀列表'
				    })
					this.getFlashsaleList()
					this.flash = 'flash'
					break;
				case 'group':
				    uni.setNavigationBarTitle({
				    	title:'拼团列表'
				    })
					this.getGroupList()
					this.flash = 'group'
					break;
				case 'live':
				    uni.setNavigationBarTitle({
				    	title:'直播列表'
				    })
					this.getLiveList()
					this.flash = 'live'
					break;
				case 'column':
				    uni.setNavigationBarTitle({
				    	title:'专栏列表'
				    })
					this.getColumnList()
					this.flash = 'column'
					break;
				default:
					break;
			}
			
		},
		methods: {
			async getFlashsaleList(){
				try{
					const res = await navApi.flashsaleList(this.query)
					console.log(res,'秒杀');
					if(res.data.code ===20000){
						this.flashList = res.data.data.rows
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async getGroupList(){
				try{
					const res = await navApi.groupList(this.query)
					console.log(res,'拼团');
					if(res.data.code ===20000){
						this.flashList = res.data.data.rows
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async getLiveList(){
				try{
					const res = await navApi.liveList(this.query)
					console.log(res,'直播');
					if(res.data.code ===20000){
						this.flashList = res.data.data.rows
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			async getColumnList(){
				try{
					const res = await navApi.columnList(this.query)
					this.flashList = res.data.data.rows
				}catch(e){
					//TODO handle the exception
				}
			},
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			async upCallback(page) {
				console.log(page,'page');
				this.query.page = page.num
				this.query.limit = page.size
				const res = await navApi.columnList(this.query)
				console.log(res,'专栏');
				if(res.data.code ===20000){
					const list = res.data.data.rows
					this.flashList = this.flashList.concat(list)
					this.mescroll.endBySize(list.length, res.data.data.count);
				}
				
			},
			goToDetails(item,group){
				console.log(item,'item');
				console.log(this.flash,'flash');
				switch (this.flash){
					case 'flash':
					this.navTo(`/pages/course/course?id=${item.id}&flashsale=${item.flashsale_id}`)
						break;
					case 'group':
					this.navTo(`/pages/course/course?id=${item.id}&group_id=${item.group_id}`)
						break;
					default:
						break;
				}
				
			}
		}
	}
</script>

<style>

</style>
