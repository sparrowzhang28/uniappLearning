<template>
	<view>
		<view class="uni-container">
			<uni-row class="headerBox">
				<uni-col :span="10">
					<view style="display: inline-block;margin-right: 8rpx;">状态:</view>
					<uni-data-select :localdata="statusList" v-model="statusParams"
						style="display: inline-block;width: 200rpx;"></uni-data-select>
				</uni-col>
				<uni-col :span="6">
					<button class="searchBtn" @click="searchTable">查询</button>
				</uni-col>
			</uni-row>
			<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据"
				@selection-change="selectionChange">
				<uni-tr>
					<uni-th v-for="(item,index) of thCols" :key="index" align="center">{{item.name}}</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) of tableData" :key="index">
					<uni-td v-for="(titem, tindex) in item" :key="tindex" align="center">
						{{ tindex==='status'?statusList.find(i=>i.value===titem).text:titem }}
					</uni-td>
					<uni-td align="center">
						<view class="uni-group btnBox">
							<button class="uni-button" size="mini" type="primary" @click="editItem(item)">修改</button>
							<button class="uni-button" size="mini" type="warn" @click="delItem(item)">删除</button>
						</view>
					</uni-td>
				</uni-tr>
			</uni-table>
			<!-- <view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view> -->
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog v-if="editDialogItem" :title="editDialogItem.jobName" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm">
				<uni-row class="modelHeader">
					<uni-col :span="16">
						<view style="display: inline-block;margin-right: 8rpx;font-size: 12rpx;">状态:{{count()}}</view>
					</uni-col>
					<uni-col :span="6">
						<button class="searchBtn" @click="searchModalTable">查询</button>
					</uni-col>
				</uni-row>
				<uni-row class="modelHeader">
					<uni-col :span="24"><button class="searchBtn" @click="exportModalTable">导出结果</button></uni-col>
				</uni-row>
				<uni-row class="modelHeader tableBox">
					<uni-table ref="modelTable" :loading="loading" border stripe emptyText="暂无更多数据">
						<uni-tr>
							<uni-th v-for="(item,index) of modelCols" :key="index" align="center" width="10">
								{{item.name}}
							</uni-th>
						</uni-tr>
						<uni-tr v-for="(item, index) of modelTableData" :key="index">
							<uni-td v-for="(titem, tindex) in item" :key="tindex" align="center">
								{{ titem }}
							</uni-td>
						</uni-tr>
					</uni-table>
				</uni-row>
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import json2xlsx from 'json2xlsx-export';
	import userStore from '../../store/modules/userModule.js'
	export default {
		data() {
			return {
				thCols: [{
					key: 'id',
					name: 'ID'
				}, {
					key: 'jobName',
					name: '作业名称'
				}, {
					key: 'batch-total',
					name: '题目数量'
				}, {
					key: 'status',
					name: '完成状态'
				}, {
					key: 'job-create-time',
					name: '作业生成时间'
				}, {
					key: 'job-lastupdate-time',
					name: '最后更新时间'
				}, {
					key: 'job-object',
					name: '作业对象'
				}, {
					key: 'job-reviewer',
					name: '审阅人'
				}, {
					key: 'scope',
					name: '得分'
				}, {
					key: 'operator',
					name: '操作'
				}],
				tableData: [],
				loading: false,
				statusList: [{
					value: 1001,
					text: '未完成'
				}, {
					value: 1002,
					text: '部分完成'
				}],
				statusParams: 1001,
				editDialogItem: null,
				modelTableData: [],
				modelCols: [{
					key: 'order',
					name: '序号'
				}, {
					key: 'content',
					name: '题目'
				}, {
					key: 'answer',
					name: '答案'
				}]
			}
		},
		mounted() {
			const userName = uni.getStorageSync('user')
			const userName1 = getApp().globalData.user
			const userName2 = userStore.state.userName
			this.getTable()
		},
		methods: {
			getTable() {
				const originData = [{
						id: '1001',
						jobName: '第一次作业',
						'batch-total': 100,
						status: 1001,
						'job-create-time': '2022-01-01',
						'job-lastupdate-time': '2022-02-02',
						'job-object': 'zjl',
						'job-reviewer': 'zyj',
						scope: 99
					},
					{
						id: '1002',
						jobName: '第二次作业',
						'batch-total': 101,
						status: 1002,
						'job-create-time': '2022-01-01',
						'job-lastupdate-time': '2022-02-02',
						'job-object': 'zjl',
						'job-reviewer': 'zyj',
						scope: 99
					}
				]
				this.tableData = originData.filter(i => i.status === this.statusParams || !this.statusParams)
			},
			editItem(item) {
				console.log('item', item)
				this.editDialogItem = item
				// get modalTableList by item-params
				this.modelTableData = [{
					order: 1,
					content: '1+1',
					answer: '2'
				}, {
					order: 2,
					content: '2+2',
					answer: '4'
				}, {
					order: 3,
					content: '3+3',
					answer: '6'
				}, {
					order: 4,
					content: '4+4',
					answer: '8'
				}, {
					order: 5,
					content: '5+5',
					answer: '10'
				}, {
					order: 6,
					content: '6+6',
					answer: '12'
				}, {
					order: 7,
					content: '7+7',
					answer: '14'
				}, {
					order: 8,
					content: '8+8',
					answer: '16'
				}]
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			confirm(data) {
				console.log('confirm', data)
				this.$refs.popup.close()
			},
			delItem(item) {
				console.log('item', item)
				this.tableData = this.tableData.filter(i => i.id !== item.id)
			},
			searchTable() {
				this.getTable()
			},
			searchModalTable() {
				console.log('modelTable')
			},
			exportModalTable() {
				console.log('exportModalTable')
				// let fm=wx.getFileSystemManager()
				// fm.writeFile({
				// 	filePath:'text.xls',
				// 	data:this.modelTableData
				// })
			},
			applyOperator(op) {
				if (op.includes('+')) {
					const tmp = op.split('+')
					return Number(tmp[0]) + Number(tmp[1])
				}
				if (op.includes('-')) {
					const tmp = op.split('-')
					return tmp[0] - tmp[1]
				}
				if (op.includes('*')) {
					const tmp = op.split('*')
					return tmp[0] * tmp[1]
				}
				if (op.includes('/')) {
					const tmp = op.split('/')
					return tmp[0] / tmp[1]
				}
			},
			count() {
				console.log('123', this.modelTableData)
				let count = 0;
				this.modelTableData.forEach(i => {
					const {
						answer,
						content
					} = i
					const tmp = content.replaceAll('"')
					if (Number(answer) === this.applyOperator(tmp)) {
						count++
					}
				})
				return Math.floor(count / this.modelTableData.length * 100)
			}
		}
	}
</script>

<style scoped lang="less">
	.btnBox {
		.uni-button {
			margin-right: 24rpx;
		}
	}

	.searchBtn {
		line-height: 35px;
		font-size: 28rpx;
		padding: 0 24rpx;
		margin-left: 12rpx;
	}

	.headerBox {
		margin: 8rpx !important;
	}

	/deep/ .uni-popup-dialog {
		.uni-dialog-content {
			flex-direction: column;
		}
	}

	.modelHeader {
		display: inline-block;
		width: 100%;

		.searchBtn {
			font-size: 20rpx;
			padding: 0 12rpx;
			margin-left: 8rpx;
		}

		/deep/ .uni-easyinput {
			width: 240rpx;
			display: inline-flex;
		}

		&.tableBox {
			max-height: 300px;
			overflow-y: auto;
			overflow-x: hidden;
		}
	}

	.modelHeader:nth-child(2) {
		margin-top: 12rpx;
	}
</style>
