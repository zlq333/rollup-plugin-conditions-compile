var path = require("path");
var fs = require("fs");

function recursiveReadFile(fileName) {
  var res;
  console.log("fileName", fileName);
  if (!fs.existsSync(fileName)) return;
  if (isFile(fileName)) {
    res = check(fileName);
  }
  if (isDirectory(fileName)) {
    var files = fs.readdirSync(fileName);
    files.forEach(function (val, key) {
      var temp = path.join(fileName, val);
      if (isDirectory(temp)) recursiveReadFile(temp);
      if (isFile(temp)) {
        res = check(temp);
      }
    });
  }
  console.log("res", res);
  return res;
}
function check(fileName) {
  var data = readFile(fileName);
  var exc = new RegExp("getReplaceOptions");
  if (exc.test(data)) {
    let content = data;
    console.log("fileName", fileName);
    return content;
  } else {
    return "";
  }
}
function isDirectory(fileName) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isDirectory();
}
function isFile(fileName) {
  if (fs.existsSync(fileName)) return fs.statSync(fileName).isFile();
}
function readFile(fileName) {
  if (fs.existsSync(fileName)) return fs.readFileSync(fileName, "utf-8");
}

export default recursiveReadFile;
