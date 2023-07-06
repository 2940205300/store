export default {
    get UserToken() {
        return localStorage.getItem('_to')
    },
    set UserToken(val) {
        localStorage.setItem('_to',val)
    }
}