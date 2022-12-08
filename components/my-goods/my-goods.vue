<template>
	<view class="goods-item">
		<!-- 左边的盒子 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo" class="goods-pic"></image>
		</view>
		<!-- 右边的盒子 -->
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				
			};
		},
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 10px 5px;
	border-bottom: 1px solid #f0f0f0;
	
	.goods-item-left{
		margin-right: 5px;
		
		.goods-pic{
			height: 100px;
			width: 100px;
			display: block;
		}
	}
	.goods-item-right{
		display: flex;
		// 纵向布局
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			.goods-price{
				color: #C00000;
				font: size 13px;
			}
		}
	}
}
</style>