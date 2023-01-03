<template>
	<view @click="handleSendCode" class="code-button bg-main text-white" hover-class="bg-main-hover">
		{{time > 0 ? (time + 's') : '发送'}}
	</view>
</template>

<script>
	import api from "@/api/my.js"
	export default {
		name: "i-code-button",
		props: {
			phone: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				time: 0
			};
		},
		methods: {
			async handleSendCode() {
				if (this.time > 0) {
					return
				}

				uni.showLoading()
				try {
					
					const data = {
						phone: this.phone
					}
					const response = await api.userGetCode(data)
					console.log(response,'code');
					uni.showToast({
						title: '验证码' + response.data.data,
						icon : "none"
					})
					this.$emit('get',this.phone)
					this.handleCountDown()
					

				} catch (err) {
					console.log(err)
				} finally {
					uni.hideLoading()
				}
			},
			handleCountDown() {
				this.time = 60
				let timer = setInterval(() => {
					this.time--
					if (this.time <= 0) {
						clearInterval(timer)
					}
				}, 1000)
			}
		}
	}
</script>

<style>
	.code-button {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		width: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top-right-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		font-size: 14px;
	}
</style>
