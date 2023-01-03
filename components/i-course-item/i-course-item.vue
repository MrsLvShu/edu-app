<template>
	<view :class="[dynamicClass]" class="pl-2" @click="openDetail">
		<view class="position-relative" :class="{pic:imgWid}">
			<image :src="item.cover" ></image>
			<view class="type position-absolute font-sm">{{item.type|fliterGroupType}}</view>
		</view>
		<view class="flex flex-1 flex-column flex-shrink" :class="item.sub_count>=0?'mr-3':''" >
			<view class="text-ellipsis font-md mt-1">{{item.title}}</view>
			<slot name="ms"></slot>
			<slot name="desc"></slot>
			
			
			<view class="flex flex-1 align-end">
				<view class="flex flex-1 align-end">
					<!-- <text class="font-md text-danger text-ellipsis" v-if="priceName==='live'">{{item.price=='0.00'?'免费':`￥${item.price}`}}</text> -->
					<slot></slot>
					<text class="font text-danger " v-if="priceName && priceName!=='live'">{{priceName=='flash'?`秒杀价:${item.price}`:`团购价:${item.price}`}}</text>
					<text class="font-md text-danger" v-if="item.price == 0">免费</text>
					<text class="font-md text-danger" v-else-if="item.price > 0">￥{{ item.price }}</text>
					<text class="font-sm text-light-muted" v-if="item.t_price">￥{{ item.t_price }}</text>
					<view class="border flex align-center justify-center rounded-circle px-2 py-1 ml-auto text-muted"
					 v-if="show">
						{{item.sub_count}}人订阅
						<text class="iconfont icon-xiayibu ml-1"></text>
					</view>
				</view>
				
			</view>
		
		</view>
	</view>
</template>

<script>
	const courseType = {
		media: "图文",
		audio: "音频",
		video: "视频",
		column: "专栏"
	}
	export default {
		props : {
			item : {
				type : Object,
				default : ()=>{}
			},
			type : {
				type : String,
				default : "column"
			},
			priceName:{
				type:String,
				default:''
			},
			show:{
				type:Boolean,
				default:false
			},
			imgWid:{
				type:Boolean,
				default:false
			}
		},
		computed : {
			dynamicClass(){
				return this.type === 'column' ? 'column inline-flex flex-column' : 'flex row mb-2'
			}
		},
		data() {
			return {
				
			};
		},
		onLoad(e) {
			console.log(e);
		},
		filters: {
			fliterGroupType(type){
				return courseType[type]
			}
		},
		methods:{
			openDetail(){
				if(this.item.type=='video'||'media'||'audio'){
					this.navTo(`/pages/course/course?id=${this.item.id}`)
				}
				if(this.item.group_id){
					this.navTo(`/pages/course/course?id=${this.item.id}&group_id=${this.item.group_id}`)
				}
				if(this.item.flashsale_id){
					this.navTo(`/pages/course/course?id=${this.item.id}&flashsale_id=${this.item.flashsale_id}`)
				}
				if(!this.item.type || this.item.type == 'column'){
					this.navTo(`/pages/column/column?id=${this.item.id}`)
				}
				if(this.item.type == 'live'){
					this.navTo(`/pages/live/live?id=${this.item.id}`)
				}
			}
		}
	}
</script>

<style lang="scss">
.column {
			width: 160px;
		}
	
		.column>view:first-child {
			width: 340rpx;
			height: 190rpx;
		}
	
		.column>view:first-child .type {
			right: 10rpx;
			bottom: 10rpx;
			background-color: rgba(0, 0, 0, 0.6);
			color: #fff;
			padding: 6rpx 11rpx 8rpx;
		}
		
		.row>view:first-child {
			width: 300rpx;
			height: 170rpx;
		}
		.row>view:first-child .type {
			right: 10rpx;
			bottom: 10rpx;
			background-color: rgba(0, 0, 0, 0.6);
			color: #fff;
			padding: 5rpx 11rpx 8rpx;
		}
		.row>view:last-child{
			margin-left: 20rpx;
			width: 185px;
		}
.pic{
	width: 92px !important;
	height: 117px !important;
	margin-left: 5px;
}
</style>