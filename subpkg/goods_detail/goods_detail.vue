<template>
<<<<<<< HEAD
	<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
		<swiper-item v-for="(item,index) in goods_info.pics" :key="index">
			<image :src="item.pics_big"></image>
		</swiper-item>
	</swiper>
=======
	<view>
		goods_detail
	</view>
>>>>>>> 335a0d829910d1f1fcf1825bb8cd5232db71cfc6
</template>

<script>
	export default {
		data() {
			return {
<<<<<<< HEAD
				goods_info:{}
			};
		},
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodDetail(goods_id)
		},
		methods:{
			async getGoodDetail(goods_id){
				const {data:res} = await uni.$http.get('/api/public/v1/goods/detail',{goods_id})
				if(res.meta.status !== 200) return uni.$showMsg()
				this.goods_info = res.message
				console.log(this.goods_info)
			}
=======
				
			};
>>>>>>> 335a0d829910d1f1fcf1825bb8cd5232db71cfc6
		}
	}
</script>

<style lang="scss">
<<<<<<< HEAD
swiper{
	height: 750rpx;
	
	image{
		width: 100%;
		height: 100%;
	}
}
=======

>>>>>>> 335a0d829910d1f1fcf1825bb8cd5232db71cfc6
</style>
