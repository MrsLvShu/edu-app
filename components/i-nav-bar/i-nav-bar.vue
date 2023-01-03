<template>
	<view class="flex flex-wrap nav py-2">
		<view v-for="(item,index) in data" :key="index" @click="handleClick(item)"
			class="nav-item py-1 flex  flex-column justify-center align-center" hover-class="bg-light">
			<image :src="item.src" mode="widthFix"></image>
			<text class="text-muted mt-1 font-sm">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "i-nav",
		props: {
			data: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {

			};
		},
		methods:{
			handleClick(e){
				switch (e.name){
					case '活动':
					    this.navTo(`/pages/webview/webview?url=${e.url}`)
						
						break;
				    case "考试":
					    this.navTo('/pages/text-list/text-list')
						
						break;
					case "电子书":
					    this.navTo('/pages/book-list/book-list')
						break;
					case '社区':
					    this.navTo('/pages/bbs/bbs')
						break;
					default:
					    this.navTo(`/pages/list/list?module=${e.module}`)
						break;
				}
				
				console.log(e,'e');
			}
		}
	}
</script>

<style>
	.nav-item {
		width: 25%;
	}

	.nav image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		overflow: hidden;
	}
</style>
