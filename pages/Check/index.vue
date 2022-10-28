<template>
	<view class="content">
		<uni-row class="headerBox">
			<uni-col :span="16">
				<view style="display: inline-block;margin-right: 8rpx;">作业编号:</view>
				<uni-easyinput v-model="noParams" style="display: inline-block;width: 200rpx;"></uni-easyinput>
			</uni-col>
			<uni-col :span="6">
				<button class="searchBtn" @click="searchTable">查询</button>
			</uni-col>
		</uni-row>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				noParams: ''
			}
		},
		methods: {
			searchTable() {
				console.log('searchTable')
			}
		}
	}
</script>

<style scoped lang="less">
	.headerBox {
		margin: 8rpx !important;
		font-size: 28rpx;
	}

	.searchBtn {
		line-height: 35px;
		font-size: 28rpx;
		padding: 0 24rpx;
		margin-left: 12rpx;
	}
</style>
