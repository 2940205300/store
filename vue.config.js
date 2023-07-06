module.exports = {
  lintOnSave: false, //eslint语法检查
  // 跨域
  devServer: {
    host: 'localhost',
    port: 8080, //vue项目的端口
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',//目标服务器
        changeOrigin: true,
      },
    }
  }
}
