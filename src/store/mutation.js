export default {
    LOGIN(state, data) { //使用时直接commit(LOGIN,data)
        // state.user=data
        state.UserToken = JSON.stringify(data);
    },
    LOGOUT(state) {
        state.UserToken = '';
        localStorage.removeItem('_to')
    }
    // 到时候这里换成token
}