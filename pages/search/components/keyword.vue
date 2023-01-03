<template>
	<view class="keyword_container">
		<view class="title flex justify-between align-center py-1">
			<text class="font-weight-bold font-md">历史记录</text>
			<text @click="clearHistory" class="font-sm">清除全部</text>
		</view>
		<view class="tag-list">
			<view class=" rounded-circle bg-hover-light font-sm px-2 py-1" @click="handleClickTag(item)" v-for="(item,index) in historyList" :key="index">
				{{item}}
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		props:{
			historyList:{
				type:Array,
				default:[]
			}
		},
		methods: {
			clearHistory(){
				uni.showModal({
					content: '是否清除全部内容?',
					success: async (res) => {
						if(res.confirm) {
							this.historyList = []
							uni.removeStorageSync('historyList');
						}
					}
				})
				
			},
			handleClickTag(item){
				this.handleSetSearchValue(item)
				this.$emit("handleSearch", {value : item})
			}
		}
	}
</script>

<style lang="scss">
.keyword_container{
	padding: 25rpx;
	.title{
		font-size: 30rpx;
		color: #222222;
		
		text:last-child{
			color : #999;
		}
	}
	
	.tag-list{
		display: flex;
		flex-wrap: wrap;
		margin: 20rpx 0 60rpx 0;
		view{
			margin-right: 12px;
			margin-bottom: 12px;
			line-height: 1;
			max-width: 150px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
</style>
