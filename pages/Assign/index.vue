<template>
	<view class="content">
		<uni-row class="header">
			<uni-col :span="7">计算条件:&nbsp;
				<uni-data-select :localdata="calcOperators" v-model="calcOper"
					style="display: inline-block;width: 100rpx;" :clear="false">
				</uni-data-select>
			</uni-col>
			<uni-col :span="7">作业数量:&nbsp;<uni-easyinput class="rangenum" v-model="jobsNum" :clearable="false">
				</uni-easyinput>
			</uni-col>
			<uni-col :span="7">数字范围:&nbsp;<uni-easyinput class="rangenum" v-model="numRange" :clearable="false">
				</uni-easyinput>
			</uni-col>
			<uni-col :span="3"><button class="btn" @click="generator">生成</button></uni-col>
		</uni-row>
		<uni-row class="countBox">
			<uni-col :span="6" v-for="(item,index) of jobsList" :key="index" class="jobItem">
				<view @click="clickJobItem" class="answer">{{item.content}}</view>
				<view v-if="showAnswer" class="answer">={{item.answer}}</view>
			</uni-col>
		</uni-row>
		<uni-popup ref="popup" type="dialog">
			<view>作业数量和数字范围必须为有效数字</view>
		</uni-popup>
	</view>
</template>

<script>
	import jobStore from "../../store/modules/jobModule.js"
	import moment from "moment"
	export default {
		data() {
			return {
				jobsList: [],
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
				},
				{
					value: '#',
					text: '混合加减'
				},
				{
					value: '@',
					text: '3数混合'
				}
				],
				calcOper: '+',
				showAnswer: false
			}
		},
		methods: {
			mappingCalcOper(oper, a, b) {
				switch (oper) {
					case '+':
						return a + b;
						break;
					case '-':
						return a - b;
						break;
					case '*':
						return a * b;
						break;
					case '/':
						return a / b;
						break
				}
			},
			generator() {
				console.log(this.calcOper, this.numRange, this.jobsNum)
				if (!this.numRange || !this.jobsNum) {
					this.$refs.popup.open()
					return
				} else {
					const calcNums = []
					const calcStr=[]
					for (let i = 0; i < this.jobsNum; i++) {
						let str = ''
						let answer = 0
						let num1 = Math.ceil(Math.random() * this.numRange)
						let num2 = Math.ceil(Math.random() * this.numRange)
						let num3 = Math.ceil(Math.random() * this.numRange)
						let calcOperator=this.calcOper
						if(calcOperator === '#'){
							calcOperator=Math.random()>0.5?'+':'-'
						}
						if (calcOperator === '-') {
							if (num1 < num2) {
								[num1, num2] = [num2, num1]
							}
						}
						if(calcOperator === '@'){
							calcOperator=Math.random()>0.5?'+':'-'
							if (calcOperator === '-') {
								if (num1 < num2) {
									[num1, num2] = [num2, num1]
								}
							}
							
							answer = this.mappingCalcOper(calcOperator, num1, num2)
							if(answer<0){
								calcOperator='+'	
							}
							str = num1 + calcOperator + num2
							answer = this.mappingCalcOper(calcOperator, num1, num2)
							
							calcOperator=Math.random()>0.5?'+':'-'
							if (calcOperator === '-') {
								if (answer < num3) {
									[answer, num3] = [num3, answer]
								}
							}
							
							answer = this.mappingCalcOper(calcOperator,answer,num3)
							if(answer<0){
								calcOperator='+'	
							}
							str += calcOperator + num3 + ''
							
							answer = this.mappingCalcOper(calcOperator, answer, num3)
							
							calcStr.push(`${str}=\r\n`)
							calcNums.push({
								order: i,
								content: str,
								response: '',
								answer: answer
							})
							
						}else{
							str = num1 + calcOperator + num2
							answer = this.mappingCalcOper(calcOperator, num1, num2)
							calcStr.push(`${str}=\r\n`)
							calcNums.push({
								order: i,
								content: str,
								response: '',
								answer: answer
							})
						}
					}
					console.log('calcStr',calcStr.join(''))
					this.jobsList = calcNums
				}
				const item = {
					id: jobStore.state.jobList.length + 1,
					jobName: `第${jobStore.state.jobList.length + 1}次作业`,
					'batch-total': this.jobsNum,
					status: 1001,
					'job-create-time': moment(new Date()).format("YYYY-MM-DD"),
					'job-lastupdate-time': moment(new Date()).format("YYYY-MM-DD"),
					'job-object': 'zjl',
					'job-reviewer': 'zyj',
					scope: 0,
					list: this.jobsList
				}
				this.$store.commit('saveJobs', item)
			},
			clickJobItem() {
				this.showAnswer = !this.showAnswer
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
		// overflow: hidden;

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

		.countBox {
			display: flex;
			flex-direction: row;
			width: 100%;
			padding: 8rpx;
			margin-top: 8rpx;
			flex-wrap: wrap;

			.jobItem {
				border-right: 1rpx solid gray;
				border-bottom: 1rpx solid gray;
				border-top: 1rpx solid gray;
				border-left: 1rpx solid gray;
				text-align: center;
				height: 64rpx;
				line-height: 64rpx;

				.answer {
					display: inline-block;
				}
			}

			max-height: 75vh;
			overflow-y: auto;
		}
	}
</style>
