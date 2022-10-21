<template>
	<view>
		查看作业
	</view>
</template>

<script>
	import userStore from '../../store/modules/userModule.js'
	export default {
		data() {
			
			return {
				
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
