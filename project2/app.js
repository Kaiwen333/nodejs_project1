var express = require("express");
var controllers = require("./controllers/controllers.js");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server).sockets;

// 配置模板引擎
app.set("view engine","ejs");

//路由
//首页
app.get("/",controllers.showIndex);
//大屏页面
app.get("/bigscreen",controllers.bigScreen);


//websocket
var connectedUser = [];
io.on('connection', function(socket){
    // console.log(socket);
    var userName='';
    updateUser();
    console.log(socket.request.connection.remoteAddress);
    // 监听断开连接 
    socket.on('disconnect', function(){
        console.log(`${userName} disconnected`);
        if(userName){
            connectedUser.splice(connectedUser.indexOf(userName),1);
        }
        updateUser();
    });

    //监听登录事件
    socket.on("login",function(_userName,callback){
        if(_userName.trim().length == 0){
            return;
        }
        callback(true);
        userName = _userName;
        connectedUser.push(userName);
        console.log(connectedUser);
        updateUser();
    })

    //更新用户信息
    function updateUser() { 
        io.emit('updateUser',connectedUser);
    }
    
});
      

// 配置静态资源文件
app.use(express.static("public"));

server.listen(3000,function(){
    console.log("server is start on 3000");
});   

