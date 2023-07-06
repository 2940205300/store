<!--
 * @Description: 
 * @Autor: deng
 * @Date: 2021-06-14 20:25:22
 * @LastEditors: deng
 * @LastEditTime: 2021-06-22 00:29:39
-->

<template>
  <div style="margin:20px">
	  <!-- 添加地址 -->
    <el-button  type="primary" round style="margin:0 auto" @click="handleAdd">新增地址</el-button>
             <el-dialog title="地址" :visible.sync="dialogFormVisibleForAdd" >
                <el-form :model="handleEditform" :rules="rules" ref="handleEditform">
                  <el-form-item label="收货人" :label-width="formLabelWidth">
                    <el-input v-model="handleEditform.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="handleEditform.phone" autocomplete="off" maxlength="11" 
					v-on:input="handleEditform.phone=handleEditform.phone.replace(/[^\d]/g,'')" ></el-input>
                  </el-form-item>
                  <el-form-item label="收货地址" :label-width="formLabelWidth">
                    <el-input v-model="handleEditform.address" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleForAdd = false">取 消</el-button>
                  <el-button type="primary" @click="AddOk('handleEditform')">确 定</el-button>
                </div>
              </el-dialog>
   <el-table
    :data="tableData"
    style="width: 100%">
    <!-- 收货人 -->
    <el-table-column
      label="收货人"
      width="300">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.a_name }}</span>
      </template>
    </el-table-column>
    <!-- 联系方式 -->
    <el-table-column
      label="联系方式"
      width="300">
      <template slot-scope="scope">
            <span size="medium">{{ scope.row.a_phone }}</span>
        </el-popover>
      </template>
    </el-table-column>
    <!-- 地址 -->
    <el-table-column
      label="收货地址"
      width="400">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.a_address }}</span>
      </template>
    </el-table-column>
    <!-- 操作 -->
    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index,scope.row.a_id, scope.row.a_name, scope.row.a_phone, scope.row.a_address)">编辑</el-button>
          <el-dialog title="地址" :visible.sync="dialogFormVisibleForEdit"> 
                <el-form :model="handleEditform">
                  <el-form-item label="收货人" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="handleEditform.name" autocomplete="off" ></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="handleEditform.phone" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="收货地址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="handleEditform.address" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleForEdit = false">取 消</el-button>
                  <el-button type="primary" @click="EditOk">确 定</el-button>
                </div>
              </el-dialog> 	  
        <el-button
		style="margin-left:20px"
          size="mini"
          type="danger"
          slot="reference"
          @click="handleDelete(scope.$index, scope.row.a_id)">删除</el-button>
          
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { login } from "../../utils";
import { Message } from "element-ui";
export default {
	name: "",
	inject: ["reload"],
	components: {},
	data() {
		return {
			_to: null,
			tableData: [],
			currentRow: null,
			dialogFormVisibleForEdit: false,
			dialogFormVisibleForAdd: false,
			// 添加
			handleEditform: {
				a_id: "",
				name: "",
				phone: "",
				address: "",
			},
			rules: {
				name: [
					{ required: true, message: "请输入收货人姓名", trigger: "blur" },
				],
				phone: [
					{ require: true, message: "请输入收货人联系方式", trigger: "blur" },
					{
						max: 11,
						message: "手机号码输入不正确",
						trigger: "blur",
					},
				],
				address: [
					{
						require: true,
						message: "请输入收货人地址",
						trigger: "blur",
					},
				],
			},
			formLabelWidth: "100px",
		};
	},
	computed: {},
	created() {
		this._to = JSON.parse(localStorage.getItem("_to"));
		// console.log(this._to.data[0].u_id);
	},
	mounted() {
		this.$axios("/api/personal/address", {
			params: {
				user: this._to.data[0].u_name,
			},
		}).then((res) => {
			this.tableData = res.data.data;
			// console.log(this.tableData);
		});
	},
	methods: {
		// 编辑
		handleEdit(index, a_id, name, phone, address) {
			this.dialogFormVisibleForEdit = true;
			this.handleEditform.name = name;
			this.handleEditform.a_id = a_id;
			this.handleEditform.phone = phone;
			this.handleEditform.address = address;
		},
		// 编辑确定
		EditOk() {
			this.dialogFormVisibleForEdit = false;
			axios
				.put("/api/personal/updateAddAddress", {
					data: this.handleEditform,
				})
				.then((res) => {
					// console.log("编辑成功");
					this.reload();
				});
		},
		// 添加
		handleAdd() {
			this.dialogFormVisibleForAdd = true;
			this.handleEditform = {};
		},
		// 添加确定
		AddOk(handleEditform) {
			this.dialogFormVisibleForAdd = false;
			this.$refs[handleEditform].validate((valid) => {
				//开启校验
				if (
					this.$refs[handleEditform].model.name == undefined ||
					this.$refs[handleEditform].model.address == undefined ||
					this.$refs[handleEditform].model.phone == undefined
				) {
					// 如果校验通过，请求接口，允许提交表单
					Message({
						message: "新增地址失败，信息填写不完整",
						type: "error",
					});
					return false;
				} else {
					axios
						.post("/api/personal/AddAddress", {
							name: this.handleEditform.name,
							address: this.handleEditform.address,
							phone: this.handleEditform.phone,
							u_id: this._to.data[0].u_id,
						})
						.then((res) => {
							// 回调获取更新之后的DOM再渲染出去;
							this.reload();
						});
				}
			});
		},
		// 删除
		handleDelete(index, id) {
			this.$confirm("确定删除该地址吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					axios
						.delete("/api/personal/deleteAddAddress", {
							params: {
								a_id: id,
							},
						})
						.then((res) => {
							this.reload();
							this.$message({
								type: "success",
								message: "删除成功!",
							});
						});
				})
				.catch(() => {
					this.$message({
						type: "warning",
						message: "已取消删除",
					});
				});
		},
	},
};
</script>
<style scoped>
</style>
