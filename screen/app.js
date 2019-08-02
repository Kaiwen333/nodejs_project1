var express = require("express");
var clientControllers = require("./controllers/clientControllers.js");
var screenControllers = require("./controllers/screenControllers.js");
var session = require('express-session');
var checkAuth = require('./controllers/checkAuth');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server).sockets;
var socketConnection = require("./controllers/socket/socketConnection");

// 配置模板引擎
app.set("view engine", "ejs");

app.use(session({
	secret: 'keyboard cat',
	cookie: {
		maxAge: 60000
	},
	resave: false,
	saveUninitialized: true,
}));



// 手机端数钱登录
app.get("/client/login", clientControllers.login);
// 手机端数钱游戏
app.get("/client/money", checkAuth.checkAuth, clientControllers.money);
// 提交用户信息
app.post("/client/verifyUser", clientControllers.verifyUser);
// 大屏端数钱游戏
app.get("/screen/money", screenControllers.money)

// websocket
var connectedUser = [];
io.on('connection', function(socket){
	console.log(socket);
    var userName='';
	// 监听断开连接 
	socket.on('disconnect',function(){
		socketConnection.disconnect(userName,connectedUser,function(){
			updateUser();
		})

	});
	//监听登录事件
	socket.on("login",function(_userName){
		userName = _userName;
		socketConnection.login(userName,_userName,connectedUser,function(){
			updateUser();
		});
	})
	socket.on("getUserInfo",function(){
		updateUser();
	})
	// 更新用户信息
	var updateUser = function() {
		io.emit('updateUser', connectedUser);
	}
	socket.on("startGame",function(){
		io.emit('startGame');
	})

});


// 配置静态资源文件
app.use(express.static("public"));

// 监听3000商品
server.listen(3000);
console.log("server is start");

exports.io = io