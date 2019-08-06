var sql = require("../db/sql")
var sqlQuery = require("../db/sqlQuery.js")

//登录验证 判断用户名密码
var verifyUser = function(data,callback){
    sql.queryArgs(sqlQuery.userSQL.getUserInfo,[data.username,data.password],function(err,rows){
        if(err){
            callback(err,null);
        }else{
            callback(err,rows.length);
        }
    })
}

// 通过openid判断用户是否存在数据库中
var userExist = function(data,callback){
    sql.queryArgs(sqlQuery.userSQL.userExist,[data.openid],function(err,rows){
        if(err){
            callback(err,null);
        }else{
            callback(err,rows.length);
        }
    })
}

//添加用户信息
var addUser = function(data,callback){
    console.log(data);
    sql.queryArgs(sqlQuery.userSQL.addUser,[data.openid,data.nickname,data.sex,data.city,data.province,data.country,data.headimgurl],function(err,rows){
        if(err){
            callback(err,null);
        }else{
            callback(err,rows.affectedRows);
        }
    })
}


exports.verifyUser = verifyUser;
exports.userExist = userExist;
exports.addUser = addUser;
