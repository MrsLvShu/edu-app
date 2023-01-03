<template>
	<view>
		<view class="" v-for="(ele,i) in postList" :key="i">
			<view class="p-3">
				<view class="flex align-center w-100">
					<view class="flex align-center">
						<image :src="ele.user.avatar || ''" mode="" class="mr-2 bg-light" style="width: 37px;height: 37px;border-radius: 50%;"></image>
						<view>
							<view class="text-primary font-weight-bold">{{ele.user.name}}</view>
							<text class="text-muted font">{{ele.user.sex}}</text>
						</view>
					</view>
					
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
						<view class="flex align-center pr-2 font-sm">
							<text class="iconfont icon-pinglun2" style="font-size: 23px;"></text>
							<text class="ml-1">{{ele.comment_count||'评论'}}</text>
						</view>
						<view class="flex align-center font-sm" :class="{'text-danger':ele.issupport}">
							<text class="iconfont icon-dianzan2" style="font-size: 23px;"></text>
							<text class="ml-1">{{ele.support_count||'点赞'}}</text>
						</view>
						<button type="warn" size="mini" class="mx-2">删除</button>
					</view>
					<text class="text-light-muted font-sm">{{ele.created_time}}</text>
				</view>
			</view>
			<view class="divider"></view>
		</view>
	</view>
</template>

<script>
	import stuApi from '@/api/study.js'
	export default {
		data() {
			return {
				page:1,
				limit:5,
				postList:[]
			}
		},
		onLoad() {
			this.getMyPost()
		},
		methods: {
			async getMyPost(){
				try{
					const res = await stuApi.myPost(this.page,this.limit)
					this.postList = res.data.data.rows
					console.log(this.postList,'list');
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style>

</style>
