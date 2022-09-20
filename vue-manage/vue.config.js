const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭语法检查
  lintOnSave:false,
  //修改端口号
  devServer:{
    port:8080
  }
})
