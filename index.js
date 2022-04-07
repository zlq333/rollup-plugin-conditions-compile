import recursiveReadFile from "./utils/findOptions";

let result = recursiveReadFile("src/utils/rollupConfig.js");
console.log("result", result);

let getReplaceOptions = eval(result);
console.log("getReplaceOptions", getReplaceOptions);

var REG =
  /\/\*\s*IF(DEBUG|TRUE_\w+)(?:\s*\*\/)?([\s\S]+?)(?:\/\*\s*)?FI\1\s*\*\//g;

export default function replacer(type) {
  return {
    name: "rollup-plugin-conditions-compile",
    transform(code) {
      if (!getReplaceOptions) {
        console.warn("请添加rollup配置文件!--------------------------------");
        return;
      }
      if (!type) {
        console.warn("请添加打包参数!--------------------------------");
        return;
      }
      let options = getReplaceOptions(type);
      return code.replace(REG, (match, $1, $2) => {
        var varName = $1.slice(5);
        let isKeep = options[varName];
        return isKeep ? $2 : "";
      });
    },
  };
}
