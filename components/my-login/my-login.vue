<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login"open-type="getUserInfo" @click="getUserInfo">一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['redirectInfo'])
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			getUserInfo(){
				uni.getUserProfile({
					desc:"Wexin",
					fail:res=>uni.$showMsg('您取消了授权！'),
					success:(res)=>{
						this.updateUserInfo(res.userInfo)
						// console.log(res)
						this.getToken(res)
					},
				})
			},
			async getToken(info){
				// 调用微信登录接口
				const [err,res] = await uni.login().catch(err => err)
				if(err || res.errMsg !== 'login:ok') return uni.$showErr('登录失败')
				// console.log(info)
				// console.log(res)
				
				const query = {
					code : res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				// console.log(query)
				const { data:loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				console.log(loginResult)
				if(loginResult.meta.status !== 200)  {
					uni.$showMsg('登录成功')
					this.updateToken(query.code)//拿不到接口的token，用query.code顶替一下
					// console.log(query.code)
					this.navigateBack()
				}
			},
			navigateBack(){
				console.log(this.redirectInfo)
				if(this.redirectInfo && this.redirectInfo.openType==='switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete:()=> {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: #F8F8F8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	
	&::after{
		content: ' ';
		display: block;
		width: 100%;
		height: 40px;
		position: absolute;
		bottom:0;
		left: 0;
		background-color: white;
		border-radius: 100%;
		// 移动自身高度的一半：transform:translateY(50%)
		transform:translateY(50%)
	}
	
	
	.btn-login{
		width: 90%;
		border-radius: 100px;
		background-color: #C00000;
		margin:15px 0
		
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>