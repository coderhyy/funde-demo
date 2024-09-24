const Router  = require('koa-router') // 引入路由函数
const Model = require('../lib/mysql') // 引入数据库方法
const router = new Router(); // Use the 'new' keyword  

// 查询所有的筹款人
router.get('/api/allFundraiser', async (ctx) => {
    await Model.allFundraiser()
      .then(result => {
        if (result.length) {
          ctx.body = {
            data: result,
            total: result.length,
            msg: '查询成功'
          }
        } else {
          try {
            throw Error('没有找到筹款人')
          } catch (error) {
            console.log(error)
          }
          ctx.body = {
            data: 0,
            msg: '暂时没有筹款人'
          }
        }
      })
  });
  
// 根据 FUNDRAISER_ID 查询特定的筹款人  
router.get('/api/fundraiser/:id', async (ctx) => {  
  const fundraiserId = ctx.params.id;
  console.log(fundraiserId)
  await Model.findFundraiserById(fundraiserId)  
      .then(result => {  
          if (result.length) {  
              ctx.body = {  
                  data: result[0],
                  msg: '查询成功'  
              };  
          } else {  
              try {  
                  throw Error('没有找到筹款人');  
              } catch (error) {  
                  console.log(error);  
              }  
              ctx.body = {  
                  data: null,  
                  msg: '没有找到该筹款人'  
              };  
          }  
      })  
      .catch(error => {  
          console.error(error);  
          ctx.body = {  
              msg: '查询失败'  
          };  
      });  
});
router.get('/api/allCategories', async (ctx) => {  
  await Model.allCategories()  
      .then(result => {  
          if (result.length) {  
              ctx.body = {  
                  data: result,
                  total: result.length,
                  msg: '查询成功'  
              };  
          } else {  
              try {  
                  throw Error('没有数据');  
              } catch (error) {  
                  console.log(error);  
              }  
              ctx.body = {  
                  data: null,  
                  msg: '没有数据'  
              };  
          }  
      })  
      .catch(error => {  
          console.error(error);  
          ctx.body = {  
              msg: '查询失败'  
          };  
      });  
});    
module.exports = router