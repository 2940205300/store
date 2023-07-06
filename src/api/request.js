import axios from 'axios'

export function get(url){ //函数柯理化的写法
    return function(params){
       return axios.get(url,{params})
        .then(res=>{
            return res
        }).catch(e=>{})
    }
}

const List =get('/api/index')
// export default List;
// id其实就是传的params
List({id}).then(res=>{

})
