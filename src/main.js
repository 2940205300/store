import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'//懒加载
import Axios from './utils/interceptors' //自己写的请求响应拦截器
import Viewer from 'v-viewer'//图片预览
import 'viewerjs/dist/viewer.css'
import Moment from 'moment' //处理日期选择器


Vue.use(VueAxios, axios) //这样的话不用每个vue文件都导入axios(官网)
Vue.prototype.$axios = Axios //请求响应拦截器配置,添加到原型链中.用的时候就this.$axios
Vue.prototype.moment=Moment
Vue.use(ElementUI)
Vue.use(VueLazyLoad, {
  loading: require('./assets/loading.png'),//加载中图片
  error: require('./assets/error.png')  //加载失败图片
});
//Vue.use(Viewer) 默认配置写法
Vue.use(Viewer)




Vue.config.productionTip = false;



const vm = new Vue({
  router,
  store,
  render: h => h(App)
})
vm.$mount('#app')
