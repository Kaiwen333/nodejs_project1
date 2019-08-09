var express = require("express");
var session = require('express-session');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server).sockets;
var MemoryStore  = require ('memorystore')(session);

var clientControllers = require("./controllers/clientControllers.js");
var screenControllers = require("./controllers/screenControllers.js");
var wx_oauth = require("./controllers/wx_oauth")
var session_store = new MemoryStore({
	checkPeriod:86400000 //  每24小时修剪一次过期的条目  
});


// 配置模板引擎
app.set("view engine", "ejs");

app.use(session({
	store:session_store,
	secret: 'screen game',
	cookie: {
		maxAge: 60000
	},
	resave: false,
	saveUninitialized: true,
}));



// 手机端游戏
app.get("/client/game",clientControllers.oauth,clientControllers.game);
// 微信登录 
app.get('/client/wx_login',wx_oauth.wx_login);
app.get('/client/get_wx_access_token',wx_oauth.get_wx_access_token);
// 大屏端数钱游戏
app.get("/screen/money",screenControllers.money);

// websocket
var connectedUser = [];
io.on('connection', function(socket){
	var userInfo = {};
	// 更新用户信息
	var updateUser = function() {
		io.emit('updateUser', connectedUser);	
	}
	var updateUserInfo = function(){
		io.emit('updateUserInfo',userInfo);
	}
	// 监听断开连接 
	socket.on('disconnect',function(){
		if(JSON.stringify(userInfo) != {} ){
			connectedUser =	connectedUser.filter(function(item){
				return item.openid != userInfo.openid;
			})
		}
		updateUser();
	});
	//监听登录事件
	socket.on("login",function(connectid){
		session_store.get(connectid,function(err,session){
			if(err){ 
				console.log(err);
			}else{
				if(session.openid){
					userInfo.openid =  session.openid;
					userInfo.nickname = session.nickname;
					userInfo.headimgurl = session.headimgurl;
					userInfo.score = 0;
					connectedUser.push(userInfo);
					updateUser();
					updateUserInfo();
				}
			}
		})
	})
	socket.on("getUserInfo",function(){
		updateUser();
	})
	socket.on("startGame",function(){
		io.emit('startGame');
	})
});


// 手机端数钱登录
// app.get("/client/login", clientControllers.login);
// 提交用户信息
// app.post("/client/verifyUser", clientControllers.verifyUser);


// 配置静态资源文件
app.use(express.static("public"));

// 监听3000商品
server.listen(3000);
console.log("server is start");

exports.io = io