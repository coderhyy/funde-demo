const mysql = require('mysql');  
require('dotenv').config(); 
// 创建数据库连接  
const connectionConfig = {  
    host: process.env.HOST,  
    user: process.env.ROOT,  
    password: process.env.PASSWORD,  
    database: process.env.DATABASE
};  

const pool = mysql.createPool(connectionConfig);  

const query = function(sql, values) {  
    return new Promise((resolve, reject) => {  
        pool.getConnection(function(err, connection) {  
            if (err) {  
                console.error('Error connecting to the database:', err);  
                resolve(err);  
            } else {
                // console.log('Successfully connected to the database');
                // console.log(sql);    
                connection.query(sql, values, (err, rows) => {  
                    if (err) {  
                        reject(err);  
                    } else {  
                        resolve(rows);  
                    }  
                    connection.release();  
                });  
            }  
        });  
    });  
}  

const allFundraiser = function() {  
    let sql = 'SELECT * FROM FUNDRAISER';  
    return query(sql);  
}  
const findFundraiserById = function(fundraiserId) {  
    let sql = 'SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ?';  
    console.log(sql);
    return query(sql, [fundraiserId]);  
}
//获取所有类别并展示在Search上
const allCategories = function() {  
    let sql = 'SELECT * FROM CATEGORY';  
    return query(sql);  
}
const findFundraisersByCategory = function(category) {  
    let sql = 'SELECT * FROM FUNDRAISER WHERE CATEGORY_ID = ?';  
    return query(sql, [category]);  
}      
// 连接到数据库  
module.exports = { allFundraiser ,findFundraiserById,allCategories,findFundraisersByCategory};