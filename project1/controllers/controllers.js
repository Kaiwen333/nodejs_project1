var formidable = require("formidable");
var file = require("../models/file.js")
var sqlUse = require("../db/sqlUse.js");

//显示首页
var showIndex = function(req,res){
    res.render("index");
}

//用户管理页面
var userManager = function(req,res){
    sqlUse.queryAllUser(function(result){
        res.render("userManager",{"data":JSON.parse(result)} );
    })
}

//手机摇一摇页面
var mobileGame = function(req,res){
    res.render("mobileGame");
}


//提交用户信息
var userInfo = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        if(err){
            res.send({"status":-1});
        }else{
            sqlUse.getUserInfo(fields,function(result){
                if(result==0){
                    res.send({"status":-1});
                }else{
                    res.send({"status":1});
                }
            })
        }
    });
}

//添加用户
var addUser = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        if(err){
            res.send({"status":-1});
        }
        sqlUse.addUser(fields,function(result){
            if(result){
                res.send({
                    "status":1,
                    "insertId":result.insertId,
                    "affectedRows":result.affectedRows
                });
            }else{
                res.send({"status":-1});
            }
        })
    })
}

//删除用户
var delUser = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        if(err){
            res.send({"status":-1});
        }
        sqlUse.delUser(fields,function(result){
            if(result.affectedRows == 1){
                res.send({"status":1});
            }else{
                res.send({"status":-1});
            }
        })
    })
}



exports.showIndex = showIndex;      //首页
exports.userManager = userManager;  //用户管理页面
exports.mobileGame = mobileGame;    //手机摇一摇页面

exports.userInfo = userInfo;        //登录，判断用户名密码
exports.addUser = addUser;          //添加用户
exports.delUser = delUser;          //删除用户