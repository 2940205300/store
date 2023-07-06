/*
 * @Description: 
 * @Autor: deng
 * @Date: 2021-06-04 19:20:07
 * @LastEditors: deng
 * @LastEditTime: 2021-06-22 16:29:24
 */
// 这里面定义权限路由

import index from '../views/index'


let route = [
  {
    path: '/index',
    name: 'index',
    component: () => import(/*webpackChunkName:"index"*/'../views/index'),
    meta: {
      requiresAuth: true,
    },
  },
  // 用户
  {
    path: '/personal',
    component: () => import(/*webpackChunkName:"personal" */ '../views/dynamic_view/personal_admin'),
    name: 'personal',
    redirect: '/personal/address',
    children: [
      {
        path: 'address',
        component: () => import(/*webpackChunkName:"persaddress" */ '../views/dynamic_view/persaddress'),
        name: 'persaddress',
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'order',
        component: () => import(/*webpackChunkName:"persorder" */ '../views/dynamic_view/persorder'),
        name: 'persorder',
        meta: {
          requiresAuth: true,
        },
      },
    ]
  },
  // 管理员
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/*webpackChunkName:"admin" */ '../views/dynamic_view/admin_admin'),
    meta: {
      requiresAuth: true
    },
    redirect:'/admin/category',
    children: [
      {
        path: 'category',
        name: 'admcategory',
        component: () => import(/*webpackChunkName:"category" */ '../views/dynamic_view/category'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'goods',
        name: 'admgoods',
        component: () => import(/*webpackChunkName:"goods" */ '../views/dynamic_view/goods'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'order',
        name: 'admorder',
        component: () => import(/*webpackChunkName:"order" */ '../views/dynamic_view/order'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]


export default route