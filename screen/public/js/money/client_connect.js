var vConsole = new VConsole();
var userInfo = {};
var connect_sid = '<%= connect_sid %>';
// console.log(connect_sid);
var game = new Game({
    "canvasid" : "#mycanvas"
});
var socket = io({
  'timeout':5000,
  'connect timeout':5000
});
if(socket !== undefined ){
  console.log('connected to socket....'); 
}
socket.emit("login",connect_sid);      
socket.on("startGame",function(){
    game.sm.enter(2);
})
socket.on("updateUserInfo",function(data){
    userInfo.openid = data.openid;
    userInfo.nickname = data.nickname;
    userInfo.score = data.score;
    userInfo.headImgUrl = data.headImgUrl;

    console.log(userInfo);
})