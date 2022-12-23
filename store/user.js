export default {
	// 开启命名空间
	namespaced:true,
	
	state:()=>({
		// 读取本地的收货地址数据
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		token:uni.getStorageSync('token')||'',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		// 重定向后的信息
		redirectInfo:null
	}),
	
	mutations:{
		// 持久化存储收货地址
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		// 更新收货地址
		updateAddress(state,address){
			state.address = address
			// 调用持久化存储方法
			this.commit('m_user/saveAddressToStorage')
		},
		
		// 持久化存储用户信息
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		// 更新用户信息
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			// 调用持久化存储的方法
			this.commit('m_user/saveUserInfoToStorage')
		},
		
		// 持久化存储token
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		// 更新Token
		updateToken(state,token){
			state.token = token
			// 调用持久化存储token的方法
			this.commit('m_user/saveTokenToStorage')
		},
		updateRedirectInfo(state,info){
			state.redirectInfo = info
			// console.log(state.redirectInfo)
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