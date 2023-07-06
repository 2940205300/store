import Axios from 'axios'

// 请求拦截
Axios.interceptors.request.use(function (config) {
    // 发送请求之前做什么事
    //  let _to=JSON.parse(localStorage.getItem('_to'))
    if (JSON.parse(localStorage.getItem('_to'))) {
        config.headers.Authorization = JSON.parse(localStorage.getItem('_to')).token
        // console.log('携带token了');
    }
    return config

}, function (error) {
    return Promise.reject(error)
})

// 响应拦截
Axios.interceptors.response.use(function (response) {
    // console.log('响应拦截器正确处理');
    const status=response.status
    if (status == 200) {
        return Promise.resolve(response)
    }if (status == 500) {
        console.log(status);
        // console.log('后台报错啦');
        return Promise.resolve(response)
    }
}, function (error) {
    // console.log('响应拦截器错误处理');
    return Promise.reject(error)
})


export default Axios