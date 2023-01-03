<template>
	<view>
		<view class="timer-box">
			考试时间
			<uni-countdown :show-day="false" :hour="h" :minute="m" :second="s" color="red" :fontSize="17"
				splitorColor="red" />
		</view>

		<view style="margin-top: 50px;">
			<!-- 标题 -->
			<view class="flex justify-between align-center border-bottom px-2" style="height: 38px;">
				<text>{{obj[testList[currentIndex].type]}}</text>
				<text class="font-sm text-light-muted">第{{currentIndex+1}}题</text>
			</view>
			<!-- 题目 -->
			<view class="px-2">
				<view class="py-3">
					
					<rich-text :nodes="testList[currentIndex].title"></rich-text>
				</view>

				<view class="pb-2" v-if="testList[currentIndex].type==='trueOrfalse'||'checkbox'||'radio'" 
				v-for="(item,index) in testList[currentIndex].options" :key="index" @click="changeIndex(item,index)">
					<view class="border flex p-2" :class="{active:(testList[currentIndex].user_value==index && testList[currentIndex].type!=='checkbox') ||
				(arr[currentIndex] instanceof Array && arr[currentIndex].indexOf(item)>-1) && testList[currentIndex].type!=='radio'
				}">
						{{index==0?'A':index==1?'B':index==2?'C':index==3?'D':'E'}}
						<rich-text :nodes="item" class="ml-2"></rich-text>
					</view>
				</view>

				<view class="border mb-2 p-2" v-if="testList[currentIndex].type=='answer'">
					<textarea placeholder="请输入答案......" v-model="testList[currentIndex].user_value[0]"></textarea>
				</view>
				<view class="border mb-2 p-2" v-if="testList[currentIndex].type=='completion'" v-for="(ele,i) in sum" :key="i">
					<textarea placeholder="请输入答案......" v-model="testList[currentIndex].user_value[i]"></textarea>
				</view>
				<button v-if="testList[currentIndex].type=='completion'" class="bg-main main-btn font-md"
				@click="addArea">
					添加填空</button>
			</view>
		</view>

		<!-- 底部 -->
		<view class="footer">
			<view class="iconfont icon-shangyibu " :class="currentIndex==0?'text-light-muted':''" @click="clickPrev">
			</view>
			<view>
				<view class="iconfont icon-leimupinleifenleileibie"></view>
				<view class="flex align-center justify-center font-sm">
					<text class="text-main">{{currentIndex+1}}</text>
					<text>/{{total}}</text>
				</view>
			</view>
			<view @click="handleExamination">
				<view class="iconfont icon-tijiao" style="margin-bottom: -5px;"></view>
				<text style="font-size: 12px;">交卷</text>
			</view>
			<view class="iconfont icon-xiayibu" :class="currentIndex==total-1?'text-light-muted':''" @click="clickNext">
			</view>
		</view>
	</view>
</template>

<script>
	import testApi from '@/api/test.js'
	export default {
		data() {
			return {
				id: null,
				obj:{
					answer:'问答题',
					completion:'填空题',
					trueOrfalse:'判断题',
					radio:'单选题',
					checkbox:'多选题'
				},
				testList: [{
						id: 417,
						score: 0,
						question_id: 448,
						title: "说说你的看法",
						remark: "问题解析",
						type: "answer",
						user_value: [""]
					},
					{
						id: 418,
						score: 0,
						question_id: 447,
						title: "请问我年龄多大",
						remark: "问题解析",
						type: "completion",
						user_value: [""]
					},
					{
						id: 419,
						options:["正确", "错误"],
						score: 0,
						question_id: 446,
						title: "请问我是男生还是女生",
						remark: "问题解析",
						type: "trueOrfalse",
						user_value: [""]
					},
					{
						id: 420,
						score: 0,
						options:["张三", "李四", "王五", "王五哈"],
						question_id: 445,
						title: "你的名字叫什么",
						remark: "问题解析",
						type: "checkbox",
						user_value: [""]
					},
					{
						id: 421,
						score: 0,
						question_id: 444,
						title: "你的名字叫什么",
						options:["张三", "李四", "王五", "王五哈"],
						remark: "问题解析",
						type: "radio",
						user_value: [""]
					},
					{
						id: 422,
						score: 0,
						question_id: 443,
						title: "说说你的看法",
						remark: "问题解析",
						type: "answer",
						user_value: [""]
					},
					{
						id: 423,
						score: 0,
						question_id: 442,
						title: "请问我年龄多大",
						remark: "问题解析",
						type: "completion",
						user_value: [""]
					},
					{
						id: 424,
						score: 100,
						question_id: 441,
						title: "请问我是男生还是女生",
						options:["正确", "错误"],
						remark: "问题解析",
						type: "trueOrfalse",
						user_value: [""]
					},
					{
						id: 425,
						score: 0,
						question_id: 440,
						title: "你的名字叫什么",
						options:["张三", "李四", "王五", "王五哈"],
						remark: "问题解析",
						type: "checkbox",
						user_value: [""]
					},
					{
						id: 426,
						score: 20,
						question_id: 439,
						title: "你的名字叫什么",
						options:["张三", "李四", "王五", "王五哈"],
						remark: "问题解析",
						type: "radio",
						user_value: [""]
					}
				],
				h: 1,
				m: 0,
				s: 0,
				total: 10,
				currentIndex: 0,
				optIndex:null,
				sum:1,
				arr:{},
				arrs:{},
				textInfo:[]
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getTestList()
			
		},
		onBackPress(event) {
			console.log(event,'event');
			if(event.from=="backbutton"){
				uni.showModal({
					content:'是否要放弃本次考试?',
					success:async(res)=>{
						if(res.confirm) {
							console.log('3333');
							this.navBack()
						}
					}
				})
				return true
			}else{
				uni.redirectTo({
					url:'/pages/text-list/text-list'
				})
				return false
			}
			console.log('222');
			
            
		},
		methods: {
			async getTestList() {
				try {
					const res = await testApi.testList(this.id)
					console.log(res, 'test');
					if (res.data.code === 20000) {
						this.textInfo = res.data.data
						this.testList = res.data.data.testpaper_questions
						this.total = res.data.data.testpaper_questions.length
						console.log(this.total, 'total');
					} else {
						this.$util.msg(res.data.data)
						console.log('444');
						setTimeout(()=>{
							this.navBack()
						},1500)
						
				

					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			clickPrev() {
				if (this.currentIndex > 0) {
					this.currentIndex--
				} else {
					this.currentIndex = 0
				}
			},
			clickNext() {
				if (this.currentIndex >= this.total - 1) {
					this.currentIndex = this.total - 1
				} else {
					this.currentIndex++
					console.log(this.currentIndex,'index');
				}

			},
			changeIndex(item,index){
				console.log(this.testList[this.currentIndex].type);
				if(this.testList[this.currentIndex].type=='radio'||'trueOrfalse'){
					this.testList[this.currentIndex].user_value = index 
				}
				if(this.testList[this.currentIndex].type=='checkbox'){
					console.log(this.arr[index] instanceof Array);
					if( this.arr[this.currentIndex] instanceof Array===false){
						this.arr[this.currentIndex]=[]
						console.log(this.arr[this.currentIndex]);
					}
					if( this.arrs[this.currentIndex] instanceof Array===false){
						this.arrs[this.currentIndex]=[]
					}
					let i = this.arr[this.currentIndex].findIndex(ele=>ele===item)
					if(i<0){
						this.arr[this.currentIndex].push(item)
						this.arrs[this.currentIndex].push(index)
					}else{
						this.arr[this.currentIndex].splice(i,1)
						this.arrs[this.currentIndex].splice(i,1)
					}
					this.testList[this.currentIndex].user_value=this.arrs[this.currentIndex]
				}
				
			},
			addArea(){
				this.sum++
			},
			handleExamination(){
				let arrs = this.testList.map(item=>item.user_value)
				console.log(arrs,'arrs');
				let obj = {
					user_test_id:this.textInfo.user_test_id,
					value:arrs
				}
				uni.showModal({
					content: '是否要交卷?',
					confirmText:'现在交卷',
					cancelText:'继续做题',
					success:async(res)=> {
						if (res.confirm) {
							console.log(333);
							const res = await testApi.supportExamination(obj)
							if(res.data.code===20000){
								this.$util.msg('交卷成功')
								setTimeout(()=>{
									this.navBack()
								},1000)
								
							}else{
								this.$util.msg('还有'+res.data.data.slice(0,4)+'没有完成')
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		padding-bottom: 50px;
	}
	.timer-box {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		color: red;
		border-top: 1px solid red;
		border-bottom: 1px solid red;
		padding: 10px 0;
		font-size: 17px;
		height: 25px;
		margin-top: 1px;
		position: fixed;
		left: 0;
		right: 0;
		top: 44px;
		z-index: 1000;
	}

	/deep/ .uni-countdown__splitor {
		font-weight: 900;
	}

	.footer {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		height: 50px;
		z-index: 100;

		>view {
			width: 25%;
			text-align: center;
		}
	}

	.iconfont {
		font-size: 20px !important;
	}
	.active{
		border:1px solid #5ccc84;
	}
</style>
