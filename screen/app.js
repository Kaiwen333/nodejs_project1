var express = require("express");
var clientControllers = require("./controllers/clientControllers.js");
var session = require('express-session')
var app = express();

// 配置模板引擎
app.set("view engine","ejs");

app.use(session({   
    secret: 'keyboard cat',
	cookie: { maxAge: 60000 } ,
	resave:false ,  
	saveUninitialized: true,
}));


// 路由，中间件

// 手机端数钱登录
app.get("/client/login",clientControllers.login);
// 手机端数钱游戏
app.get("/client/money",clientControllers.money);




// 配置静态资源文件
app.use(express.static("public"));

// 监听3000商品
app.listen(3000);
console.log("server is start");