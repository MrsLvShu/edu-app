<template>
	<view>
		<view class="login-back" @click="handleBackPage">
			<uni-icons color="#fff" type="back"></uni-icons>
		</view>
		<view class="login-bg"></view>
		<view class="login">
			<view class="flex">
				<text class="title">绑定手机号</text>
			</view>
			<i-input v-model.sync="userform" :formList="list" @getCode="handleGet"></i-input>
			<view class="login-btn bg-main" hover-class="bg-main-hover" @click="handleSubmitForm">绑定</view>
		</view>
	</view>
</template>

<script>
	import iInput from '../login/components/i-input.vue';
	import api from '@/api/my.js'
	export default {
		data() {
			return {
				userform:{
					phone: '',
					code: '',
				},
				list:[
					{
						prop:'phone',
					    placeholder:'请输入手机号',
					    icon:'person',
					    type:'text',
					    show:true
					},
					{
						prop:'code',
					    placeholder:'验证码',
						phoneCode:'true',
					    icon:'locked',
					    type:'text',
					    show:true
					}
				]
			}
		},
		components:{
			iInput
		},
		methods: {
			// 返回上一页
			handleBackPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			handleGet(){
				
			},
			// 提交
			async handleSubmitForm() {
				uni.showLoading({
					title: '提交中...',
					mask: false
				})
				
				try{
					console.log(this.userform,'form');
					const response = await api.userBindMobile(this.userform)
					console.log("bind", response)
					if(response.statusCode!==200){
						this.$util.msg(response.data.data)
						return
					}
					if(response.data.code===20000){
						this.$util.msg('绑定成功')
						console.log(this.userform.phone,'phone');
						setTimeout(()=>{
							uni.switchTab({
								url : '/pages/my/my'
							})
						},350)
						this.$store.commit("setPhone", this.userform.phone)
						this.$store.commit('init')
						this.resetForm()
					}
				}catch(err){
					console.log(err)
				}finally{
					uni.hideLoading()
				}
				
			},
			// 清空表单
			resetForm() {
				this.form = {
					phone: '',
					code: ''
				}
			}
		}
	}
</script>

<style>

</style>
