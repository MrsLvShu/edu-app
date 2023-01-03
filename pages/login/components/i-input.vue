<template>
	
	<view class="">
		<view class="login-form" v-for="(item,index) in formList" :key="index">
			<uni-icons v-if="item.show===true" :type="item.icon"></uni-icons>
			<input v-if="item.show===true" :type="item.type" v-model.sync="value[item.prop]" class="rounded font-md" :placeholder="item.placeholder" />
	        <i-code-button v-if="item.phoneCode=='true'" :phone="value.phone" @get="getCode"></i-code-button>	
		</view>
	</view>
	
</template>

<script>
	export default {
		props:{
			value:{
				type:Object,
				default:()=>{}
			},
			formList:{
				type:Array,
				default:()=>[]
			}
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			getCode(e){
				console.log(e,'e')
				this.$emit('getCode',e)
			}
			
		}
	}
</script>

<style>

</style>
