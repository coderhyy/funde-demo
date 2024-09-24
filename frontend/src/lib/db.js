"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
// 创建数据库连接  
var connectionConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};
var pool = mysql.createPool(connectionConfig);
var query = function (sql, values) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err);
            }
            else {
                connection.query(sql, values, function (err, rows) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};
var allUser = function () {
    var sql = 'SELECT * FROM FUNDRAISER';
    return query(sql);
};
// 连接到数据库  
exports.default = { allUser: allUser };
