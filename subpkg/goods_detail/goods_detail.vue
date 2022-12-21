<template>
	<view v-if="goods_info.goods_name" class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goods_info.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递，免运费</view>
		</view>
		<!-- 商品详情信息 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 商品底部导航 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick"  />
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
import cart from '../../store/cart';
	export default {
		data() {
			return {
				goods_info:{},
				options: [{
						icon: 'shop',
						text: '店铺',
					}, {
						icon: 'cart',
						text: '购物车',
						info: 0
				}],
				buttonGroup: [{
				  text: '加入购物车',
				  backgroundColor: '#ff0000',
				  color: '#fff'
				},
				{
				  text: '立即购买',
				  backgroundColor: '#ffa200',
				  color: '#fff'
				}]
			};
		},
		computed:{
			...mapState('m_cart',[]),
			...mapGetters('m_cart',['total'])
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodDetail(goods_id)
			// console.log(options)
		},
		methods:{
			// 获取m_cart里面的addToCart方法
			...mapMutations('m_cart',['addToCart']),
			async getGoodDetail(goods_id){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				if(res.meta.status !== 200) return uni.$showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g,'jpg')
				this.goods_info = res.message
				// console.log(this.goods_info)
			},
			preview(i){
				// 调用uni.previewImage()方法预览图片
				uni.previewImage({
					// 预览时默认显示图片的索引
					current:i,
					// 用map循环将图片的url路径存放到一个新数组里
					urls:this.goods_info.pics.map(x=>x.pics_big)
				})
			},
			onClick (e) {
				if(e.content.text === '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
		    buttonClick (e) {
				// console.log(e)
				if(e.content.text === '加入购物车'){
					const goods = {
						// goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state
						goods_id : this.goods_info.goods_id,
						goods_name:this.goods_info.goods_name,
						goods_price:this.goods_info.goods_price,
						goods_count:1,
						goods_small_logo:this.goods_info.goods_small_logo,
						goods_state:true
					}
					this.addToCart(goods)
					
				}
			},
			
		},
		// 使用普通函数的话，页面首次加载完毕后，不会调用这个监听器
		// 用handler+immediate的方法可以让页面首次加载完毕就调用监听器
		watch:{
			total:{
				handler(newVal){
					// 找出含有“购物车”的对象
					const findResult = this.options.find(x=>x.text === '购物车')
					if(findResult){
						findResult.info = newVal
					}
				},
				immediate:true
			}
		}
	}
</script>

<style lang="scss">
swiper{
	height: 750rpx;
	
	image{
		width: 100%;
		height: 100%;
	}
}
.goods-info-box{
	padding: 10px;
	padding-right: 0;
	.price{
		color: #C00000;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info-body{
		display: flex;
		justify-content: space-between;
		
		.goods-name{
			font-size: 13px;
			margin-right: 10px;
		}
		.favi{
			color: gray;
			width: 120rpx;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-left: 1px solid #efefef;
		}
	}
	.yf{
		font-size: 12px;
		color: gray;
		margin:10px 0
	}
}
.goods_nav{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
}
// 给最外层的盒子增加50px的高度，使最底部的数据不会被商品导航挡到
.goods-detail-container{
	padding-bottom: 50px;
}
</style>
