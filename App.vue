<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("@/common/free.css");
	/* 自定义样式 */
	@import url("@/common/common.css");
	/* 动画样式 */
	@import url("@/common/animate.min.css");
	/* 字体图标样式 */
	@import url("@/common/iconfont.css");
</style>
