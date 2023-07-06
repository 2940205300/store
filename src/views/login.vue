<template>
  <div>
    <div class="edu-content-new">
      <img class="login_img" :src="require('../assets/loginbaner.ed0ec75e.png')" 
      alt="加载失败">
      <el-form :model="form" ref="form" :rules="rules" 
	    label-width="100px">
        <label style="font-size:20px;margin-left:200px"><strong>登录</strong></label>
		<p v-html=""></p>
        <el-form-item label="用户名" prop="name" >
          <el-input
            v-model.trim="form.name"
            placeholder="用户名"
            style="width: 250px;float: left;"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            v-model="form.pass"
            show-password
            @keyup.enter.native="login"
            placeholder="密码"
            style="width: 250px;float: left;"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left:90px">
          <el-button type="primary" @click="login">登录</el-button>
           <p　style="color:#9e9e9e;font-size:12px">还没有账号? 去这里<a class='active' @click="register" href="#">注册</a></p> 
          <!-- <el-button type="primary" @click="register">注册</el-button> -->
        </el-form-item>
      </el-form>
      
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { login } from "../utils/index";
export default {
	name: "",
	components: {},
	data() {
		return {
			form: {
				name: "",
				pass: "",
			},
			rules: {
				name: [
					{ required: true, message: "请输入用户名", trigger: "blur" },
					{ min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" },
				],
				pass: [
					{ required: true, message: "请输入密码", trigger: "blur" },
					{ min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" },
				],
			},
		};
	},
	computed: {},
	created() {},
	mounted() {
		let validPassword = (rule, value, callback) => {
			let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/;
			if (!reg.test(value)) {
				callback(new Error("密码必须是由4-20位字母+数字组合"));
			} else {
				callback();
			}
		};
	},
	methods: {
		login() {
			login({
				name: this.form.name,
				pass: this.form.pass,
			});
		},
		register() {
			this.$router
				.push({
					path: "/register",
				})
				.catch(() => {});
		},
	},
};
</script>
<style scoped>
.edu-content-new {
	position: relative;
	top: 100px;
	left: 45%;
	width: 900px;
	height: 500px;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 2px 30px 0px rgb(0 0 0 / 10%);
	border-radius: 8px;
	margin-left: -416px;
}
.el-form {
	width: 550px;
	position: absolute;
	margin: 0 auto;
	top: 20%;
	left: 50%;
}
.login_img {
	height: 300px;
	width: 400px;
	margin-top: 100px;
	margin-left: 20px;
}
.active {
	color: tomato;
}
</style>
