
import axios from 'axios'
import router from '../router/index'
import store from '../store/index'
import md5 from 'js-md5'
import { get } from './http'
import { Message } from "element-ui"
import Vue from 'vue'
let v = new Vue()

// 权限axios
export function permission() {
      return get('/api/permission', params({ user: store.state.UserToken }))
}

// 登录axios
/**
 * @param {name,pass} data 
 */
export function login(data) {
      const { name, pass } = data
      const pwd = md5(pass + pass);
      // console.log(md5(pwd+'3344'));
      axios.post("/api/login", { name, pwd })
            .then((res) => {
                  //   本地 vuex
                  console.log(res.data);
                  console.log("接收到200");
                  console.log(res.data.code)

                  if (res.data.code ==200) { // 数据库查不到走进res=undefined 返回的code是500
                        Message({
                              message: "用户存在",
                              type: "success",message:""
                        });
                        store.commit("LOGIN", res.data);
                              router.push({
                                    path: "/index",
                              });
                        return 
                  }
                   // 数据库查不到走进res=undefined 返回的code是500
                 if (res.data.code ==201) { // 数据库查不到走进res=undefined 返回的code是500
                        
                        Message({
                              message: "该用户不存在,请检查您的用户名和密码是否输入正确",
                              type: "error"
                        })
                        return
                  }else {
                        Message({
                              message: "服务器错误",
                              type: "error"
                        })
                        return
                  }
            });
}
// 注册axios
export function register(data) {
      const { name, pass } = data
      if (name === "" || pass === "") {
            Message({
                  message: "您输入的用户名或密码为空！！！",
                  type: "error"
            });
      } else {
            const pwd = md5(pass + pass)
            axios.post('/api/register', { name, pwd })
                  .then(res => {
                        Message({
                              message: "注册成功！",
                              type: "success"
                        });
                        let timer = setTimeout(() => {
                              router.push('/login')
                              clearTimeout(timer)
                        }, 1000)
                  })
      };

}
// 退出wwww
export function logout() {
      store.commit('LOGOUT')
      const loading = v.$loading({
            lock: true,
            text: '正在退出',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 3, 3, 0.7)'
      });
      let timer = setTimeout(() => {
            clearTimeout(timer)
            loading.close();
            router.replace('/login')
      }, 1000);
}









