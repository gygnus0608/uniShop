<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 历史标题 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,index) in histories" :key="index" @click="gotoGoodList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 获取关键词
				kw:"",
				// 防抖，设置定时器的timer
				timer:null,
				// 搜索的结果列表
				searchResults:[],
				// 搜索历史列表
				historyList:[]
			};
		},
		computed:{
			histories(){
				// 这里的historyList是最新的
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
		},
		methods:{
			// 通过e拿到用户输入的值
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw = e
					this.getSearchList()
				},500)
			},
			async getSearchList(){
				// 如果输入框为空，则把搜索结果列表置为空
				if(this.kw.length === 0){
					this.searchResults = []
					return
				}
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				if(res.meta.status !== 200)return uni.$showMsg()
				this.searchResults = res.message
				this.saveSearchHistory()
			},
			gotoDetail(item){
				// console.log(item.goods_id)
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
			// 处理搜索关键词：出现重复输入的情况
			saveSearchHistory(){
				// this.historyList.push(this.kw)
				// // 把数组转换为set对象
				const set = new Set(this.historyList)
				// 先移除关键词，再在末尾添加该关键词
				set.delete(this.kw)
				set.add(this.kw)
				// 把set对象转换为数组
				this.historyList = Array.from(set)
				// 持久化本地存储搜索关键词
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			clean(){
				this.historyList = []
				uni.setStorageSync('kw','[]')
			},
			gotoGoodList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+kw
				})
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list{
	padding:0 5px;
	
	.sugg-item{
		font-size: 12px;
		padding:13px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.goods-name{
			// 文字不允许换行
			white-space: nowrap;
			// 溢出部分隐藏
			overflow: hidden;
			// 文本溢出后，用...代替
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}
.history-box{
	padding: 0 5px;
	.history-title{
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		// 在必要的时候换行
		flex-wrap: wrap;
		
		.uni-tag{
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
