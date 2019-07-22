var express = require("express");
var controllers = require("./controllers/controllers.js");
var app = express();


// 配置模板引擎
app.set("view engine","ejs");


// 路由，中间件
// 首页
app.get("/",controllers.showIndex);
// 用户管理页面
app.get("/userManager",controllers.userManager);
// 手机摇一摇页面
app.get("/mobileGame",controllers.mobileGame);

// 提交用户信息
app.post("/userInfo",controllers.userInfo);
//添加用户
app.post("/addUser",controllers.addUser);  
//删除用户
app.post("/delUser",controllers.delUser);  

// 配置静态资源文件
app.use(express.static("public"));

// 监听3000商品
app.listen(3000);
console.log("server is start");