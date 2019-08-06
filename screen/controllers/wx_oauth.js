var request = require('request');
var wx_config = require('./wx_config');
var clientSqlUse = require('../models/clientSqlUse');
 // 第一步：用户同意授权，获取code
var wx_login = function(req,res){
    // console.log(wx_config.wx.AppID);
    var return_uri = wx_config.wx.url+'/client/get_wx_access_token?game='+req.query.game;  
    res.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx_config.wx.AppID}&redirect_uri=${return_uri}&response_type=code&scope=${wx_config.wx.scope}&state=STATE#wechat_redirect`);
    
}

var get_wx_access_token = function(req,res){
    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get(
        {   
            url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+wx_config.wx.AppID+'&secret='+wx_config.wx.AppSecret+'&code='+code+'&grant_type=authorization_code',
        },
        function(error, response, body){
            // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
            if(response.statusCode == 200){
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;
                request.get(
                    {
                        url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
                    },
                    function(error, response, body){
                         // 第四步：根据获取的用户信息进行对应操作
                        if(response.statusCode == 200){
                            var userinfo = JSON.parse(body);
                            // console.log(JSON.parse(body));
                            console.log('get info success');

                            clientSqlUse.userExist(userinfo,function(err,rowLength){
                                if(err){
                                    res.send({
                                        "status": -2,
                                        "msg": "数据库连接失败"
                                    });
                                }else{
                                    if(rowLength == 0){
                                        clientSqlUse.addUser(userinfo,function(err,row){
                                            if(err){
                                                res.send({
                                                    "status": -3,
                                                    "msg": "插入数据失败"
                                                });
                                            }else{
                                               console.log("用户数据插入成功");     
                                            }
                                        })
                                    }
                                }
                            })
                            req.session.nickname = userinfo.nickname;
                            req.session.openid = userinfo.openid;
                            req.session.headimgurl = userinfo.headimgurl;
                            res.redirect("/client/game?game="+req.query.game)
                            
                        }else{
                            console.log(response.statusCode);
                        }
                    }
                );
            }else{
                console.log(response.statusCode);
            }
        }
    );
}

exports.wx_login = wx_login;
exports.get_wx_access_token = get_wx_access_token; 