<template>
  <div>
      <div style="margin:20px">
      <el-table
    :data="tableData"
    style="width: 100%">
    <!-- 商品名称 -->
    <el-table-column
      label="商品名称"
      width="200">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.g_name }}</span>
      </template>
    </el-table-column>
    <!-- 收货人 -->
    <el-table-column
      label="收货人"
      width="130">
      <template slot-scope="scope">
            <span size="medium">{{ scope.row.o_name }}</span>
        </el-popover>
      </template>
    </el-table-column>
    <!-- 联系方式 -->
    <el-table-column
      label="联系方式"
      width="150">
      <template slot-scope="scope">
            <span size="medium">{{ scope.row.o_phone }}</span>
        </el-popover>
      </template>
    </el-table-column>
      <!-- 地址 -->
    <el-table-column
      label="收货地址"
      width="200">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.o_address }}</span>
      </template>
    </el-table-column>
      <!-- 订单创建时间 -->
    <el-table-column
      label="订单创建时间"
      width="180">
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.o_time }}</span>
      </template>
    </el-table-column>
    <!-- 订单状态 -->
    <el-table-column
      label="订单状态"
      width="100">
      <template slot-scope="scope">
            <span size="medium">
              {{ 
              scope.row.o_status==1
              ?"未发货"
              : scope.row.o_status==2
              ?"已发货"
              : scope.row.o_status==3
              ?"已取消"
              :scope.row.o_status==4
              ?"已完成"
              :""
               }}</span>
        </el-popover>
      </template>
    </el-table-column>
    <!-- 操作 -->
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="ViewDetails(scope.$index,scope.row)">查看详情</el-button>
           <el-dialog title="订单详情" :visible.sync="dialogFormVisibleForEdit"> 
                <el-form :model="handleEditform" :disabled="true">
                  <el-form-item label="订单号" :label-width="formLabelWidth">
                    <el-input v-model="handleEditform.o_id" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="图书名称" :label-width="formLabelWidth">
                    <el-input v-model="handleEditform.g_name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="收货人" :label-width="formLabelWidth">
                    <el-input v-model="handleEditform.a_address" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input v-model="handleEditform.a_phone" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="订单创建时间" :label-width="formLabelWidth">
                    <el-input v-model="handleEditform.o_time" autocomplete="off"></el-input>
                  </el-form-item >
                    <!-- 下单用户 -->
                   <el-form-item label="下单用户" v-show="visible" :label-width="formLabelWidth">
                   <el-input v-model="handleEditform.u_name"  autocomplete="off" ></el-input>
                  </el-form-item>
                  <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="handleEditform.o_remark" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button  @click="dialogFormVisibleForEdit = false">确 定</el-button>
                </div>
              </el-dialog> 
          <!-- 设置发货 -->
         <el-button v-show="visible"
        style="margin-left:10px"
          size="mini"
          type="danger"
          slot="reference"
           @click="SetDelivery(scope.$index, scope.row.o_id,scope.row.o_status)">设置发货</el-button>  
           <!-- 取消 -->
        <el-button
        style="margin-left:10px"
          size="mini"
          type="danger"
          slot="reference"
           @click="CancelOrder(scope.$index, scope.row.o_id,scope.row.o_status)">取消订单</el-button>
          <!-- 完成 -->
        <el-button
        v-show="visible"
        style="margin-left:10px"
          size="mini"
          type="danger"
          slot="reference"
           @click="finished(scope.$index, scope.row.o_id,scope.row.o_status)">完成</el-button>
           
      </template>
    </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
export default {
	name: "",
	inject: ["reload"],
	props: ["tableData", "visible"],
	components: {},
	data() {
		return {
			dialogFormVisibleForEdit: false,
			formLabelWidth: "100px",
			handleEditform: {
				o_id: "",
				g_name: "",
				a_address: "",
				a_phone: "",
				o_remark: "",
				o_time: "",
        u_name:""
			},
		};
	},
	computed: {},
	created() {},
	mounted() {},
	methods: {
		// 查看详情
		ViewDetails(index, row) {
			this.dialogFormVisibleForEdit = true;
			this.handleEditform.o_id = row.o_id;
			this.handleEditform.g_name = row.g_name;
			this.handleEditform.a_address = row.o_address;
			this.handleEditform.a_phone = row.o_phone;
			this.handleEditform.o_remark = row.o_remark;
			this.handleEditform.o_time = row.o_time;
			this.handleEditform.u_name = row.u_name;
		},
		// 设置发货
		SetDelivery(index, id, status) {
			this.$emit("setdelivery", { id, status });
		},
		// 取消订单
		CancelOrder(index, id, status) {
			this.$emit("cancel", { id, status });
		},
		// 完成
		finished(index, id, status) {
			this.$emit("finish", { id, status });
		},
	},
};
</script>
<style scoped>
</style>
