<template>
	<div style="background: #f4f1f1; position: relative">
		<Top></Top>
		<Welcome></Welcome>
		<!-- 顶部 -->
		<div class="limi">
			<el-row
				:gutter="0"
				type="flex"
				justify="space-between"
				style="align-items: center">
				<li
					v-for="(item, index) in ClassListData"
					:key="index"
					:label="item.c_name"
					@click="TabClick(item.c_name, index)">
						<router-link
							:class="listindex === index ? 'active' : 'off'"
							:to="`/index`"
							>{{ item.c_name }}</router-link>
				</li>

				<!-- 搜索 -->
				<div>
					<div style="display: flex">
						<el-input
							v-model.trim="input"
							placeholder="请输入书名或作者"
							@keyup.enter.native="search"
						></el-input>
						<el-button @click="search" type="primary" icon="el-icon-search"
							>搜索</el-button
						>
					</div>
				</div>
			</el-row>
			<!-- 轮播图 -->
			<Swiper></Swiper>
			<!-- 轮播图结束-->
			<div style="margin-top: 40px">
				<!-- limi限制宽结束 -->
				<!--下面的精选图书 -->
				<h4>精选图书</h4>
				<hr />

				<Detail :detail="detail" v-if="detail"></Detail>
				<List
					:BooksList="BooksList"
					:sorry="sorry"
					@ClickDetail="GoDetail"
					v-else
				></List>
			</div>
		</div>
		<!-- limi结束 -->
		<!-- <router-view></router-view> -->
		<Bot></Bot>
	</div>
</template>

<script>
import Top from "../components/top";
import Welcome from '../components/welcome.vue'
import Swiper from "../components/swiper";
import List from "../components/index_list";
import Detail from "../components/detail.vue";
import Bot from "../components/bot";
import  {ClassList, login }from '../utils/index'


export default {
	name: "",
	components: {
		Top,
		Swiper,
		List,
		Bot,
		Detail,
		Welcome
	},
	data() {
		return {
			input: "",
			sorry: false,
			listindex: 0,
			BooksList: [],
			ClassListData: [],
			detail: "",
		};
	},
	computed: {},
	created() {
		// 精选图书
		this.$axios("/api").then((res) => {
			this.BooksList = res.data.data;
			// console.log(this.BooksList);
		});
		// 分类
		this.$axios({
			url: "/api/index",
		}).then((res) => {
			this.ClassListData = res.data.data;
		});

		
		
	},
	mounted() {
	},
	methods: {
		// 搜索
		search() {
			this.detail = "";
			this.$axios("/api/index/list", {
				params: {
					name: this.input,
				},
			}).then((res) => {
				if (res.data.length > 0) {
					this.BooksList = res.data;
					this.sorry = false;
					// 第一遍查询为空，再查有数据还是会显示sorry
				} else {
					this.BooksList = "";
					this.sorry = true;
				}
			});
		},
	    // 类别路由高亮
		TabClick(name, index) {
			this.listindex = index;
			this.sorry = false;
			this.detail = "";
			this.$router.push({path:'index',query:{type:name}})
			this.$axios("/api/index/list", {
				params: {
					type: name,
				},
			}).then((res) => {
				this.BooksList = res.data;
			});
		},	
		// 详情
		GoDetail(data) {
			// console.log(data);
			// console.log(data.g_id);
			this.detail = data;
			this.$router.push({path:'index',query:{id:data.g_id}})
			
		},
	},
	watch:{
		$route:{
			handler(val){
			}
		}
	},

};
</script>
<style scoped>
/* 选中当前路由的颜色 */
.active {
	color: tomato;
}
.off {
	color: #000;
}
li,
a {
	text-decoration: none;
	list-style: none;
	color: #000;
}
li:hover {
	cursor: pointer;
}
.limi {
	margin: 0 auto;
	width: 1000px;
	margin-top: 20px;
}
img {
	width: 100%;
	height: 100%;
}

.grid-content {
	min-height: 36px;
	margin: 2px -1px 5px 2px;
}
.m {
	margin-top: 10px;
}

</style>

