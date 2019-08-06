/**
 * @Module   : Wechat oauth Module
 * @Brief   : Process Wechat oauth
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var wx_config = require('./wx_config');
/* 微信登陆 */
var AppID = 'wx5412adf120755c07';
var AppSecret = 'b451d689ed4da56b2ccdf7a7e59ea7cf';
var scope = 'snsapi_userinfo';
var r = "get_wx_access_token"
// 授权后要跳转的链接

 // 第一步：用户同意授权，获取code
router.get('/wx_login', function(req,res){
    console.log(wx_config.wx.AppID);
    var return_uri = wx_config.wx.url+'/client/get_wx_access_token?game='+req.query.game;  
    res.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wx_config.wx.AppID}&redirect_uri=${return_uri}&response_type=code&scope=${wx_config.wx.scope}&state=STATE#wechat_redirect`);
    
});


router.get('/get_wx_access_token', function(req,res){
    console.log("get_wx_access_token")
    console.log("code_return: "+req.query.code)
    console.log("code_return_game:"+req.query.game);
    // console.log(req);
    
    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get(
        {   
            url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code',
        },
        function(error, response, body){
            if(response.statusCode == 200){
                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                // console.log(JSON.parse(body));
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;
                
                request.get(
                    {
                        url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
                    },
                    function(error, response, body){
                        if(response.statusCode == 200){
                            
                            // 第四步：根据获取的用户信息进行对应操作
                            var userinfo = JSON.parse(body);
                            console.log(JSON.parse(body));
                            console.log('get info success');
                            
                            // 小测试，实际应用中，可以由此创建一个帐户
                            // res.send("\
                            //     <h1>"+userinfo.nickname+" 的个人信息</h1>\
                            //     <p><img src='"+userinfo.headimgurl+"' /></p>\
                            //     <p>"+userinfo.city+"，"+userinfo.province+"，"+userinfo.country+"</p>\
                            // ");

                            res.redirect("/client/"+req.query.game)
                            
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

});


router.get("/money",function(req,res){
    console.log(123);
    res.end("13123123");
})

module.exports = router;