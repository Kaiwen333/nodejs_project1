var formidable = require("formidable");
var clientSqlUse = require("../models/clientSqlUse");


//手机端 数钱页面
exports.game = function (req, res) {
    var gamename = req.query.game;
    console.log(`session ${req.sessionID}`)
    switch(gamename){
        case 'money':
            console.log(req.sessionID);
            res.render("client/money",{
                "connect_sid": req.sessionID
            });
            break;
        default:
            break;
    }
}


exports.oauth = function(req,res,next){
    if(req.session.openid){
        next();
    }else{
        var gamename = req.query.game;
        res.redirect('/client/wx_login?game='+gamename);
    }
}


//手机端 数钱登录页面
exports.login = function (req, res) {
    res.render("client/login");
}

//验证登录用户
exports.verifyUser = function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        if (err) {
            res.send({
                "status": -3,
                "msg": "数据获取失败"
            });
        } else {
            clientSqlUse.verifyUser(fields, function (err, length) {
                if (err) {
                    res.send({
                        "status": -2,
                        "msg": "数据库连接失败"
                    });
                } else {
                    if (length == 0) {
                        res.send({
                            "status": -1,
                            "msg": "用户名或密码错误"
                        });
                    } else if (length == 1) {
                        req.session.userName = fields.username;
                        res.send({
                            "status": 1,
                            "msg": "登录成功"
                        });
                    }
                }
            })
        }
    });
}


