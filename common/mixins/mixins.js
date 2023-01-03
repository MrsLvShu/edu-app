export default {
	methods:{
		navTo(url, options = {}){
			if(!url) return
			
			if(options.login && !this.$store.getters.handleLogin){
				uni.navigateTo({
					url:'/pages/login/login'
				})
				return
			}
			
			uni.navigateTo({
				url
			})
		},
		
		navBack(delta = 1){
			uni.navigateBack({
				delta
			})
		},
		handleSetSearchValue(item){
			if(item){
				// #ifdef APP-PLUS
				// APP设置搜索框的值
				const currentWebview = this.$mp.page.$getAppWebview();
				currentWebview.setTitleNViewSearchInputText(item)
				// #endif
				
				// #ifdef H5
				this.$nextTick(()=>{
					const placeholder = document.querySelector('.uni-page-head-search-placeholder')
					placeholder.innerHTML = ''
					const inputSearch = document.querySelector('.uni-input-input[type=search]')
					inputSearch.value = item
				})
				// #endif
			}
		}
	}
}