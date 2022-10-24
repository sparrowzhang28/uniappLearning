<template>
	<view>
		<view class="uni-container">
					
					<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange">
						<uni-tr>
							<uni-th width="150" align="center">日期</uni-th>
							<uni-th width="150" align="center">姓名</uni-th>
							<uni-th align="center">地址</uni-th>
							<uni-th width="204" align="center">设置</uni-th>
						</uni-tr>
						<uni-tr v-for="(item, index) in tableData" :key="index">
							<uni-td>{{ item.date }}</uni-td>
							<uni-td>
								<view class="name">{{ item.name }}</view>
							</uni-td>
							<uni-td align="center">{{ item.address }}</uni-td>
							<uni-td>
								<view class="uni-group">
									<button class="uni-button" size="mini" type="primary">修改</button>
									<button class="uni-button" size="mini" type="warn">删除</button>
								</view>
							</uni-td>
						</uni-tr>
					</uni-table>
					<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>
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
				]
			}
		},
		mounted(){
			const userName=uni.getStorageSync('user')
			console.log('123',userName)
			const userName1=getApp().globalData.user
			console.log('123-2',userName1)
			const userName2=userStore.state.userName
			console.log('123-3',userName2)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
