var express = require("express");
var controllers = require("./controllers/controllers.js");
var checkAuth = require('./controllers/checkAuth.js');
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
// 登录
app.get("/login",controllers.showIndex);
// 提交用户信息
app.post("/userInfo",controllers.userInfo);

// 用户管理页面
app.get("/userManager",checkAuth.checkAuth,controllers.userManager);
// 手机摇一摇页面
app.get("/mobileGame",checkAuth.checkAuth,controllers.mobileGame);

//添加用户
app.post("/addUser",checkAuth.checkAuth,controllers.addUser);  
//删除用户
app.post("/delUser",checkAuth.checkAuth,controllers.delUser);  

// 配置静态资源文件
app.use(express.static("public"));

// 监听3000商品
app.listen(3000);
console.log("server is start");