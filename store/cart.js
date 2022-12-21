export default {
	// 开启命名空间（模块化时需要用）
	namespaced:true,
	
	state:()=>({
		// 用来存储商品信息。每个商品的信息对象都有六个属性
		// goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		addToCart(state,goods){
			// 判断cart数组里面是否已经存在goods.goods_id
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			// console.log(findResult)
			// 如果不存在则返回undefined
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
				// console.log(findResult)
				// console.log(findResult.goods_count)
			}
			
			// 通过commit方法，调用m_cart命名空间下的saveToStorage方法
			this.commit('m_cart/saveToStorage')
		},
		// 将购物车的数据持久化存储到本地
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state,goods){
			// 拿到要修改勾选状态的goods_id
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
				// 持久化存储
				this.commit('m_cart/saveToStorage')
			}
		},
		// 更新购物车商品数量
		updateGoodsCount(state,goods){
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				// 持久化存储
				this.commit('m_cart/saveToStorage')
			}
		},
		// 根据ID删除对应商品
		removeGoodsById(state,goods_id){
			// 过滤出不需要删除的商品
			state.cart = state.cart.filter(x=>x.goods_id !== goods_id)
			// 持久化存储
			this.commit('m_cart/saveToStorage')
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state,newState){
			return state.cart.forEach(x=>x.goods_state = newState)
		}
	},
	getters:{
		// 购物车中所有商品的数量
		total(state){
			// let c = 0
			// state.cart.forEach(x => c += x.goods_count)
			// return c
			return state.cart.reduce((total,item)=>total += item.goods_count,0)
		},
		// 购物车中已勾选商品的数量
		checkCount(state){
			// 先用filter过滤已勾选的商品
			// 再用reduce把已勾选的商品数量加起来
			// return的返回值就是商品的总数量
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total += item.goods_count,0)
		},
		// 已勾选的商品的总价格
		checkedGoodsAmount(state){
			return state.cart.filter(x=>x.goods_state)
				.reduce((total,item)=>total += item.goods_count * item.goods_price,0)
				.toFixed(2)
		}
	}
}