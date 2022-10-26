<template>
	<view class="content">
		<uni-row class="header">
			<uni-col>计算条件</uni-col>
			<uni-col>作业数量</uni-col>
			<uni-col>数字范围</uni-col>
			<uni-col>生成</uni-col>
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
				numRange: 0
			}
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	
</style>
