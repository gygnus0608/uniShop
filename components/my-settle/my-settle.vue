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
		<view class="btn-settle" @click="settlement">
			<text>结算({{checkCount}})</text>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
				seconds:3,
				// 定时器的id
				timer:null
			};
		},
		computed:{
			...mapGetters('m_cart',['checkCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			...mapState('m_cart',['cart']),
			isFullCheck(){
				return this.total === this.checkCount
			}
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			checkAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			},
			// 用户点击了结算按钮
			settlement(){
				if(!this.checkCount) return uni.$showMsg('请选择要结算的商品！')
				if(!this.addstr) return uni.$showMsg('请选择收货地址！')
				if(!this.token) return this.delayNavigate()
				// 调用创建订单函数
				this.payOrder()
			},
			async payOrder(){
				// 创建订单
				// 1、创建订单信息对象
				const orderInfo = {
					order_price:0.01,
					consignee_addr:this.addstr,
					goods:this.cart.filter(x=>x.goods_state).map( x => ({
						goods_id:x.goods_id,
						goods_number:x.goods_count,
						goods_price:x.goods_price
					}))
				}
				// 2、发起请求
				const {data:res} = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
				// console.log(res)
				if(res.meta.status === 200)return uni.$showMsg('创建订单失败')
				// 3、拿到服务器返回的订单编号
				const orderNumber = this.token//拿不到真实token
				console.log(orderNumber)
				
				// 订单预支付
				const {data:res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number:orderNumber})
				// console.log(res2)
			},
			delayNavigate(){
				this.seconds = 3
				this.showTips(this.seconds)
				this.timer = setInterval(()=>{
					this.seconds--
					
					if(this.seconds <= 0){
						clearInterval(this.timer),
						uni.switchTab({
							url:'/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									// 跳转的方式
									openType:'switchTab',
									// 从哪个页面跳转过去的
									from:'/pages/cart/cart'
								})
							}
						})
						// 要return才不会在my页面出现弹框
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请先登录，'+n+'秒后跳转到登录页面',
					// 防止用户的点击穿透
					mask:true,
					duration:1500
				})
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