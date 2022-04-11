import recursiveReadFile from "./utils/findOptions";

let result = recursiveReadFile("src/utils/rollupConfig.js");
let getReplaceOptions;
if (result) {
  getReplaceOptions = eval(result);
}
console.log("getReplaceOptions", getReplaceOptions);
var REGCSS =
  /\/\*\s*IF(DEBUG|TRUE_\w+)(?:\s*\*\/)?([\s\S]+?)(?:\/\*\s*)?FI\1\s*\*\//g;
var REGHTML =
  /\<\!\-\-\s*IF(TRUE_\w+)(?:\s*\-\-\>)?([\s\S]+?)(?:\<\!\-\-\s*)?FI\1\s*\-\-\>/g;

export default function replacer(type) {
  return {
    name: "rollup-plugin-conditions-compile",
    transform(code) {
      if (!type) {
        return;
      }

      if (!getReplaceOptions && type) {
        return;
      }

      let options = getReplaceOptions(type);

      // 过滤 js、css
      let p1 = code.replace(REGCSS, (match, $1, $2) => {
        console.log("match", match);
        var varName = $1.slice(5);
        let isKeep = options[varName];
        return isKeep ? $2 : "";
      });

      // 过滤html
      let p = p1.replace(REGHTML, (match, $1, $2) => {
        console.log("match", match);
        var varName = $1.slice(5);
        let isKeep = options[varName];
        return isKeep ? $2 : "";
      });

      return p;
    },
  };
}
