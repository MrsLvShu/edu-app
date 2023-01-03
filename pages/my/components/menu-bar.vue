<template>
	<view class="p-3">
		<view class="flex bg-white shadow rounded">
			<view class="flex flex-1" v-for="(item,index) in item" :key="index" @click="handleClick(item)">
				<view class="flex flex-1 flex-column align-center justify-center py-3">
					<text :class="item.icon" style="font-size: 20px; color: rgb(254, 189, 0);"></text>
					<text class="font-sm mt-1 text-secondary">{{item.text}}</text>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		props:{
			item:{
				type:Array,
				default:()=>[]
			}
		},
		computed: {
			...mapState(['userInfo','isToken']),
		},
		methods: {
			handleClick(obj){
				if(obj.text==='在学'){
					uni.switchTab({
						url:obj.page
					})
				}else{
					
					if(this.isToken){
						this.navTo(obj.page)
					}else{
						this.navTo('/pages/login/login')
					}
				}
				
			}
		}
	}
</script>

<style>

</style>
