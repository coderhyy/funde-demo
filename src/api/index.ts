// router.js
import Router from 'koa-router';  
import model from '../lib/db';  

// 实例化 Router
const router = new Router();

// 定义路由
router.get('/api/allUser', async (ctx) => {
  try {
    const result = await model.allUser();
    if (result.length) {
      ctx.body = {
        data: result, 
        msg: '查询成功'
      };
    } else {
      ctx.body = {
        msg: '没有数据'
      };
    }
  } catch (error) {
    console.error('Query error:', error);
    ctx.body = {
      msg: '查询失败'
    };
  }
});

// 导出 router 实例
export default router;