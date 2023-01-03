<template>
	<view>
		<view class="">
			<view class="p-3">
				<view class="flex align-center w-100">
					<view class="flex align-center">
						<image :src="bbsList.user.avatar || ''" mode="" class="mr-2 bg-light" style="width: 37px;height: 37px;border-radius: 50%;"></image>
						<view>
							<view class="text-primary font-weight-bold">{{bbsList.user.name}}</view>
							<text class="text-muted font">{{bbsList.user.sex}}</text>
						</view>
					</view>
					
					<view class="post-tag">精华</view>
				</view>
				<view class="py-2">
					<text>{{bbsList.desc.text}}</text>
					<view class="flex flex-wrap">
						<view class="flex align-center justify-center mt-1" style="width: 33.33%;"
						v-for="(elt,ind) in bbsList.desc.images" :key="ind">
						<image :src="elt" mode="" style="width: 110px;height: 110px;" class="rounded"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="divider"></view>
		</view>
		<view class="px-2" >
			<view class="comment-list" v-for="(item,index) in commentList" :key="index">
				<image :src="item.user.avatar ||''" mode="" class="face"></image>
				<view class="flex-1">
					<view class="top">
						<text>{{item.user.name}}</text>
					</view>
					<view class="content">{{item.content}}</view>
					<view class="date">{{item.created_time |filtimer}}</view>
					<view class="bg-light px-2 mt-2" v-if="item.post_comments">
						<view class="comment-list" v-for="(ele,i) in item.post_comments" :key="i">
							<image :src="ele.user.avatar ||''" mode="" class="face"></image>
							<view class="flex-1">
								<view class="top">
									<text>{{ele.user.name}}</text>
								</view>
								<view class="content">{{ele.content}}</view>
								<view class="date">{{ele.created_time |filtimer}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<button class="my-2" type="default" size="mini" style="width: 100%;" @click="loadMore">点击加载更多</button>
		</view>
		<view class="fixed-bottom bg-white flex align-center px-3" style="height: 50px;z-index: 1;">
			<view class="border rounded flex-1 px-2 py-1 text-light-muted bg-light mr-2" @click="openComment(false)">
				说一句吧
			</view>
			<view class="flex align-center">
				<text class="iconfont icon-dianzan2" style="font-size: 20px;"></text>
				<text>20</text>
			</view>
		</view>
		<i-popup ref="comment" @send="sendComment"></i-popup>
	</view>
</template>

<script>
	import bbsApi from '@/api/bbs.js'
	import moment from 'moment'
	import stuApi from '@/api/study.js'
	moment.locale('zh-cn')
	export default {
		data() {
			return {
				id:null,
				bbsList:[],
				commentList:[],
				page:1,
				commentForm:{
					reply_id:0,
					reply_user:null
				}
			}
		},
		filters:{
			filtimer(time){
				return moment(new Date(time).getTime()).format('YYYY-MM-DD a h:mm')
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getList(this.id)
		},
		methods: {
			async getList(id){
				try{
					const res = await bbsApi.bbsDetail(id)
					const response = await bbsApi.postComment(id,this.page)
					this.bbsList = res.data.data
					this.commentList = response.data.data.rows
					console.log(this.bbsList,'list');
				}catch(e){
					//TODO handle the exception
				}
			},
			async loadMore(){
				this.page++
				const response = await bbsApi.postComment(this.id,this.page)
				const list = response.data.data.rows
				this.commentList = this.commentList.concat(list)
			},
			async sendComment(content){
				let data = {
					post_id:this.id,
					content,
					reply_id:0
				}
				if(this.commentForm.reply_user){
					d.reply_id = this.commentForm.reply_id
					d.reply_user = this.commentForm.reply_user
				}
				const res = await stuApi.replyPost(data)
				console.log(res,'res');
				if(res.data.code===20000){
					this.$util.msg('评论成功')
					this.page =1 
					this.getList(this.id)
				}
			},
			openComment(flag){
				if(flag){
					this.commentForm.reply_id = u.reply_id
					this.commentForm.reply_user = u.reply_user
					this.commentForm.reply_user.username = u.reply_user.name
				} else {
					this.commentForm = {
						reply_id:0,
						reply_user:null
					}
				}
				this.$refs.comment.open()
			}
		}
	}
</script>

<style lang="scss">
	page{
		padding-bottom: 50px;
	}
.post-tag{
	padding: 5px 10px;
	color: #fff;
	background-color: #ffc107;
	margin-left: auto;
	font-size: 14px!important;
}
.comment-list {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    padding: 10px 0;
	.top {
	    color: #007aff;
	    font-size: 12px;
	}
	.face{
	    border-radius: 100%;
	    width: 35px;
	    height: 35px;
	    flex-shrink: 0;
	    margin-right: 10px;
	    background-color: #eee;
	}
	.content{
	    padding: 4px 0;
	}
	.date {
	    color: #666;
	    font-size: 12px;
	}
}
</style>
