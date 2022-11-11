<template>
	<view class="content">
		<view class="leftBox">
			<image class="logo" src="/static/logo.png"></image>
		</view>
		<view class="rightBox">
			<view class="header">学生作业布置系统</view>
			<view class="infoBox">
				<uni-row class="row">
					<uni-col :span="6" :offset="2">账号：</uni-col>
					<uni-col :span="14">
						<uni-easyinput class="account" trim="all" v-model="username" placeholder="请输入内容">
						</uni-easyinput>
					</uni-col>
				</uni-row>
				<uni-row class="row">
					<uni-col :span="6" :offset="2">密码：</uni-col>
					<uni-col :span="14">
						<uni-easyinput class="password" trim="all" v-model="passCode" placeholder="请输入内容"
							type="password"></uni-easyinput>
					</uni-col>
				</uni-row>
			</view>
			<view class="btnBox">
				<view>注册</view>
				<view>忘记密码</view>
			</view>
			<view class="btnBox submit">
				<button @tap="login" :disable="!username||!passCode">登录</button>
				<uni-popup ref="popup" type="center">{{tipMsg}}</uni-popup>
			</view>
			<view class="qr-box">
				<canvas canvas-id="qrcode" style="width: 300rpx;margin: 0 auto;" />
			</view>
		</view>



	</view>
</template>

<script>
	import uQRCode from '../../common/qrcode.js'
	export default {
		data() {
			return {
				username: "admin",
				passCode: "123456",
				submitEnable: false,
				editEnable: false,
				addEnable: false,
				tipMsg: ""
			}
		},
		onLoad(){
			this.qrFun()
		},
		methods: {
			login() {
				console.log('this', this.username, this.passCode);
				if (!this.username) {
					this.tipMsg = "账号必填"
					this.$refs.popup.open('center')
					return
				}
				if (!this.passCode) {
					this.tipMsg = "密码必填"
					this.$refs.popup.open('center')
					return
				}
				// TODO:diff route-function  https://uniapp.dcloud.net.cn/api/router.html#event-channel
				// pass the data by storage ,it is like the localstorage
				uni.setStorageSync('user', this.username)
				// pass the params by globalData
				const globalData = getApp()
				globalData.globalData.user = this.username
				// pass the  data by vuex(store)
				this.$store.commit('saveUser', this.username)
				uni.switchTab({
					url: '/pages/ViewList/index'
				})
			},
			qrFun() {
				uQRCode.make({
					canvasId: 'qrcode',
					componentInstance: this,
					text: 'http://static-c53de1c8-6851-4d09-9e57-1e278711f265.bspapp.com/#/pages/ViewList/index',
					size: 150,
					margin: 0,
					backgroundColor: '#ffffff',
					foregroundColor: '#000000',
					fileType: 'jpg',
				    errorCorrectLevel: uQRCode.errorCorrectLevel.H,
					success: res => {}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		display: flex;
		flex-direction: row;
		height: 100%;
	}

	.leftBox {
		display: flex;
		padding: 4px;
		justify-content: center;
		align-items: center;

		.logo {
			width: 150rpx;
			height: 150rpx;
		}
	}

	.rightBox {
		flex: 1 1 0%;
		flex-direction: column;
	}

	.btnBox {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		margin-top: 12rpx;
		color: #1890ff;
		text-decoration: underline;

		&.submit {
			text-decoration: none;
			flex: 1;
			margin-top: 48rpx;
			margin-right: 8rpx;

			uni-button {
				font-size: 10rpx;
				flex: 1;
			}
		}
	}

	.header {
		text-align: center;
		padding-right: 40rpx;
		font-size: 36rpx;
		font-weight: 400;
	}

	.infoBox {
		flex-direction: row;
		display: column;
	}

	.row {
		display: flex;
		align-items: center;
		margin-top: 12rpx;
	}

	uni-page-body {
		min-height: 100% !important;
		height: auto !important;
	}
</style>
