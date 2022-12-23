import App from './App'
import Vue from 'vue'
import store from './store/store.js'

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

$http.baseUrl = 'https://www.uinav.com'
// $http.baseUrl = 'https://api-ugo-web.itheima.net'


// 请求拦截器
$http.beforeRequest = function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
	// console.log(store)
	if(options.url.indexOf('/my/') !== -1){
		// 为请求头添加身份认证的字段
		options.header = {
			// 字段的值直接从vuex中获取
			Authorization:store.state.m_user.token,
		}
	}
}
// 响应拦截器
$http.afterRequest = function(options){
	uni.hideLoading()
}
// 封装弹框的方法
uni.$showMsg = function(title = '数据加载失败！',duration = 1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})

app.$mount()