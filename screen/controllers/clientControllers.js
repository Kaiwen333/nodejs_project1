var formidable = require("formidable");
var clientSqlUse = require("../models/clientSqlUse");


//手机端 数钱页面
exports.money = function (req, res) {
    res.render("client/money");
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