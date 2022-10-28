<template>
	<view class="content">
		<uni-row class="headerBox">
			<uni-col :span="16">
				<view style="display: inline-block;margin-right: 8rpx;">作业编号:</view>
				<uni-easyinput v-model="noParams" style="display: inline-block;width: 200rpx;"></uni-easyinput>
			</uni-col>
			<uni-col :span="8">
				<button class="searchBtn" @click="searchTable">查询</button>
				<button class="searchBtn" @click="submitTable">提交</button>
			</uni-col>
		</uni-row>
		<uni-row class="countBox">
			<uni-col :span="6" v-for="(item,index) of currentJob" :key="index" class="jobItem">
				<view class="answer">{{item.content}}=</view>
				<uni-easyinput v-model="item.response" class="inputResponse" :clearable="false"></uni-easyinput>
			</uni-col>
		</uni-row>

	</view>
</template>

<script>
	import jobStore from '../../store/modules/jobModule.js'
	export default {
		data() {
			return {
				noParams: '',
				currentJob: []
			}
		},
		methods: {
			// 假设我们已经判断完类型
			deepClone(val) {
				// 如果是基本数据类型，直接返回值
				const isObject = typeof val === 'object'
				if (!isObject) {
					return val
				}
				// 如果是数组，遍历赋值
				if (Array.isArray(val)) {
					const cloneArray = []
					for (let i = 0; i < val.length; i++) {
						cloneArray[i] = this.deepClone(val[i])
					}
					return cloneArray
				}
				// 如果是对象
				const keys = Object.keys(val)
				const cloneObj = {}
				for (let i = 0; i < keys.length; i++) {
					cloneObj[keys[i]] = this.deepClone(val[keys[i]])
				}
				return cloneObj
			},
			searchTable() {
				console.log('searchTable', jobStore.state.jobList)
				const item = jobStore.state.jobList.find(i => String(i.id) === String(this.noParams))
				console.log('searchTable', item)
				this.currentJob = this.deepClone(item.list)
			},
			submitTable() {
				console.log('submitTable', this.currentJob, jobStore.state.jobList)
				const item = jobStore.state.jobList.find(i => String(i.id) === String(this.noParams))
				console.log('searchTable', item)
				const tmpList = this.deepClone(jobStore.state.jobList)
				tmpList.forEach(i => {
					if (String(i.id) === String(this.noParams)) {
						i.list = this.currentJob
					}
				})
				this.$store.commit('updateJobList', tmpList)
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
		display: inline-block;
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

			.inputResponse {
				width: 60rpx;
				display: inline-block;
				vertical-align: top;

				/deep/.uni-easyinput__content {
					height: 60rpx;

					.uni-easyinput__content-input {
						padding-left: 8rpx !important;
						padding-right: 8rpx !important;
					}
				}
			}
		}

		max-height: 75vh;
		overflow-y: auto;
	}
</style>
