<!--
 * @Description: 
 * @Autor: deng
 * @Date: 2021-06-22 00:20:53
 * @LastEditors: deng
 * @LastEditTime: 2021-06-22 00:28:54
-->


<template>
	<div style="margin: 20px">
		<!-- 添加地址 -->
		<el-button type="primary" round style="margin: 0 auto" @click="handleAdd"
			>添加分类</el-button
		>
		<el-dialog title="分类管理" :visible.sync="dialogFormVisibleForAdd">
			<el-form :model="handleEditform">
				<el-form-item label="分类名称 " :label-width="formLabelWidth">
					<el-input
						v-model="handleEditform.category_name"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleForAdd = false">取 消</el-button>
				<el-button type="primary" @click="AddOk">确 定</el-button>
			</div>
		</el-dialog>
		<el-table :data="tableData" style="width: 100%">
			<!-- 分类名称 -->
			<el-table-column label="分类" width="500">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.c_name }}</span>
				</template>
			</el-table-column>
			<!-- 操作 -->
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- 编辑 -->
					<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row.c_id, scope.row.c_name)"
						>编辑</el-button
					>
					<el-dialog title="分类管理" :visible.sync="dialogFormVisibleForEdit">
						<el-form :model="handleEditform">
							<el-form-item label="分类名称" :label-width="formLabelWidth">
								<el-input
									v-model="handleEditform.category_name"
									@blur="select_value(handleEditform.category_name)"
									@keyup.active.prevent="EditOk"
									autocomplete="off"
								></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer" class="dialog-footer">
							<el-button @click="dialogFormVisibleForEdit = false"
								>取 消</el-button
							>
							<el-button type="primary" @click="EditOk">确 定</el-button>
						</div>
					</el-dialog>
					<!-- 删除 -->
					<!-- <el-button
						style="margin-left: 20px"
						size="mini"
						type="danger"
						slot="reference"
						@click="handleDelete(scope.$index, scope.row.c_id)"
						>删除</el-button
					> -->
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import axios from "axios";
import { Message } from "element-ui";
import { login } from "../../utils";
export default {
	name: "",
	inject: ["reload"],
	components: {},
	data() {
		return {
			tableData: [],
			dialogFormVisibleForAdd: false,
			dialogFormVisibleForEdit: false,
			handleEditform: {
				category_name: "",
			},
			c_id: " ",
			c_name: "",
			formLabelWidth: "100px",
		};
	},
	computed: {},
	created() {},
	mounted() {
		axios.get("/api/admin/category").then((res) => {
			this.tableData = res.data.data;
		});
	},
	methods: {
		// 添加分类
		handleAdd() {
			this.dialogFormVisibleForAdd = true;
		},
		// 添加成功
		AddOk() {
			this.dialogFormVisibleForAdd = false;
			console.log(this.handleEditform.category_name);
			axios
				.post("/api/admin/addcategory", {
					c_name: this.handleEditform.category_name,
				})
				.then((res) => {
					this.reload();
				});
		},
		// 编辑
		handleEdit(index, id, name) {
			this.dialogFormVisibleForEdit = true;
			this.c_id = id;
			this.handleEditform.category_name = name;
		},
		// 编辑成功
		EditOk() {
			this.dialogFormVisibleForEdit = false;
			this.handleEditform.category_name = "";
			if (this.c_name == "") {
				Message({
					message: "内容不能为空",
					type: "warning",
				});
				return;
			}
			axios
				.get("/api/admin/updatecategory", {
					params: {
						c_id: this.c_id,
						c_name: this.c_name,
					},
				})
				.then((res) => {
					Message({
						message: "修改成功",
						type: "success",
					});
					this.reload();
				});
		},
		// 删除成功
		handleDelete(index, id) {
			console.log(id);
			axios
				.delete("/api/admin/deletecategory", {
					params: {
						c_id: id,
					},
				})
				.then((res) => {
					this.reload();
				});
		},
		// 编辑弹出表单
		select_value(val) {
			this.c_name = val;
		},
	},
};
</script>
<style scoped>
</style>

