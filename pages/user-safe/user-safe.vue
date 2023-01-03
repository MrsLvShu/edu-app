<template>
	<view>
		<i-my-list :item="list" v-model="form"></i-my-list>
		<view class="p-3">
			<view class="login-btn bg-main" @click="handleSave">保存</view>
		</view>
		
	</view>
</template>

<script>
	import list from '@/config/user-safe-list.js'
	import api from '@/api/my.js'
	export default {
		data() {
			return {
				list:list(),
				form:{
					opassword:'',
					password:'',
					repassword:''
				}
			}
		},
		methods: {
			async handleSave(){
				console.log(this.form,'form');
				
				try{
					const response = await api.editUserPassword(this.form)
					console.log(response);
					if(response.statusCode!==200){
						this.$util.msg(response.data.data)
						return
					}
					if(response.data.code===20000){
						this.$util.msg('密码修改成功')
						this.$store.commit('logout')
						setTimeout(() => {
							this.navBack()
						}, 300)
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
.my-list{
	padding: 0 ;
	margin-top: 0;
	/deep/ .list-item{
		border-bottom: $uni-underline;
		&:last-child {
			border: 0;
		}
	}
	
}
</style>
