<template>
	<div class="limi">
		<div class="welcome">
			<div class="wel">
				<span>欢迎光临书香阁</span>
				<a href="#" @click.prevent="index">首页</a>
			</div>
			<div class="wel">
				<span>{{ user }}</span>
				<a @click="GoTo">{{ permission }}</a>
				<a @click="logout">退出</a>
			</div>
		</div>
	</div>
</template>

<script>
import { logout } from "../utils/index";
export default {
	components: {},
	data() {
		return {
			user: "",
			permission: "",
			newuser: {},
		};
	},
	computed: {},
	created() {},

	mounted() {
		let user = JSON.parse(localStorage.getItem("_to")) || [];
		this.user = user.data[0].u_name;
		if (this.user == "admin") {
			this.permission = "我的管理";
		} else {
			this.permission = "个人中心";
		}
	},
	methods: {
		// 退出
		logout() {
			logout();
		},
		// 首页
		index() {
			this.$router.push({
				name: "index",
			});
		},
		// admin账号：我的管理
		GoTo() {
			if (this.permission == "我的管理") {
				this.$router.push({ path: "/admin" });
			} else {
				this.$router.push({ path: "/personal" });
			}
		},
	},
};
</script>
<style scoped>
.limi {
	margin: 0 auto;
	width: 1000px;
	margin-top: 20px;
}
.welcome {
	color: #666666;
	margin-bottom: 20px;
	display: flex;
	justify-content: space-between;
	font-size: 12px;
}
a {
	text-decoration: none;
	color: #666666;
}
.wel {
	width: 200px;
	display: flex;
	justify-content: space-around;
}
</style>
