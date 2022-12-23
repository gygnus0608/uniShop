<template>
	<view class="my-container">
		<my-login v-if='!token'></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import badMix from '@/mixins/tabbar-badge.js'
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				
			};
		},
		mixins:[badMix],
		computed:{
			...mapState('m_user',['token'])
		}
	}
</script>

<style lang="scss">
page, .my-container{
	height: 100%;
}
</style>
