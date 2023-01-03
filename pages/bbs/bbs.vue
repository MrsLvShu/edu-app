<template>
	<view>
		
		
		<mescroll-uni
			 :ref="'mescrollRef'+i" 
			 @init="mescrollInit"  
			 :down="downOption"
			  @down="downCallback" 
			  :up="upOption"
			   @up="upCallback" >
			<view class="scroll-row pt-2 px-1">
				<scroll-view :scroll-x="true">
					<view v-for="(item,index) in bbsCateList" :key="index" @click="changTabs(item.id)"
						class="scroll-row-item border px-3 py-1 rounded mx-1 mb-2 bg-light text-muted"
						:class="{active:id ==item.id}">
						{{item.title}}
					</view>
				</scroll-view>
			</view>
			<view class="divider"></view>
			<view class="flex py-2">
				<view class="flex-1 text-center font-md text-muted">
					<text class="font-weight-bold mr-2">总帖子</text>
					<text>{{list.postCount}}</text>
				</view>
				<view class="flex-1 text-center font-md text-muted">
					<text class="font-weight-bold mr-2">总用户</text>
					<text>{{list.userCount}}</text>
				</view>
			</view>
			<view class="divider"></view>
			<view class="" v-for="(ele,i) in bbsList" :key="i" @click="gotoDetail(ele)">
				<view class="p-3">
					<view class="flex align-center w-100">
						<view class="flex align-center">
							<image :src="ele.user.avatar || ''" mode="" class="mr-2 bg-light" style="width: 37px;height: 37px;border-radius: 50%;"></image>
							<view>
								<view class="text-primary font-weight-bold">{{ele.user.name}}</view>
								<text class="text-muted font">{{ele.user.sex}}</text>
							</view>
						</view>
						
						<view class="post-tag">精华</view>
					</view>
					<view class="py-2">
						<text>{{ele.desc.text}}</text>
						<view class="flex flex-wrap">
							<view class="flex align-center justify-center mt-1" style="width: 33.33%;"
							v-for="(elt,ind) in ele.desc.images" :key="ind">
							<image :src="elt" mode="" style="width: 110px;height: 110px;" class="rounded"></image>
							</view>
						</view>
					</view>
					<view class="flex align-center justify-between mt-2">
						<view class="flex align-center">
							<view class="flex align-center pr-2" @click.stop="gotoDetail(ele)">
								<text class="iconfont icon-pinglun2" style="font-size: 23px;"></text>
								<text class="ml-1">{{ele.comment_count}}</text>
							</view>
							<view class="flex align-center" @click.stop="handleSupport(ele)" :class="{'text-danger':ele.issupport}">
								<text class="iconfont icon-dianzan2" style="font-size: 23px;"></text>
								<text class="ml-1">{{ele.support_count}}</text>
							</view>
						</view>
						<text class="text-light-muted font">{{ele.created_time}}</text>
					</view>
				</view>
				<view class="divider"></view>
			</view>
		
		</mescroll-uni>
		
	</view>
</template>

<script>
	import bbs from '@/api/bbs.js';
	import bbsApi from '@/api/bbs.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	export default {
		mixins: [MescrollMixin, MescrollMoreItemMixin],
		data() {
			return {
				bbsCateList: [],
				page: 1,
				list: [],
				bbsList:[],
				id: 0,
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
			this.getBbsCategory() 
			this.getBbsAllList(this.page,this.id)
		},
		onNavigationBarButtonTap() {
			this.navTo('/pages/add-post/add-post')
		},
		methods: {
			async getBbsCategory() {
				try {
					const res = await bbsApi.bbsCategory(this.page)
					// console.log(res, '分类');
					
					if(this.page==1){
						this.bbsCateList = res.data.data.rows
						this.bbsCateList.unshift({
							id:0,
							title:'全部'
						})
						return
					}
					this.bbsCateList = this.bbsCateList.concat(res.data.data.rows)
					this.list = res.data.data
				} catch (e) {
					//TODO handle the exception
				}
			},
			async getBbsAllList(page,id) {
				try {
					const res = await bbsApi.bbsAllList(page,id)
					this.bbsList =res.data.data.rows
					console.log(this.bbsList, '列表')
				} catch (e) {
					//TODO handle the exception
				}
			},
			changTabs(id){
				this.id = id
				this.getBbsAllList(this.page,this.id)
			},
			async upCallback(page) {
				// console.log(page,'page');
				this.page = page.num
				const res = await bbsApi.bbsAllList(this.page,this.id)
				if(res.data.code ===20000){
					const list = res.data.data.rows
					this.bbsList = this.bbsList.concat(list)
					this.mescroll.endBySize(list.length, res.data.data.count);
				}
				
			},
			gotoDetail(ele){
				this.navTo(`/pages/post-detail/post-detail?id=${ele.id}`)
			},
			async handleSupport(ele){
				try{
					if(!ele.issupport){
						const res = await bbsApi.support({post_id:ele.id})
						if(res.data.code===20000){
							ele.issupport=true
							ele.support_count++
							this.$util.msg('点赞成功')
						}
					}else{
						const res = await bbsApi.unSupport({post_id:ele.id})
						if(res.data.code===20000){
							ele.issupport=false
							ele.support_count--
							this.$util.msg('已取消点赞')
						}
					}
					
				}catch(e){
					//TODO handle the exception
				}
			}
		},
	}
</script>

<style lang="scss">
.post-tag{
	padding: 5px 10px;
	color: #fff;
	background-color: #ffc107;
	margin-left: auto;
	font-size: 14px!important;
}
.active{
	background-color: #5ccc84;
	color: #fff;
}
</style>
