<template>
	<view>
		<view class="px-3" >
			<i-course-item :item="bookDetail" type="row"></i-course-item>
		</view>
		<view class="divider"></view>
		<i-tab-bar v-model.sync="current" :tabs="tabs"></i-tab-bar>
		<!-- 简介 -->
		<view v-if="current==0" class="flex flex-column p-3">
			<text style="font-size: 19px;">{{bookDetail.title}}</text>
			<text class="font-sm text-light-muted">{{bookDetail.sub_count}}人学过</text>
		</view>
		<!-- 目录 -->
		<view v-else class="animate__animated animate__fadeIn animate__faster">
			<view class="p-3">
				<view class="border rounded bg-light text-muted p-2">
					共 {{ list.length }} 节
				</view>
			</view>
			
			<i-menu-item v-for="(item,index) in list" :key="index" :title="item.title" :index="index" @click="openPlay(item)">
				<view class="flex">
					<text v-if="item.isfree == 1" class="border text-danger rounded border-danger font-small px-1 mt-1">
						免费试看
					</text>
				</view>
			</i-menu-item>
		</view>
		<view class="divider"></view>
		<view class="">
			<uni-card title="电子书简介" isFull :isShadow="false" :border="false" spacing="0">
				<view class="">
					{{bookDetail.try}}
				</view>
			</uni-card>
		</view>
	</view>
</template>

<script>
	import stuApi from '@/api/study.js'
	export default {
		data() {
			return {
				id:null,
				bookDetail:{},
				current:0,
				tabs:[{
					name:"简介",
				},{
					name:"目录",
				}],
				list:[]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getBookDetail()
		},
		methods: {
			getBookDetail(){
				stuApi.bookDetail(this.id).then(res=>{
					console.log(res,'res');
					this.bookDetail = res.data.data
					this.list = res.data.data.book_details
					uni.setNavigationBarTitle({
						title:res.data.data.title
					})
				})
			}
		}
	}
</script>

<style>

</style>
