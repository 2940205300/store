<template>
	<div style="margin:20px">
		<Top></Top>
		<Welcome></Welcome>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<!-- 分类管理 -->
			<el-tab-pane label="分类管理" name="admcategory"> </el-tab-pane>
			<!-- 图书管理 -->
			<el-tab-pane label="图书管理" name="admgoods"> </el-tab-pane>
			<!-- 订单管理 -->
			<el-tab-pane label="订单管理" name="admorder"> </el-tab-pane>
		</el-tabs>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
import Top from "../../components/top.vue";
import Welcome from "../../components/welcome.vue";
export default {
	name: "",
	components: {
		Top,
		Welcome,
	},
// 	prop:{
// activeName:{
// 	default: "admc
// }
// 	},
	data() {
		return {
			activeName: "admcategory",
		};
	},
	computed: {},
	created() {},
	mounted() {},
	methods: {
		handleClick(tab) {
			this.$router.push({ name:tab.name});
			console.log( this.$route.path.split('/')[1])
		},
	},
};
</script>
<style scoped>
</style>

