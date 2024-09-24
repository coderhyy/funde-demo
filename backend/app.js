const Koa = require('koa');
const app = new Koa();
const router = require('./api/index');
const cors = require('@koa/cors');

// 使用cors中间件允许跨域请求 
app.use(cors({  
    origin: '*' // 允许的来源  
  }));  
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
console.log('启动成功：打开 http://localhost:3000/')