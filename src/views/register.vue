<template>
  <div>
    <div class="edu-content-new">
        <img class="login_img" :src="require('../assets/loginbaner.ed0ec75e.png')" 
      alt="加载失败">
      <el-form :model="form" :rules="rules" label-width="100px" ref="form">
        <label style="font-size:20px;margin-left:200px"><strong>注册</strong></label>
		<p v-html=""></p>
        <el-form-item label="用户名" prop="name">
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
            @keyup.enter="login"
            placeholder="密码"
             style="width: 250px;float: left;"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left:90px">
          <el-button type="primary" @click="register('form')">注册</el-button>
           <p　style="color:#9e9e9e;font-size:12px">已有账号 去这里<a class='active' @click="login" href="#">登录</a></p> 
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, register } from "../utils/index";
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
					{
						min: 5,
						max: 8,
						message: "为了您的账号安全，建议您的密码长度在 5 到 8 个字符",
						trigger: "blur",
					},
					{
						pattern: /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{5,8}/,
						message: "密码为数字，小写字母，长度为 5-8位",
					},
				],
			},
		};
	},
	computed: {},
	created() {},
	mounted() {},
	methods: {
		register(form) {
			// 1 在表单中绑定ref=formData :model=formData绑定的数据
			// 2 在点击时传递 @click=submit('formData')
			// 3就是下面写的
			this.$refs[form].validate((valid) => {
				//开启校验
				if (valid) {
					// 如果校验通过，请求接口，允许提交表单
					register({
						name: this.form.name,
						pass: this.form.pass,
					});
				} else {
					//校验不通过
					return false;
				}
			});
		},
		login() {
			this.$router
				.push({
					path: "/login",
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
.el-input__inner {
	width: 200%;
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
