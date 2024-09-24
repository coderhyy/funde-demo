import * as mysql from 'mysql';  

// 定义连接配置的接口  
interface ConnectionConfig {  
    host: string;  
    user: string;  
    password: string;  
    database: string;  
}  

// 创建数据库连接  
const connectionConfig: ConnectionConfig = {  
    host: process.env.HOST,  
    user: process.env.USER,    
    password: process.env.PASSWORD,  
    database: process.env.DATABASE
};  

const pool = mysql.createPool(connectionConfig);  
interface DBQuery {  
    (sql: string, values?: any): Promise<any>; // values是可选参数，它是用来替换sql语句中的占位符?  
}  
let query:DBQuery = function (sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          resolve(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  }
  

let allUser= function(){
    let sql= 'SELECT * FROM FUNDRAISER'
    return query(sql)
}
// 连接到数据库  
export default {allUser};