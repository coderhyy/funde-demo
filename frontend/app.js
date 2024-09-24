"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = require("koa");
// 使用 ES Module 的 import 语法  
var api_1 = require("./src/api"); // 导入路由文件
var app = new koa_1.default();
// 使用路由
app.use(api_1.default.routes());
app.use(api_1.default.allowedMethods());
// 服务启动端口  
app.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});
