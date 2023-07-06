<template>
	<div style="margin:20px">
		<Top></Top>
		<Welcome></Welcome>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<!-- 地址管理 -->
			<el-tab-pane label="地址管理" name="persaddress"> </el-tab-pane>
			<!-- 订单管理 -->
			<el-tab-pane label="订单管理" name="persorder"> </el-tab-pane>
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
	data() {
		return {
			activeName: "persaddress",
		};
	},
	computed: {},
	created() {},
	mounted() {
		// 不在当前页面刷新
		this.$router.replace({name:'persaddress'})
	},
	methods: {
		handleClick(tab, event) {
			this.$router.push({ name: tab.name });
			// console.log(tab.name, event);
		},
	},
};
</script>
<style scoped>
</style>
