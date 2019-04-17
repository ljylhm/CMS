const path = require("path")
const webpack = require('webpack')
const developHelper = require("./developHelp/helper")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const IP_ADDRESS = developHelper.getCurrentIp()

module.exports = {
    entry: {
        "index":"./index.js",
        "login":"./login.js"
    },
    output:{
        filename: "[name].js",
        path:path.resolve(__dirname,'./dist'),
    },
    resolve: {
        modules: ['./', 'node_modules'],
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.json', '.vue'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
          'Vue$': 'vue/dist/vue.js',
          '@': path.resolve(__dirname, './js'),
          '@helper':path.resolve(__dirname,'./src/lib/helper'),
          '@http':path.resolve(__dirname,'./src/lib/http'),
          '@api':path.resolve(__dirname,"./src/lib/api"),
          '@img':path.resolve(__dirname,"./image"),
          '@config':path.resolve(__dirname,"./src/config/config")
        }
      },
      module:{
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
              test: /\.js$/,
              loader: "babel-loader",
              exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2)$/,
              loader: 'file-loader'
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
              use: {
                  loader: 'url-loader',
                  options: {
                      outputPath: './images/', // 图片输出的路径
                      limit: 1 * 1024
                  }
              }
            }
        ]
      },
      devServer:{
        host:IP_ADDRESS,
        port: "8080",
        inline: true,
        open: true,
        compress: true, // 打包的内容进行压缩
        hot: true
      },
      plugins:[
        new VueLoaderPlugin()
    ]
}