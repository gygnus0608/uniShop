export default {
	// 开启命名空间
	namespaced:true,
	
	state:()=>({
		// 读取本地的收货地址数据
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
	}),
	
	mutations:{
		// 更新收货地址
		updateAddress(state,address){
			state.address = address
			// 调用持久化存储方法
			this.commit('m_user/saveAddressToStorage')
		},
		// 持久化存储收货地址
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	getters:{
		addstr(state){
			// 如果省份为空的话就返回''
			if(!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName+state.address.detailInfo
		}
	}
}