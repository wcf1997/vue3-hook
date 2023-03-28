import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import jsx from "acorn-jsx";


function setOutput() {
  const path = 'dist/'; // 编译后代码存放地址
  const output = [];

  if (process.env.NODE_ENV === 'production') {
    ['iife', 'es', 'umd'].forEach((item) => {
      output.push({
        dir: path + item,
        format: item,
        name: 'v3-usehook',
      });
    });
  } else {
    output.push({
      dir: path,
      format: 'es',
      name: 'v3-usehook',
    });
  }

  return output

}
export default {
  input: "./src/index.ts", // 打包入口
  // output: {
  //   // 打包出口
  //   file: "dist/index.js",
  //   format: "umd", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
  //   name: "utilibs", // cdn方式引入时挂载在window上面用的就是这个名字
  //   sourcemap: true,
  // },
  output: setOutput(),
  acornInjectPlugins: [jsx()],

  // 忽略打包文件数组
  external: ["vue", "vue-loader"],
  plugins: [
    // 打包插件
    commonjs({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      
      sourceMap: true
    }),
    typescript({
      lib: ["es5", "es6", "dom"],
      target: "es5", // 输出目标
      noEmitOnError: true, // 运行时是否验证ts错误
    }),
    resolve({
      mainFields: ["module", "main", "browser"]
    }),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      babelHelpers: "bundled"
    }), // babel配置,编译es6
  ],

};