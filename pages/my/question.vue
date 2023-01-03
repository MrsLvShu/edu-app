<template>
	<view>
		<i-my-list :item="list"></i-my-list>
	</view>
</template>

<script>
	import list from '@/config/question-list-bar.js'
	export default {
		data() {
			return {
				list:list()
			}
		},
		methods: {
			
		}
	}
</script>

<style>
/deep/ .you{
	transform: rotate(45deg) !important;
}
</style>
