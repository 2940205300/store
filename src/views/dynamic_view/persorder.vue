<!--
 * @Description: 
 * @Autor: deng
 * @Date: 2021-06-22 00:27:15
 * @LastEditors: deng
 * @LastEditTime: 2021-06-22 00:29:25
-->
<template>
  <div style="margin:20px">
     <Order :tableData="tableData" @cancel="Cancel" :visible="visible"></Order>
  </div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
import Order from '../../components/order.vue'
export default {
	name: "",
	inject: ["reload"],
	components: {Order},
	data() {
		return {
			_to: "",
			dialogFormVisibleForEdit: false,
			tableData: [],
            visible:false
		
		};
	},
	computed: {},
	created() {
		this._to = JSON.parse(localStorage.getItem("_to"));
		// console.log(this._to.address[0].u_id);
		axios
			.post("/api/personal/order", {
				u_id: this._to.data[0].u_id,
			})
			.then((res) => {
				this.tableData = res.data.data;
			});
	},
	mounted() {},
	methods: {
	Cancel({id,status}){//用户取消订单
    if (status == 2) {
				Message({
					message: "该订单已发货，您暂时不能取消订单",
					type: "error",
				});
				return;
			}
			if (status == 3) {
				Message({
					message: "该订单已取消",
					type: "error",
				});
				return;
			}
			if (status == 4) {
				Message({
					message: "该订单已完成",
					type: "warning",
				});
				return;
			}
			axios
				.patch("/api/personal/cancelorder", {
					id,
					status:3,
				})
				.then((res) => {
					Message({
						message: "该订单已取消",
						type: "warning",
					});
					this.reload();
					// console.log(res.data);
				});
  }
	},
};
</script>
<style scoped>
</style>

