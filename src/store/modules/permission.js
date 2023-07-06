// 路由权限的请求啊 比对啊
import { permission } from '../../utils/index'  //权限网络请求
import router, { DynamicRouter } from '../../router/index'    //根路由
import dynamicRouter from '../../router/dynamic-router' //定义好的全部路由
import { recursionRouter, setDefaultRoute } from '../../utils/recursion_router'  //比对方法


export default {
    namespaced: true,
    state: {
        permissionList: null, //所有路由
        sidebarMenu: [],//导航菜单
        currentMenu: ' ',//当前菜单,会高亮


    },
    getters: {},
    mutations: {
        SET_PERMISSION(state, routes) {
            state.permissionList = routes;
        },
        // 清理权限
        CLEAR_PERMISSION(state){
            state.permissionList=null
        },
        // 设置菜单
        SET_MENU(state,menu){
            state.sidebarMenu=menu
        },
        // 清理菜单
        CLEAR_MENU(state){
            state.sidebarMenu=[]
        }
    },
    // 异步访问一定是在actions里面
    actions:{

    }
}

