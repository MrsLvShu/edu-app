<template>
	<view>
		<view class="login-back" @click="navBack()">
			<uni-icons color="#fff" type="back"></uni-icons>
		</view>
		<view class="login-bg"></view>
		<view class="login">
			<view class="flex">
				<text class="title">找回密码</text>
			</view>
			<my-input v-model="form" :formList="list"></my-input>
			<view class="login-btn bg-main" hover-class="bg-main-hover" @click="handleRetrieve">立即找回</view>
		</view>
	</view>
</template>

<script>
	import myInput from '../login/components/i-input.vue'
	import api from '@/api/my.js'
	export default {
		data() {
			return {
				form:{
					phone:"",
					code:"",
					password:"",
					repassword:""
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
						
					},
					{
						prop:'password',
						type:'password',
						icon:'locked',
						placeholder:'请输入密码',
						show:true
					},
					{
						prop:'repassword',
						type:'password',
						icon:'locked',
						placeholder:'请输入确认密码',
						show:true
					}
				]
			}
		},
		components:{
			myInput
		},
		methods: {
			async handleRetrieve(){
				uni.showLoading({
					title: '提交中...',
					mask: false
				})
				try{
					const response = await api.RetrievePassword(this.form)
					console.log(response,'res');
					if(response.statusCode!==20000){
						this.$util.msg(response.data.data)
						return
					}
					if(response.data.code===20000){
						this.$util.msg('修改密码成功')
					}
					this.resetForm()
					this.navTo('/pages/login/login')
				}catch(e){
					//TODO handle the exception
					console.log(e);
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
