<template>
	<view class="tab-bar" @touchmove.stop.prevent="()=>{}">
		<view class="bar-view flex">
			<view class="bar-item font-md" @click="handleChangeTab(index)" :class="{current : index === value}" v-for="(item,index) in tabs" :key="index">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-tab-bar",
		props: {
			value : {
				type : Number,
				default : 0
			},
			tabs: {
				type: Array,
				default: () => [{
					id: '1',
					name: '课程'
				}, {
					id: '2',
					name: '专栏'
				}]
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			handleChangeTab(index){
				this.$emit("input", index)
			}
		}
	}
</script>

<style lang="scss">
.tab-bar {
		width: 100%;
		height: 85rpx;
		background-color: #fff;
		border-bottom: 1px solid #efeff4;

		.bar-view {
			width: 100%;
			text-align: center;

			.bar-item {
				flex: 1;
				font-size: 30rpx;
				line-height: 80rpx;
				position: relative;
				color: #888;
				&::after {
					display: block;
					content: "";
					width: 0;
					height: 0;
					position: absolute;
					border-bottom: 10rpx solid $uni-text-color-green;
					left: 50%;
					bottom: -4rpx;
					border-radius: 10rpx;
					transform: translateX(-50%);
					transition: .3s;
				}
			}

			.current {
				color: $uni-text-color-green;
				font-weight: 700;
				&::after {
					width: 50rpx;
				}
			}
		}

	}
</style>