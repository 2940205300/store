import axios from 'axios'


var instance = axios.create({
    timeout: 5000
})



export async function get(url, options){
    return new Promise((resolve, reject) => {
        axios.get(url, options)
             .then(res => {
                if (res.data.code === 200) {
                    resolve(res.data)
                } else {
                    reject(res.data.message)
                }
            })
            .catch(e => {
                console.log(e)
            })
    })
}


export async function post(url, data, options){
    return new Promise((resolve, reject) => {
        instance
            .post(url, data, options)
            .then(res => {
                if (res.data.code ===200) {
                    resolve(res.data)
                } else {
                    reject(res.data.message)
                }
            })
            .catch(e => {
                console.log(e)
            })
    })
}


