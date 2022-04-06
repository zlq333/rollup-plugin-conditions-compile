import babel from "rollup-plugin-babel";

export default {
  input: "./index.js", // 要打包的文件路径
  output: {
    // 输出文件配置
    file: "dist/bundle.cjs.js", // 打包后的文件路径及文件名
    format: "cjs", // 文件输出格式
  },
  plugins: [
    babel({
      exclude: "node_module/**",
    }),
  ],
};
