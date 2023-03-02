
const path = require("path");
// const U=require('')
module.exports = {
  entry: "./src/index.ts", //入口文件
  output: {
    path: path.resolve(__dirname, './dist'), //输出路径
    publicPath: '/dist/',
    filename: 'use-hook.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"] //新增
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // {
      //   test: /\.less$/,
      //   use: [{
      //       loader: "style-loader"
      //     },
      //     {
      //       loader: "css-loader"
      //     },
      //     {
      //       loader: "less-loader"
      //     }
      //   ]
      // },
      {
        test: /\.js$/,
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },

    ]
  },
}
