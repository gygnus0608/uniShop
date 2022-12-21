<template>
	<view class="goods-item">
		<!-- 左边的盒子 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<image :src="goods.goods_small_logo" class="goods-pic"></image>
		</view>
		<!-- 右边的盒子 -->
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChangeHandler"></uni-number-box>
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
			// 这里的goods来自state里的cart
			goods:{
				type:Object,
				default:{}
			},
			showRadio:{
				type:Boolean,
				defaults:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			radioClickHandler(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			numberChangeHandler(val){
				// console.log(val)
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					// +val表示将val转为Number类型
					goods_count :+val
				})
			},
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.goods-pic{
			height: 100px;
			width: 100px;
			display: block;
		}
	}
	.goods-item-right{
		display: flex;
		flex: 1;
		// 纵向布局
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price{
				color: #C00000;
				font: size 13px;
			}
		}
	}
}
</style>