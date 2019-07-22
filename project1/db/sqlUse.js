var userSQL = require("./userSQL.js")
var sql = require("./sql.js")
//用户登录 判断用户名密码
var getUserInfo = function(data,callback){
    sql.queryArgs(userSQL.getUserInfo,[data.username,data.password],function(err,rows){
        var result = null;
        if(err){
            result = 0;
        }else{
            result = rows.length;
        }
        callback(result);
    })
}

//查询所有用户信息
var queryAllUser = function(callback){
    sql.query(userSQL.queryAll,function(err,rows){
        var result =null;
        if(err){
            result=null;
        }else{
            result = JSON.stringify(rows);
        }
        callback(result);
    })
}


//添加用户
var addUser = function(data,callback){
    sql.queryArgs(userSQL.insert,[data.username,data.password],function(err,rows){
        var result = null;
        if(err){
            result = 0;
        }else{
            result = {
                "insertId":rows.insertId,
                "affectedRows":rows.affectedRows 
            };
        }
        callback(result);
    })

}

// 删除用户
var delUser = function(data,callback){
       sql.queryArgs(userSQL.delUser,[data.userid],function(err,rows){
        var result = null;
        if(err){
            result = 0;
        }else{
            result = {
                "affectedRows":rows.affectedRows
            };
        }
        callback(result);
    })
}

exports.getUserInfo = getUserInfo;
exports.queryAllUser = queryAllUser;
exports.addUser = addUser;
exports.delUser = delUser;