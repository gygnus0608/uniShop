<template>
	<view class="my-userinfo-container">
		<!-- 头像和昵称区域 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl" class="avatar" @click="gettouxiang"></image>
			<view class="nickname">{{userinfo.nickName}}</view>
		</view>
		<!-- 面板区域 -->
		<view class="panel-list">
			<!-- 第一面板 -->
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<!-- 第二面板 -->
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						<image src="../../static/icons/1.png" class="icon"></image>
						<text>待付款</text>
					</view>
					<view class="panel-item">
						<image src="../../static/icons/2.png" class="icon"></image>
						<text>待收货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/icons/3.png" class="icon"></image>
						<text>退款/退货</text>
					</view>
					<view class="panel-item">
						<image src="../../static/icons/4.png" class="icon"></image>
						<text>全部订单</text>
					</view>
				</view>
			</view>
			<!-- 第三面板 -->
			<view class="panel">
				<view class="panel-list-item">
					<text>收货地址</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					<text>联系客服</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					<text>退出登录</text>
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['userinfo'])
		},
		methods:{
			...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
			async logout(){
				const [err,succ] = await uni.showModal({
					title:'提示',
					content:'确定退出？'
				}).catch(err => err)
				// console.log(err,succ)
				if(succ && succ.confirm){
					this.updateAddress('{}')
					this.updateUserInfo('{}')
					this.updateToken('')
				}
			}
		}
	}
</script>

<style lang="scss">
.my-userinfo-container{
	height: 100%;
	background-color: #FAFAFA;
	.top-box{
		height: 400rpx;
		background-color: #C00000;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.avatar{
			height: 90px;
			width: 90px;
			border-radius: 100%;
			border: 2px solid #fff;
			box-shadow: 0 1px 5px black;
		}
		.nickname{
			font-size: 16px;
			color: #fff;
			margin-top: 10px;
			font-weight: bold;
		}
	}
	.panel-list{
		margin: 0 10px;
		position: relative;
		top: -10px;
		
		.panel{
			background-color: #fff;
			border-radius: 3px;
			margin-bottom: 8px;
			
			.panel-title{
				line-height: 45px;
				padding-left:10px;
				font-size: 15px;
				border-bottom: 1px solid #FAFAFA;
			}
			.panel-body{
				display: flex;
				justify-content: space-around;
				
				.panel-item{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					font-size: 13px;
					padding: 10px 0;
					.icon{
						height: 35px;
						width: 35px;
					}
				}
			}
		}
	}
	.panel-list-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		line-height: 45px;
		padding: 0 10px;
		font-size: 15px;
	}
}
</style>