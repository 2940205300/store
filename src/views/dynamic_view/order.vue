<!--
 * @Description: 
 * @Autor: deng
 * @Date: 2021-06-22 00:22:11
 * @LastEditors: deng
 * @LastEditTime: 2021-06-22 00:28:59
-->

<template>
	<div style="margin: 20px">
		<Order
			:tableData="tableData"
			:visible="visible"
			@finish="Finish"
			@setdelivery="SetDelivery"
			@cancel="CancelOrder"
		></Order>
	</div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
import Order from "../../components/order.vue";
export default {
	name: "",
	inject: ["reload"],
	components: { Order },
	data() {
		return {
			tableData: [],
			visible: true,
		};
	},
	computed: {},
	created() {},
	mounted() {
		axios.get("/api/admin/order").then((res) => {
			this.tableData = res.data.data;
		});
	},
	methods: {
		// 设置发货  ==2
		SetDelivery( {id, status}) {
			axios
				.patch("/api/personal/cancelorder", {
					id:id,
					status: 2,
				})
				.then((res) => {
					Message({
						message: "已设置发货",
						type: "success",
					});
					console.log(this.$route.name);
					this.reload();

					// console.log(res.data);
				});
		},
		// 取消订单 ==3
		CancelOrder({id, status}) {
			axios
				.patch("/api/personal/cancelorder", {
					id:id,
					status: 3,
				})
				.then((res) => {
					Message({
						message: "已取消订单",
						type: "success",
					});
					this.reload();
				});
		},
		// 完成 ==4
		Finish( {id, status}) {
			axios
				.patch("/api/personal/cancelorder", {
					id:id,
					status: 4,
				})
				.then((res) => {
					Message({
						message: "已完成",
						type: "success",
					});
					this.reload();
				});
		},
	},
};
</script>
<style scoped>
</style>

