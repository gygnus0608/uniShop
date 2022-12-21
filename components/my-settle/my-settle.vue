<template>
	<view class="my-settle-container">
		<!-- 全选 -->
		<label class="radio" @click="checkAllState">
			<radio color="#C00000" :checked="isFullCheck"/><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<!-- 结算 -->
		<view class="btn-settle">
			<text>结算({{checkCount}})</text>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations} from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapGetters('m_cart',['checkCount','total','checkedGoodsAmount']),
			isFullCheck(){
				return this.total === this.checkCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			checkAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	position: fixed;
	bottom:0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: #ffffff;
	font-size: 14px;
	padding-left: 5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.radio{
		display: flex;
		align-items: center;
		
	}
	.amount-box{
		.amount{
			color: #C00000;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #C00000;
		color: white;
		height: 50px;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}
}
</style>