var mysql = require('mysql');
var DBConfig = require('./DBConfig.js');
var pool = mysql.createPool(DBConfig.mysql);


//操作数据库，不带参数
var query = function (sql, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null, null);
        } else {
            connection.query(sql, function (err, rows) {
                connection.release();
                callback(err, rows);
            });
        }
    });
}


//操作数据库，带参数
var queryArgs = function (sql, args, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback(err, null, null);
        } else {
            connection.query(sql, args, function (err, rows) {
                connection.release();
                callback(err, rows);

            });
        }
    });
}


module.exports = {
    query: query,
    queryArgs: queryArgs
}