<!--
 * @Description: 
 * @Autor: deng
 * @Date: 2021-06-22 00:21:37
 * @LastEditors: deng
 * @LastEditTime: 2021-06-22 00:28:45
-->
<template>
	<div style="margin: 20px; overflow: auto">
		<!-- 添加 -->
		<el-button type="primary" round style="margin: 0 auto" @click="handleAdd"
			>添加</el-button
		>
		<!-- 添加表单 -->
		<el-dialog title="商品管理" :visible.sync="dialogFormVisibleForAdd">
			<el-form :model="AddEditform" ref="AddEditform">
				<!-- 图书名称 -->
				<el-form-item label="图书名称 " :label-width="formLabelWidth">
					<el-input v-model="AddEditform.name" autocomplete="off"></el-input>
				</el-form-item>
				<!-- 图书分类 -->
				<el-form-item label="图书分类  " :label-width="formLabelWidth">
					<el-select
						@change="select_value"
						v-model="select_val"
						style="margin-right: 20px"
					>
						<el-option
							v-for="item in ClassName"
							:key="item.c_id"
							:value="item.c_name"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<!-- 售价 -->
				<el-form-item label="售价" :label-width="formLabelWidth">
					<el-input v-model="AddEditform.price" autocomplete="off"></el-input>
				</el-form-item>
				<!--作者 -->
				<el-form-item label="作者" :label-width="formLabelWidth">
					<el-input v-model="AddEditform.author" autocomplete="off"></el-input>
				</el-form-item>
				<!--出版社 -->
				<el-form-item label="出版社" :label-width="formLabelWidth">
					<el-input v-model="AddEditform.press" autocomplete="off"></el-input>
				</el-form-item>
				<!--出版时间 -->
				<el-form-item label="出版时间" :label-width="formLabelWidth">
					<el-date-picker
						v-model="AddEditform.time"
						type="date"
						placeholder="选择日期"
					>
					</el-date-picker>
				</el-form-item>
				<!--字数 -->
				<el-form-item label="字数" :label-width="formLabelWidth">
					<el-input v-model="AddEditform.fontnum" autocomplete="off"></el-input>
				</el-form-item>
				<!--图书简介 -->
				<el-form-item label="简介" :label-width="formLabelWidth">
					<el-input
						type="textarea"
						:rows="5"
						v-model="AddEditform.info"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<!-- 上传图片 -->
				<el-form-item label="上传图片" :label-width="formLabelWidth">
					<el-upload
						action="http://127.0.0.1:3000/api/admin/order"
						list-type="picture-card"
						accept="image/jpeg,image/jpg,image/png"
						:limit="1"
						:auto-upload="false"
						:on-change="handleChange"
						:before-upload="beforeUpload"
					>
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="AddEditform.imageUrl" alt="" />
					</el-dialog>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleForAdd = false">取 消</el-button>
				<el-button type="primary" @click="AddOk('AddEditform')"
					>确 定</el-button
				>
			</div>
		</el-dialog>
		<el-table :data="tableData" style="width: 100%">
			<!--缩略图-->
			<el-table-column label="缩略图" width="200">
				<template slot-scope="scope">
					<span style="margin-left: 10px; display: block">
						<viewer :images="srcList">
							<img
								style="width: 90px; height: 110px"
								v-lazy="
									`http://127.0.0.1:3000/assets/uploads/images/${scope.row.g_img}`
								"
								alt=""
								@click="show"
							/>
						</viewer>
					</span>
				</template>
			</el-table-column>
			<!--图书名称-->
			<el-table-column label="图书名称" width="240">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.g_name }}</span>
				</template>
			</el-table-column>
			<!--作者-->
			<el-table-column label="作者" width="230">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.g_author }}</span>
				</template>
			</el-table-column>
			<!--价格-->
			<el-table-column label="价格" width="230">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.g_price }}</span>
				</template>
			</el-table-column>
			<!--出版社-->
			<el-table-column label="出版社" width="230">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.g_press }}</span>
				</template>
			</el-table-column>
			<!-- 操作 -->
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- 编辑 -->
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
						>编辑</el-button
					>
					<!-- 删除 -->
					<el-button
						style="margin-left: 20px"
						size="mini"
						type="danger"
						slot="reference"
						@click="handleDelete(scope.row.g_id, scope.row.g_img)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
		<!-- 编辑表单  -->
		<el-dialog title="商品管理" :visible.sync="dialogFormVisibleForEdit">
			<el-form :model="handleEditform">
				<!-- 图书名称 -->
				<el-form-item label="图书名称 " :label-width="formLabelWidth">
					<el-input v-model="handleEditform.name" autocomplete="off"></el-input>
				</el-form-item>
				<!-- 图书分类 -->
				<el-form-item label="图书分类  " :label-width="formLabelWidth">
					<el-select
						@change="select_value"
						v-model="handleEditform.category"
						style="margin-right: 20px"
					>
						<el-option
							v-for="item in ClassName"
							:key="item.c_id"
							:value="item.c_name"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<!-- 售价 -->
				<el-form-item label="售价" :label-width="formLabelWidth">
					<el-input
						v-model="handleEditform.price"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<!--作者 -->
				<el-form-item label="作者" :label-width="formLabelWidth">
					<el-input
						v-model="handleEditform.author"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<!--出版社 -->
				<el-form-item label="出版社" :label-width="formLabelWidth">
					<el-input
						v-model="handleEditform.press"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<!--出版时间 -->
				<el-form-item label="出版时间" :label-width="formLabelWidth">
					<el-date-picker
						v-model="handleEditform.time"
						type="date"
						placeholder="选择日期"
					>
					</el-date-picker>
				</el-form-item>
				<!--字数 -->
				<el-form-item label="字数" :label-width="formLabelWidth">
					<el-input
						v-model="handleEditform.fontnum + '万字'"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<!--图书简介 -->
				<el-form-item label="简介" :label-width="formLabelWidth">
					<el-input
						type="textarea"
						:rows="5"
						v-model="handleEditform.info"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<!-- 图片 -->
				<el-form-item label="图片" :label-width="formLabelWidth">
					<el-upload
						action="http://127.0.0.1:3000/api/admin/order"
						list-type="picture-card"
						accept="image/jpeg,image/jpg,image/png"
						:limit="1"
						:auto-upload="false"
						:on-change="handleChange"
						:before-upload="beforeUpload"
					>
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog>
						<img width="100%" :src="handleEditform.imageUrl" alt="" />
					</el-dialog>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleForEdit = false">取 消</el-button>
				<el-button type="primary" @click="EditOk">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "",
	inject: ["reload"],
	components: {},
	data() {
		return {
			tableData: [],
			fits: "fill",
			srcList: [], //图片预览路径
			dialogFormVisibleForAdd: false, //添加
			dialogFormVisibleForEdit: false, //编辑
			formLabelWidth: "100px",
			ClassName: [], //分类列表
			//添加
			AddEditform: {
				name: "",
				category: "",
				price: "",
				author: "",
				press: "",
				time: "",
				fontnum: "",
				info: "",
				imageUrl: "",
				file: "",
			},
			// 编辑
			handleEditform: {
				id: "",
				name: "",
				category: "",
				price: "",
				author: "",
				press: "",
				time: "",
				fontnum: "",
				info: "",
				imageUrl: "",
				file: "",
				old_imgfile:"",//如果没有上传，就把原来的图片的路径传上去
			},
			dialogVisible: false,
			arr: [],
			formData: {},
			select_val: "",//相当于是下拉选择的id值
		};
	},
	computed: {},
	created() {
		axios.get("/api/admin/category").then((res) => {
			this.ClassName = res.data.data;
		});

		axios.get("/api/admin/goods").then((res) => {
			this.tableData = res.data.data;
			// let arr=[]
			arr = res.data;
			// console.log(arr.length);
			// if (arr.length > 10) {
			// 	this.tableData = [];
			// 	this.tableData = tableData.slice(0, 10);
			// 	setTimeout(function () {
			// 		for (let i = 11; i < tableData.length; i++) {
			// 			this.tableData.push(tableData[i]);
			// 		}
			// 	},1000);
			// } else {
			// 	this.tableData = tableData;
			// }

			// 图片预览
			let arr = [];
			for (let i = 0; i < this.tableData.length; i++) {
				arr.push(
					"http://127.0.0.1:3000/assets/uploads/images/" +
						this.tableData[i].g_img
				);
			}
			this.srcList = arr;
		});
	},
	mounted() {},

	getDrawerTableList(data) {
		// console.log(data);
	},
	methods: {
		// 添加
		handleAdd() {
			this.dialogFormVisibleForAdd = true;
		},
		// 点击图片预览ok
		show() {
			this.$viewerApi({
				images: this.srcList, //srcList是个数组,里面不包含对象
			});
		},
		// 上传图片
		OnProgress(handleEAddEditformditform) {},
		// 删除
		handleDelete(id, img) {
			this.$confirm("删除后不能恢复，确定要删除吗？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					// console.log("发送删除请求");
					axios
						.delete("/api/admin/deletegoods", {
							params: {
								id: id,
								img: img,
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
		// 编辑
		handleEdit(index, row) {
			// console.log(row);
			this.handleEditform.time = new Date();//不选时间默认为今天
			this.dialogFormVisibleForEdit = true;
			this.handleEditform.id = row.g_id; //id
			this.handleEditform.name = row.g_name; //书名
			this.handleEditform.category = row.c_name; //分类
			this.handleEditform.price = row.g_price; //价格
			this.handleEditform.author = row.g_author; //作者
			this.handleEditform.press = row.g_press; //出版社
			this.handleEditform.time = row.g_time; //出版时间
			this.handleEditform.fontnum = row.g_fontnum; //字数
			this.handleEditform.info = row.g_info; //简介
			this.handleEditform.imageUrl = row.g_img; //图片
			this.handleEditform.old_imgfile = row.g_img; //没上传就用原来的路径
			// 为了解决不触发change事件就默认为空会报错的情况
			let obj = this.ClassName.filter((item) => {
				return item.c_name == row.c_name;
			});
			this.AddEditform.category = obj[0].c_id;
			console.log(row.g_img);
		},
		// 编辑确定
		EditOk() {
			// console.log(this.AddEditform.category);
			let formData = new FormData();
			formData.append("g_id", this.handleEditform.id);
			formData.append("imgfile", this.file);
			formData.append("g_name", this.handleEditform.name);
			formData.append("c_id", this.AddEditform.category);
			formData.append("g_price", this.handleEditform.price);
			formData.append("g_author", this.handleEditform.author);
			formData.append("g_press", this.handleEditform.press);
			formData.append("g_img", this.handleEditform.imageUrl);
			// formData.append("old_imgfile",this.handleEditform.old_imgfile );
			formData.append(
				"g_time",
				this.moment(this.handleEditform.time).format("YYYY-MM-DD")
			);
			formData.append("g_fontnum", this.handleEditform.fontnum);
			formData.append("g_info", this.handleEditform.info);
			// for (var [key, value] of formData.entries()) {
			// 	console.log(key, value);
			// }
			axios
				.post("/api/admin/updategoods", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					this.dialogFormVisibleForEdit = false;
					this.reload();
					// console.log(res.data);
				});
		},
		//换一张图
		handleChange(file, fileList) {
			// this.AddEditform.imageUrl = URL.createObjectURL(file.raw);
			this.file = file.raw;
		},
		//上传之前
		beforeUpload(file) {
			// this.imageUrl = URL.createObjectURL(file.raw);
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error("上传图片大小不能超过 2MB!");
			}
			return isLt2M;
		},
		// 添加时过滤分类出c_id
		select_value(val) {
			let obj = this.ClassName.filter((item) => {
				return item.c_name == val;
			});
			this.AddEditform.category = obj[0].c_id;
			this.select_val = obj[0].c_name;
			// console.log(this.AddEditform.category);
			// console.log(this.select_val);
		},
		// 添加成功
		AddOk() {
			let formData = new FormData();
			formData.append("imgfile", this.file);
			formData.append("g_name", this.AddEditform.name);
			formData.append("c_id", this.AddEditform.category);
			formData.append("g_price", this.AddEditform.price);
			formData.append("g_author", this.AddEditform.author);
			formData.append("g_press", this.AddEditform.press);
			formData.append(
				"g_time",
				this.moment(this.AddEditform.time).format("YYYY-MM-DD")
			);
			formData.append("g_fontnum", this.AddEditform.fontnum);
			formData.append("g_info", this.AddEditform.info);
			axios
				.post("/api/admin/addgoods", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					this.dialogFormVisibleForAdd = false;
					this.reload();
					// console.log(res.data);
				});
		},
	},
};
</script>
<style scoped>
</style>
