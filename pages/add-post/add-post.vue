<template>
	<view>
		<view class="p-2">
			<picker :value="index" :range="array" @change="bindPickerChange">
				<button size="mini" type="defalut" style="width: 100%;">{{title || array[index]}}</button>
			</picker>
			
		</view>
		<view class="content" v-for="(item,index) in imgs" :key="index">
			<uni-card isFull :is-shadow="false" spacing="0">
				<textarea class="bg-light font-md rounded p-2" v-model="item.text" style="width: 100%;box-sizing: border-box;" placeholder="请填写帖子内容"></textarea>
			    <view class="uni-uploader">
			    			 <view class="uni-uploader-head">
			    			 	<view class="uni-uploader-title">
			    			 		点击可预览选好的照片
			    			 	</view>
			    				<view class="uni-uploader-info">
			    					{{item.images.length}}/9
			    				</view>
			    			 </view>
			    	<view class="uni-uploader-body">
			    		<view class="uni-upload-files flex">
							<view class="uni-uploader__file position-relative" style="border: 0.5px solid rgb(244,244,244);" v-for="(ele,i) in item.images" :key="i">
								<image :src="ele" mode="" class="uni-uploader__img rounded"></image>
								<view class="position-absolute top-0 right-0 rounded" style="padding: 0px 7px;background-color: rgba(0,0,0,0.5);" @click="remove(i)">
									<text class="iconfont icon-iconfontshanchu text-white"></text>
								</view>
							</view>
			    			<view class="uni-uploader__input-box rounded" @click="chooseImg(index)">
			    				<view class="uni-uploader__input">
									
								</view>
			    			</view>
			    		</view>
			    	</view>
			    </view>
			</uni-card>
		</view>
		
		 <view class="fixed-bottom bg-white border-top" style="height: 55px;">
		 	<view class="bg-main main-btn" @click="addArea">
		 		添加内容
		 	</view>
		 </view>
		 
	</view>
</template>

<script>
	import bbsApi from '@/api/bbs.js'
	export default {
		data() {
		    return {
		        title: '选择地区',
				array:[],
				bbsList:[],
				index:0,
		        visible: false,
		        indicatorStyle: `height: 50px;`,
				page:1,
				limit:100,
				imgs:[{
					images:[],
					text:''
				}],
				bbs_id: null,
		    }
		},
		onLoad() {
			this.getCommunity()
		},
		onNavigationBarButtonTap(e) {
			console.log(e,'e');
			if (e.index === 0) {
				if (!this.bbs_id) {
					this.$util.msg('请选择地区')
					return
				}
				let obj = {
					bbs_id: this.bbs_id,
					content: this.imgs
				}
				// console.log(this.imgs,'imgs');
				this.getPublishPost(obj)
			}
		},
		methods: {
			// 弹框选择事件
			bindPickerChange(e){
				this.index= e.detail.value
				this.bbs_id = this.bbsList[e.detail.value].id
				this.title = this.bbsList[e.detail.value].title
				// console.log(this.bbsList[e.detail.value],'e');
			},
			async getCommunity(){
				try{
					const res = await bbsApi.chooseCommunity(this.page,this.limit)
					
					this.array = res.data.data.rows.map(item=>item.title)
					this.bbsList = res.data.data.rows
					// console.log(this.array,'社区');
				}catch(e){
					//TODO handle the exception
				}
			},
			chooseImg(i){
				if (this.imgs[i].images.length >= 9) {
					this.$util.msg('最多上传9张')
					return
				}
				uni.chooseImage({
				    count: 1,
				    sizeType: ['compressed'],
				    success: async (res) => {
				        // console.log(res.tempFilePaths,'res.tempFilePaths')
						const filePath = res.tempFilePaths[0]
						uni.showLoading({title: '图片上传中',mask: true })
						const {code, message, data} = await bbsApi.uploadImg(filePath)
						// console.log(data,'data')
						if(code === 20000) {
							this.imgs[i].images.push(data)
							// this.imgs = this.imgs.unshift({img:data.data})
							// console.log('this.imgs',this.imgs[i]);
						
						}else {
							
							this.$util.msg("图片上传失败，请重试")
						}
						uni.hideLoading()
				    }
				})
			},
			addArea(){
				this.imgs.push({
					images: [],
					text:''
				})
			},
			async getPublishPost(obj){
				try{
					const res = await bbsApi.publishPost(obj)
					if (res.statusCode === 200) {
						this.imgs.forEach(item=>{
							item.images=[]
							item.text = ""
						})
						this.bbs_id = null
						this.title = "选择地区"
						this.$util.msg('发布成功')
						this.navBack()
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			remove(i){
				uni.showModal({
					content:"是否要删除该图片?",
					confirmText:'删除',
					cancelText:'不删除',
					success: (res) => {
						if(res.confirm){
							this.imgs.splice(i,1)
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		padding-bottom: 55px;
	}
.uni-uploader{
    flex: 1;
    flex-direction: column;
}
.uni-uploader-head{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
	
}
.uni-uploader-title{
	font-size: 16px;
	color: #333;
}
.uni-uploader-info{
	color: #b2b2B2;
	font-size: 16px;
	font-family: yahei;
}
.uni-uploader-body{
	margin-top: 8px;
	height: 116px;
}
.uni-uploader__files {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.uni-uploader__input-box {
    position: relative;
    margin: 5px;
    width: 104px;
    height: 104px;
    border: 1px solid #d9d9d9;
}
.uni-uploader__input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
.uni-uploader__input-box:before {
    width: 2px;
    height: 39px;
}
.uni-uploader__input-box:before, .uni-uploader__input-box:after {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: #d9d9d9;
}
.uni-uploader__input-box:after {
    width: 39px;
    height: 2px;
}
.uni-uploader__file {
    margin: 5px;
    width: 105px;
    height: 105px;
}
.uni-uploader__img {
    display: block;
    width: 105px;
    height: 105px;
}
.delete{
	z-index: 999;
}
</style>
