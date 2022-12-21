<template>
	<view>
		<!-- 使用自定义搜索组件 -->
		<view class="search-box">
			<my-search @mysearch='gotoSearch()'></my-search>
		</view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src" alt=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类区域 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img" mode=""></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层item项 -->
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src"class="floor-title" mode=""></image>
				<!-- 楼层图片区域 -->
				<view class="floor-img-box">
					<!-- 左侧大图片盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image 
							:src="item.product_list[0].image_src" 
							:style="{width:item.product_list[0].image_width+'rpx'}"
							mode="widthFix"></image>
					</navigator>
					<!-- 右侧4个小图片盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,index2) in item.product_list" :key="index2" :url="item2.url">
							<image :src="item2.image_src" v-if="index2 !== 0"
							:style="{width:item2.image_width+'rpx'}"
							 mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins:[badMix],
		data() {
			return {
				// 轮播图的数据列表
				swiperList:[],
				// 分类导航的数据列表
				navList:[],
				// 楼层的数据列表
				floorList:[]
			};
		},
		onLoad(){
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				// 请求失败
				if(res.meta.status !== 200)return uni.$showMsg()
				// 请求成功
				this.swiperList = res.message
			},
			async getNavList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			navClickHandler(item){
				// 判断点击的是哪个nav
				if(item.name === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				console.log(res)
				if(res.meta.status !== 200)return uni.$showMsg()
				// 赋值前先定义一个自定义url用于图片路径跳转
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url = '/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			},
			gotoSearch(){
				// console.log(123)
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	// 吸顶效果
	position: sticky;
	top:0;
	z-index: 999;
}
swiper{
	height: 330rpx;
	.swiper-item,image{
		width: 100%;
		height: 100%;
	}
}
.nav-list{
	display: flex;
	// 在弹性和对象中的各项周围留有空白
	justify-content: space-around;
	margin:15px 0;
	
	.nav-img{
		width:120rpx;
		height: 140rpx;
	}
}
.floor-title{
	height: 60rpx;
	width: 100%;
	display: flex;
}
.right-img-box{
	display:flex;
	flex-wrap:wrap;
	justify-content: space-around;
}
.floor-img-box{
	display:flex;
	padding-left: 10rpx;
}

</style>
