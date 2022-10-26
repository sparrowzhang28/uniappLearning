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
			<uni-col :span="3"><button class="btn">生成</button></uni-col>
		</uni-row>
		<uni-row class="countBox">
			<uni-col :span="4" v-for="(item,index) of jobsList" :key="index">{{item.count}}</uni-col>
		</uni-row>
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
				}],
				calcOperator: '',
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
	}
</style>
