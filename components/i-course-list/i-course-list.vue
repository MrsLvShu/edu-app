<template>
	<view class="pb-2 ml--1">
		<scroll-view class="scroll-row" :scroll-x="type== 'column' ? true : false">
			<view :class="type== 'column' ? 'inline-flex' : ''" class="mr-2" v-for="(item,index) in data" :key="index">
				<i-course-item :item="item" :type="type" @click.native="goToDetails(item)"></i-course-item>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	
	export default {
		props : {
			data : {
				type : Array,
				default : () => []
			},
			type : {
				type : String,
				default : "column"
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			goToDetails(item){
				console.log(item,'item');
				if(item.type=='video'||'media'||'audio'){
					this.navTo(`/pages/course/course?id=${item.id}`)
					
				}
				if(item.group_id){
					this.navTo(`/pages/course/course?id=${item.id}&group_id=${item.group_id}`)
				}
				if(item.flashsale_id){
					this.navTo(`/pages/course/course?id=${item.id}&flashsale_id=${item.flashsale_id}`)
				}
				if(!item.type || item.type == 'column'){
					this.navTo(`/pages/column/column?id=${item.id}`)
				}
				if(item.type == 'live'){
					this.navTo(`/pages/live/live?id=${item.id}`)
				}
				
			}
		}
	}
</script>

<style>
	
</style>