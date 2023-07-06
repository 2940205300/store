<template>
	<div class="imglist">
		<img
			:src="`${loc}${detail.g_img}`"
			style="width: 150px; height: 210px"
			alt="加载失败"
		/>
		<div class="right">
			<a style="font-size: 20px">{{ detail.g_name }}</a>
			<p style="font-size: 12px; color: #9e9e9e">
				<span style="margin-right: 12px">作者：{{ detail.g_author }}</span>
				<span style="margin-right: 12px"
					>字数：{{ detail.g_font_num }}万字</span
				>
				<span>出版社：{{ detail.g_press }}</span>
			</p>
			<p>
				<span
					class="be"
					style="font-size: 20px; color: red; margin-right: 20px"
					>{{ detail.g_price }}</span
				>
				<el-button @click="shop()" type="danger" style="margin-right: 20px"
					>立即购买</el-button
				>
				<el-select
					placeholder="请选择收货地址"
					v-model="form.value"
					style="margin-right: 20px"
					@change="select_value"
				>
					<el-option
						v-for="item in addresss"
						:key="item.a_id"
						:value="`${item.a_address}`"
					>
					</el-option>
				</el-select>
				<label style="font-size: 12px; color: #c0c0c0"
					>还没有地址? 点击<a @click="addAddress" style="color: tomato">这里</a
					>添加地址</label
				>
			</p>
			<div>
				<!-- 图书简介 -->
				<span style="font-size: 12px">
					{{ detail.g_info }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { Message } from "element-ui";
import axios from "axios";
export default {
	props: ["detail"],
	inject: ["reload"],
	components: {},
	data() {
		return {
			loc: `http://127.0.0.1:3000/assets/uploads/images/`,
			_to: [],
			form: {
				value: "",
				name: "",
				phone: "",
			},
			addresss: [], //下拉地址框
		};
	},
	computed: {},
	created() {
		this._to = JSON.parse(localStorage.getItem("_to"));
		axios
			.post("/api/personal/shop", { u_id: this._to.data[0].u_id })
			.then((res) => {
				this.addresss = res.data.data;
				// console.log(this.address);
			});
	},
	mounted() {},
	methods: {
		// 添加地址
		addAddress() {
			// console.log(this.$router);
			this.$router.push({
				path: "/personal",
			});
		},
		// 提交订单
		shop() {
			if (this.value == "") {
				Message({
					message: "请选择收货地址",
					type: "warning",
				});
				return;
			}
			axios
				.post("/api/personal/addorder", {
					u_id: this._to.data[0].u_id,
					g_id: this.detail.g_id,
					o_name: this.form.name,
					o_phone: this.form.phone,
					o_address: this.form.value,
				})
				.then((res) => {
					this.$notify({
						title: "成功",
						message: "提交订单成功",
						type: "success",
					});
				});
		},
		//  下拉框chang事件,过滤器
		select_value(val) {
			let obj = this.addresss.filter((item) => {
				return item.a_address == val; //过滤数组对象中的
				// 	// val是下拉选择框选中的值  item.address是option的value值
			});
			this.form.name = obj[0].a_name; //过滤数据，按钮不在for循环里，也可以拿到值
			this.form.phone = obj[0].a_phone;
			this.form.value = val;
		},
	},
	watch: {
		value: {
			handler(val) {
				//  console.log(val);
			},
		},
	},
};
</script>
<style scoped>
.imglist {
	/* height: 260px; */
	margin-top: 30px;
	display: flex;
	justify-content: space-around;
}
img {
	box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);
}
/* .imglist:hover {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);
} */
.right {
	width: 800px;
	display: flex;
	flex-direction: column;
}
.right > h3 {
	font-weight: normal;
}
a {
	font-family: "Microsoft Yahei", arial, sans-serif;
}
a:hover {
	color: tomato;
}
.be::before {
	content: "￥";
	color: red;
	font-size: 12px;
}
</style>
