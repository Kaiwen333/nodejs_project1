var mysql = require('mysql');
var DBConfig = require('./DBConfig.js');
var userSQL = require("./userSQL.js")

const pool=mysql.createPool(DBConfig);  

pool.getConnection(function(err, connection){
    if (err) throw err;
    //添加
    // var info = {"name":"ab2","password":"111111"}
    // connection.query('INSERT INTO user SET ?', info, function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('insert ' + results.affectedRows + ' rows');
    // });

    //删除
    // connection.query('DELETE FROM user WHERE name = ？',"ab", function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('deleted ' + results.affectedRows + ' rows');
    // })

    //修改
    // connection.query('UPDATE user SET password=? WHERE name=?',["2222","ab1"], function (error, results, fields) {
    //     if (error) throw error;
    //     console.log('changed ' + results.changedRows + ' rows');
    // })

    //查询 
    connection.query('SELECT * FROM user where name = ? AND password = ?',["admin","admin"], function (error, results, fields) {
        if (error) throw error;
        console.log(results,fields);
    });

    connection.release();
    
})