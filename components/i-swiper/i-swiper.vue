<template>
	<view class="">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in data" :key="index">
				<view class="swiper-item rounded shadow" @click="handleToDetail(item)">
					<image :src="item.src" ></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
	
</template>

<script>
	export default {
		name:"i-swiper",
		props : {
			data : {
				type : Array,
				default : () => []
			}
		},
		data() {
			return {
				
			};
		},
		methods : {
			handleToDetail(item){
				this.$emit("click",item)
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height :155px;
}
swiper  swiper-item{
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	padding:0 20rpx;
}
swiper .swiper-item{
	width: 100%;
	height: 310rpx;
	overflow: hidden;
	image{
		width: 100%;
		height: 100%;
	}
}
</style>