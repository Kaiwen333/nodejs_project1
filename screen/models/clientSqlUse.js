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


exports.verifyUser = verifyUser;
