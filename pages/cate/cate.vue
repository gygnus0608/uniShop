<template>
	<view>
		<my-search @mysearch='gotoSearch'></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滚动视图区域 -->
			<scroll-view class="left-scroll-view" scroll-y :style="{height: wh +'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-view-item',index === active?'active':'']"
					@click="activeChanged(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<!-- 右侧滚动视图区域 -->
			<scroll-view scroll-y :style="{height: wh +'px'}" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item2,index2) in cateList2" :key="index2">
					<view class="cate-lv2-title">/{{item2.cat_name}}/</view>
					<!-- 动态渲染三级分类的列表数据 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon.replace('dev','web')"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0,
				// 分类数据列表
				cateList:[],
				cateList2:[],
				// 默认让第一项选中
				active:0,
				scrollTop:0
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50
			this.getCateList()
		},
		methods:{
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				// console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.cateList = res.message
				// 为二级分类赋值
				this.cateList2 = res.message[0].children
			},
			activeChanged(index){
				this.active = index
				// 为二级列表重新赋值
				this.cateList2 = this.cateList[index].children
				// 切换像素
				this.scrollTop = this.scrollTop === 0?1:0
			},
			gotoGoodsList(item3){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item3.cat_id
				})
			},
			gotoSearch(){
				// console.log(123)
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-view{
		width: 120px;
		
		.left-scroll-view-item{
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			
			&.active{
				background-color: #ffffff;
				position: relative;
				
				// 在active的元素前加一条小红杠
				&::before{
					position: absolute;
					content:'';
					display:block;
					width: 3px;
					height: 30px;
					background-color: #C00000;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
}
.cate-lv2-title{
	font-size: 12px;
	font-weight: bold;
	text-align:center;
	padding:15px 0;
}
.cate-lv3-list{
	display:flex;
	// 自动换行
	flex-wrap: wrap;
	
	.cate-lv3-item{
		width: 33.33%;
		display: flex;
	// 垂直显示
		flex-direction: column;
		// 水平垂直居中
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		image{
			width: 60px;
			height: 60px;
		}
		text{
			font-size: 12px;
		}
	}
}

</style>
