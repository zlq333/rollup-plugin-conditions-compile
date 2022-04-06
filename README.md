基于 rollup 的条件编译插件

使用方法

1.在 utils 文件夹下新增文件 rollupConfig.js,返回 getReplaceOptions 方法，定义条件编译配置

2.在 package.json 脚本 script 打包命令中添加 --type='any' 参数

3.代码中条件编译编写格式：
/_ IFTRUE_any _/
someCode...
/_FITRUE_any _/

4.打包
