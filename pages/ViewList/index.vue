<template>
	<view>
		<view class="uni-container">
					<uni-data-select :localdata="statusList" v-model="statusParams"></uni-data-select>
					<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange">
						<uni-tr>
							<uni-th v-for="(item,index) of thCols" :key="index" align="center">{{item.name}}</uni-th>
						</uni-tr>
						<uni-tr v-for="(item, index) of tableData" :key="index">
							<uni-td v-for="(titem, tindex) in item" :key="tindex" align="center">{{ titem }}</uni-td>
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
	</view>
</template>

<script>
	import userStore from '../../store/modules/userModule.js'
	export default {
		data() {
			
			return {
				thCols:[
					{
						key:'id',
						name:'ID'
					},{
						key:'jobName',
						name:'作业名称'
					},{
						key:'batch-total',
						name:'题目数量'
					},{
						key:'status',
						name:'完成状态'
					},{
						key:'job-create-time',
						name:'作业生成时间'
					},{
						key:'job-lastupdate-time',
						name:'最后更新时间'
					},{
						key:'job-object',
						name:'作业对象'
					},{
						key:'job-reviewer',
						name:'审阅人'
					},{
						key:'scope',
						name:'得分'
					},{
						key:'operator',
						name:'操作'
					}
				],
				tableData:[],
				loading:false,
				statusList:[{
					value:1001,
					text:'未完成'
				},{
					value:1002,
					text:'部分完成'
				}],
				statusParams:1001
			}
		},
		mounted(){
			const userName=uni.getStorageSync('user')
			console.log('123',userName)
			const userName1=getApp().globalData.user
			console.log('123-2',userName1)
			const userName2=userStore.state.userName
			console.log('123-3',userName2)
			this.tableData=[{
				id:'1001',
				jobName:'第一次作业',
				'batch-total':100,
				status:1001,
				'job-create-time':'2022-01-01',
				'job-lastupdate-time':'2022-02-02',
				'job-object':'zjl',
				'job-reviewer':'zyj',
				scope:99
			}]
		},
		methods: {
			editItem(item){
				console.log('item',item)
			},
			delItem(item){
				console.log('item',item)
			}
		}
	}
</script>

<style scoped lang="less">
	.btnBox{
		.uni-button{
			margin-right: 24rpx;
		}
	}
</style>
