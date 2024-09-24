import Koa from 'koa';  
// 使用 ES Module 的 import 语法  
import router from './src/api';  // 导入路由文件

const app = new Koa();  



// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());

// 服务启动端口  
app.listen(3000, () => {  
  console.log('Server is running on http://localhost:3000');  
});  