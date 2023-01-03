<template>
	<view>
		<view class="login-back" @click="navBack()">
			<uni-icons color="#fff" type="back"></uni-icons>
		</view>
		<view class="login-bg"></view>
		<!-- 登录注册 -->
		<view class="login">
			<view class="flex">
				<text class="title">{{type === 'login' ? '登 录' : '注 册'}}</text>
			</view>
			<myInput v-model="form" :formList="formList"></myInput>
			<view class="login-btn bg-main" hover-class="bg-main-hover" @click="handleSubmitForm">
				{{type === 'login' ? '登 录' : '注册'}}
			</view>
			<!-- 注册账号 -->
			<view class="flex justify-between my-3 font align-center">
				<text class="text-main py-3" @click="handleChangeType">
					{{type === 'login' ? '注册账号' : '去登录'}}
				</text>
				<text class="text-light-muted py-3" @click="navTo('/pages/forget/forget')">忘记密码?</text>
			</view>
			<!-- 微信图标 -->
			<view class="flex align-center justify-center ">
				<view class="wechat-login">
					<uni-icons type="weixin" size="30" color="#5ccc84"></uni-icons>
				</view>
			</view>
			<!-- 协议 -->
			<view v-if="type === 'login'" class="flex align-center justify-center py-4">
				<checkbox-group @change="handleCheckStatus" >
					<label class="text-light-muted">
						<checkbox  :checked="check" color="#7fd49e" style="transform: scale(0.7);" /><text class="font">已阅读并同意用户协议&隐私声明</text>
					</label>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
	import myInput from './components/i-input.vue'
	import myApi from '@/api/my.js'
	export default {
		data() {
			return {
				type:'login',
				form:{
					username: '',
					password: '',
					repassword: ''
				},
				formList:[
					{
						prop:'username',
						type:'text',
						icon:'person',
						placeholder:'请输入用户名',
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
						show:false
					}
				],
				check : false
			}
		},
		components:{
			myInput
		},
		methods: {
			// 点击提交
			handleSubmitForm(){
				uni.showLoading({title: '提交中...',mask: false})
				this.type === 'reg' ? this.handleRegist() : this.handleLogin()
			},
			// 登录
			async handleLogin(){
				if(!this.check){
					return uni.showToast({
						title : '请先阅读并同意用户协议&隐私声明',
						icon : "none"
					})
				}
				if(this.form.username==''||this.form.password==''){
					this.$util.msg('请填写内容')
					return
				}
				try{
					const data = this.loadsh.cloneDeep(this.form)
					delete data.repassword
					const response = await myApi.userLogin(data)
					console.log(response,'res');
					if(response.statusCode!==200){
						this.$util.msg(response.data.data)
						return
					}
					if(response.data.code===20000){
						this.$util.msg('登录成功')
						this.resetForm()
						this.$store.commit("setToken", response.data.data)
					}
					this.handleBindMobile()
					uni.navigateBack({
						delta:1
					})
				}catch(err){
					console.log(err)
				}finally{
					uni.hideLoading()
				}	
			},
			// 注册
			async handleRegist(){
				try{
					const data = this.loadsh.cloneDeep(this.form)
					console.log(data,'data');
					const response = await myApi.userReg(data)
					console.log(response,'res');
					if(response.statusCode!==20000){
						this.$util.msg(response.data.data)
					}
					if(response.data.code===20000){
						this.$util.msg('注册成功')
						this.type = 'login'
						this.formList[2].show=!this.formList[2].show
						this.resetForm()
					}
				}catch(err){
					console.log(err)
				}finally{
					uni.hideLoading()
				}
			},
			// 绑定手机号
			handleBindMobile(){
				const userInfo = this.$store.state.userInfo
				if(!userInfo.phone){
					setTimeout(()=>{
						uni.redirectTo({
							url:"/pages/mobile-bind/mobile-bind"
						})
					},350)
					return
				}
			},
			// 清空表单
			resetForm(){
				this.form = {
					username : '',
					password : '',
					repassword : ''
				}
			},
			// 切换状态
			handleChangeType(){
				// console.log(this.formList,'formList');
				this.formList[2].show=!this.formList[2].show
				this.type = this.type === 'login' ? 'reg' : 'login'
			},
			// 协议选择框状态切换
			handleCheckStatus(e){
				this.check = Boolean(e.detail.value.length)
				console.log(this.check,'check')
			}
		}
	}
</script>

<style>

</style>
