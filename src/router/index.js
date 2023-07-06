/*
 * @Description: 
 * @Autor: lin
 * @Date: 2021-05-24 20:29:17
 * @LastEditors: lin
 * @LastEditTime: 2021-06-21 23:25:43
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)

import register from '../views/register'
import login from '../views/login'
import { mapState } from 'vuex'
import route from './dynamic-router'


const originalPush = VueRouter.prototype.push
  VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    component: login,
    name: 'login',
    meta: { requiresAuth: false }

  },
  {
    path: '/register',
    component: register,
    name: 'register',
    meta: { requiresAuth: false }

  },

  {
    path: '*',
    component: () => import(/*webpackChunkName:"error"*/'../views/error/404')
  }
]



const router = new VueRouter({
  mode: 'hash',
  routes,
  base:'/'

})

// 动态添加路由
router.addRoutes(route)


// 路由拦截
/**
 * 代码优化，把localStorage.getItem单独写一个函数在return出去
 */
router.beforeEach(async (to, from, next) => {
  const _to = JSON.parse(localStorage.getItem('_to'));
  //不需要登录的直接放行
  if (to.meta.requiresAuth === false) {
    next()
    //如果页面需要登录，且登录失效，进入登录页面
  } else if (!_to && to.path !== '/login') {
    next({
      path: '/login'
    })
  } else {
    next()
  }

})


export default router
