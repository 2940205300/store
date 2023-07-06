// 方法一：比对路由权限
// 方法二：指定返回的默认路由

/*
  {Array}  userRouter  后台返回的路由文件json
  {Array}  allRouter   前端配置的路由权限
  {Array}  realRoutes  符合条件的路由
*/


export function recursionRouter(userRouter = [], allRouter = []) {
    var realRoutes = [];
    allRouter.forEach((v, i) => {
        userRouter.forEach((item, index) => {
            if (item.name === v.meta.name) {
                if (item.children && item.length > 0) {
                    v.children = recursionRouter(item.children)
                }
                realRoutes.push(v)
            }
        })
    })
    return realRoutes
}



export function setDefaultRoute(routes) {
    routes.forEach((v, i) => {
        if (v.children && v.children > 0) {
            v.redirect = { name: caches.children[0].name }//name跳转
            setDefaultRoute(v.children); //递归啊  
        }
    })
}