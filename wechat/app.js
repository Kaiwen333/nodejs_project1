var express = require("express");
var controllers = require("./controllers/controllers.js");
var session = require('express-session')
var app = express();
var wechat = require('./controllers/wechat.js')
var client = require('./controllers/client');



// 配置模板引擎
app.set("view engine","ejs");

app.use(session({   
    secret: 'keyboard cat',
	cookie: { maxAge: 60000 } ,
	resave:false ,  
	saveUninitialized: true,
}));


// 路由，中间件

app.get("/token",wechat);

app.use('/client', client);



// 配置静态资源文件
app.use(express.static("public"));

// 监听3000商品
app.listen(3000);
console.log("server is start");