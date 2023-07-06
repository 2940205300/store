import Vue from 'vue'
import Vuex from 'vuex'
import {createLogger} from 'vuex' 
import  state from './defaultState'
import mutation from './mutation'
import modules from './modules'
Vue.use(Vuex)

export default new Vuex.Store({
  state:state,
  mutations:mutation,
  actions: {
  },
  modules:modules,

  // vuex日志插件,判断一下是生产环境还是开发环境
  // const debug=process.env.NODE_NEV!=='prodction'
  // plugins:debug? [createLogger()]:[]
})
