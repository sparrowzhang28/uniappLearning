<template>
	<view>
		查看作业
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			
			const userName=uni.getStorageSync('user')
			console.log('123',userName)
			const userName1=getApp().globalData.user
			console.log('123-2',userName1)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
