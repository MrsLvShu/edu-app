<template>
	<view class="my-list px-3">
		<view class="list" v-for="(e, index) in item" :key="index">
			<view v-for="(ele, i) in e" :key="i"
				class="list-item space-between flex justify-between align-center center"
				:hover-class="ele.checked || ele.checked === false ? '': 'active'" :hover-start-time="50"
				@click="handleClick(ele)">
				<view class="left center flex align-center">
					<text v-if="ele.icon" :class="ele.icon"></text>
					<text style="font-size: 14px;color: #3b4144;">{{ele.title}}</text>
				</view>
				<view class="right center">
					<text v-if="ele.text">{{ele.text}}</text>
					<text v-if="ele.sex">{{value.sex}}</text>
					<img v-if="ele.src" :src="imgs || value.avatar ||ele.src" alt="">
					<text v-if="ele.down" :class="ele.down"></text>
					<text v-if="ele.rightIcon" class="iconfont icon-jinru" style="color: rgb(187, 187, 187);"></text>
					<input v-model="value[ele.prop]" v-if="ele.placeholder" placeholder-class="cl" :placeholder="ele.placeholder" style="text-align: right;">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapState(['userInfo']),
			imgs(){
				console.log(this.value.avatar,'111');
				return this.value.avatar
			},
			sexs(){
				return this.value.sex
			}
		},
		created() {
			console.log(this.value,'item');
		},
		props: {
			item: {
				type: Array,
				default: () => []
			},
			value:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
			
			}
		},
		methods: {
			handleClick(obj) {
				if (obj.title === '我的优惠券') {
					if (this.userInfo) {
						this.navTo(obj.page)
					} else {
						this.navTo('/pages/login/login')
					}
				} else {
					this.navTo(obj.page)
				}
				if(obj.event) {
					this.$emit(obj.event, obj)
				}
			}
		}
	}
</script>

<style lang="scss">
	.my-list {
		margin: 18px 0;

		.list {
			border-bottom: $uni-underline;

			&:last-child {
				border: 0;
			}

			.list-item {
				padding: 12px 15px;
				padding-left: 15px;
			}

			.left {
				font-size: 20px;
				color: rgb(67, 150, 236);
		
		        text:first-child {
					margin-right: 20rpx;
					font-size: 20px;
				}
			}

			.right {
				text {
					margin-left: 40rpx;
				}

				img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 60rpx;
				}
				
				.cl{
					color: #bbbbbb;
					font-size: 17px;
				}
				
				switch {
					margin-right: -10rpx;
				}
			}


		}
	}

	.active {
		background-color: #fafafa;
	}
</style>
