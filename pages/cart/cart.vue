<template>
	<view class="cart-container" v-if="cart.length != 0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 购物车商品列表的标题区域 -->
		<view class="cart-title">
			<!-- 左侧的图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 描述文本 -->
			<text class="cart-title-text">购物车</text>
		</view>
		<uni-swipe-action>
			<block v-for="(goods,index) in cart" :key="index">
				<uni-swipe-action-item :right-options="options" @click="swiperItemClickHandler(goods)">
					<!-- 修改勾选状态：绑定自定义事件 --><!-- 监听购物车数量变化：绑定自定义事件 -->
					<my-goods 
					:goods="goods" 
					:showRadio="true" 
					:showNum="true" 
					@radio-change="radioClickHandler"
					@num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算信息 -->
		<my-settle></my-settle>
	</view>
	<view class="empty-cart" v-else>
		<image src="/static//empty-cart.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import badMix from '@/mixins/tabbar-badge.js'
	import {mapState,mapMutations} from "vuex"
	export default {
		mixins:[badMix],
		data() {
			return {
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#C00000'
					}
				}]
			};
		},
		computed:{
			...mapState('m_cart',['cart'])
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			radioClickHandler(e){
				this.updateGoodsState(e)
			},
			numberChangeHandler(e){
				this.updateGoodsCount(e)
			},
			swiperItemClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
.cart-container{
	padding-bottom: 50px;
}
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text{
		margin-left: 10px;
	}
}
.empty-cart{
	display:flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img{
		height: 70px;
		width: 90px;
	}
	.tip-text{
		color: gray;
		font-size: 12px;
		margin-top: 15px;
	}
}
</style>
