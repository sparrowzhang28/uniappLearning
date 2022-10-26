<template>
	<view class="content">
		<uni-row class="header">
			<uni-col :span="7">计算条件:&nbsp;<uni-data-select :localdata="calcOperators" v-model="calcOper"
					style="display: inline-block;width: 100rpx;" :clear="false"></uni-data-select>
			</uni-col>
			<uni-col :span="7">作业数量:&nbsp;<uni-easyinput class="rangenum" v-model="jobsNum" :clearable="false"></uni-easyinput>
			</uni-col>
			<uni-col :span="7">数字范围:&nbsp;<uni-easyinput class="rangenum" v-model="numRange" :clearable="false"></uni-easyinput>
			</uni-col>
			<uni-col :span="3"><button class="btn" @click="generator">生成</button></uni-col>
		</uni-row>
		<uni-row class="countBox">
			<uni-col :span="6" v-for="(item,index) of jobsList" :key="index" class="jobItem">{{item.count}}</uni-col>
		</uni-row>
		<uni-popup ref="popup" type="dialog">
			<view>作业数量和数字范围必须为有效数字</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				jobsList: [{
					count: '1+2',
					answer: 3
				}, {
					count: '1+3',
					answer: 4
				}, {
					count: '1+3',
					answer: 4
				}, {
					count: '1+3',
					answer: 4
				}, {
					count: '1+3',
					answer: 4
				}, {
					count: '1+3',
					answer: 4
				}],
				jobsNum: 0,
				numRange: 0,
				calcOperators: [{
					value: '+',
					text: '加'
				}, {
					value: '-',
					text: '减'
				}, {
					value: '*',
					text: '乘'
				}, {
					value: '/',
					text: '除'
				}],
				calcOper: '+'
			}
		},
		methods: {
		mappingCalcOper(oper,a,b){
			switch(oper){
				case '+':
				 return a+b;
				 break;
				case '-':
				 return a-b;
				 break;
				case '*':
				 return a*b;
				 break;
				case '/':
				 return a/b;
				break
			}
		},
		generator(){
			console.log(this.calcOper,this.numRange,this.jobsNum)
			if(!this.numRange||!this.jobsNum){
				this.$refs.popup.open()
				return
			}else{
				const calcNums=[]
				
				for(let i=0;i<this.numRange;i++){
					let str=''
					let answer=0
					const num1=Math.ceil(Math.random()*this.jobsNum)
					const num2=Math.ceil(Math.random()*this.jobsNum)
					if(this.calcOper==='-'){
						if(num1<num2){
							[num1,num2]=[num2,num1]
						}
					}
					str=num1+this.calcOper+num2
					answer=this.mappingCalcOper(this.calcOper,num1,num2)
					console.log('str',str)
					calcNums.push({
						count:str,
						answer:answer
					})
				}
				console.log('123',calcNums)
				this.jobsList=calcNums
			}
		}
		}
	}
</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.header {
			display: flex;
			flex-direction: row;
			width: 100%;
			align-items: center;
			padding: 8rpx;

			/deep/ .uni-col {
				font-size: 12rpx;
			}

			.rangenum {
				display: inline-block;
				width: 100rpx;
			}

			.btn {
				line-height: 1;
				padding: 24rpx 8rpx;
				font-size: 24rpx;
			}
		}
		.countBox{
			display: flex;
			flex-direction: row;
			width: 100%;
			padding:8rpx;
			margin-top:8rpx;
			flex-wrap:wrap;
			.jobItem{
				border-right:1rpx solid gray;
				border-bottom: 1rpx solid gray;
				border-top:1rpx solid gray;
				border-left:1rpx solid gray;
				text-align: center;
			}
		}
	}
</style>
