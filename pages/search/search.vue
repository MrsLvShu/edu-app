<template>
	<view class=" box flex flex-column">
		<keyword @handleSearch="handleSearch" v-if="!searched" :historyList="list"></keyword>
	</view>
</template>

<script>
	import keyword from "@/pages/search/components/keyword.vue"
	import MescrollMoreMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more.js"
	export default {
		mixins : [MescrollMoreMixin],
		data() {
			return {
				searched:false,
				content:'',
				list:uni.getStorageSync('historyList')
			}
		},
		components:{
			keyword
		},
		onShow() {
			console.log('444');
			this.list = uni.getStorageSync('historyList')
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				this.handleSearch()
			}
		},
		onNavigationBarSearchInputChanged(e) {
			console.log(e,'e');
			this.content = e.text
		},
		onNavigationBarSearchInputConfirmed() {
			console.log('1111');
		   this.handleSearch()
		},
		
		methods:{
			handleSearch(){
				if(this.content.trim()==''){
					this.$util.msg('请输入关键词')
					return
				}else{
					console.log('2222');
					
					this.navTo(`/pages/search/search-result?keyword=${this.content}`)
					this.handleSetLocalHistoryData()
				}
			},
			handleSetLocalHistoryData(){
				uni.getStorage({
					key: 'historyList',
					success : (res)=>{
						this.content && res.data.indexOf(this.content) < 0 && res.data.unshift(this.content)
						uni.setStorageSync('historyList', res.data)
					},
					fail : (err)=>{
						this.content && uni.setStorageSync('historyList',[this.content])
						console.log("err=>" , err)
					} 
				})
			}
		}
	}
</script>

<style lang="scss">
page,.box{
	height: 100%;
}

</style>
