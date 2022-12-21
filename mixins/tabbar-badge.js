import {mapGetters} from 'vuex'
export default {
	computed:{
		...mapGetters('m_cart',['total'])
	},
	// 监听，只要商品数量一发生变化就改变tabbar的数字徽标
	watch:{
		// 监听total值的变化
		total(){
			this.setBadge()
		}
	},
	onShow(){
		this.setBadge()
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index:2,
				text:this.total+''
			})
		}
	}
}