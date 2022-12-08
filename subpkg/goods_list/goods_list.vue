<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,index) in goodsList" :key="index" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					// 默认显示第一页
					pagenum:1,
					// 默认一页显示10条
					pagesize:10
				},
				// 总条数
				total:0,
				goodsList:[],
				// 定义节流阀
				isloading:false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(cb){
				// 打开节流阀
				this.isloading = true;
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				// 关闭节流阀
				this.isloading = false
				// 只要数据请求完毕，就立即调用cb回调函数
				cb && cb()
				// console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.total = res.message.total
				this.goodsList = [...this.goodsList, ...res.message.goods]
				// console.log(res.message.goods)
			},
			gotoDetail(goods){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods.goods_id
				})
			}
		},
		onReachBottom(){
			// 判断是否是最后一页
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据已经加载完毕！')
			// 如果正在请求数据，就让页码加1
			if(this.isloading) return
			this.queryObj.pagenum ++
			// 重新获取数据
			this.getGoodsList()
		},
		// 下拉刷新事件
		onPullDownRefresh(){
			// 重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			// 重新发起数据请求
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
