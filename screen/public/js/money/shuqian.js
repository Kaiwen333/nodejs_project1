

var c = document.getElementById("stage");
var ctx = c.getContext("2d");
var dragging = false;
var w1=0;
var loc;
var dy=0;
var h1=0;
var int;
var countdown=10;//计时器
var num=0;//计数

//添加回调函数，图像加载完毕后执行，启动游戏
//加载图片
resources.load([
    '/images/splashtitle.png',
	'/images/tmbg.png',
	'/images/tmicon.png',
    '/images/starttip.png',
    '/images/mb0.png',
    '/images/m0.png'
]);

resources.onReady(init);

window.onresize=resizeCanvas;//canvas自适应屏幕大小
function resizeCanvas(){
	c.width=window.innerWidth;
	c.height=window.innerHeight;
}
resizeCanvas();   


//倒计时
function settime(){
 var counttime=document.getElementById('time');
 counttime.innerHTML=""+countdown+"''";
	if(countdown==0){
		alert("您"+10+"秒内一共数了￥"+num+"00")
		return false;
		}
	 else{
		 countdown--;
		 }
	setTimeout(function() { 
	 settime(); 
	  },1000) 
}
//数红包啰
var evnums=document.getElementById('num');
function evnum(){
	 num++;
	evnums.innerHTML="￥"+num+"00";
	}
var start=document.getElementById('start');
start.onclick= function(){
	var starttime=document.getElementById('start');
    starttime.style.display="none";
	evnums.style.display="block";
	settime();
	c.style.position="inherit";
	c.style.zIndex="0";
	ctx.clearRect(0,0,c.width,c.height);
	ctx.drawImage(resources.get("/images/tmbg.png"),c.width/2-135,c.height/6);
	ctx.drawImage(resources.get("/images/tmicon.png"),c.width/2-45,c.height/6+80);
    ctx.drawImage(resources.get("/images/starttip.png"),c.width/2-20,c.height/2);
	ctx.drawImage(resources.get("/images/mb0.png"),c.width/3+80,c.height/2+82,c.width/3.8,c.height);
    //ctx.drawImage(resources.get("img/mb0.png"),12,c.height/2+82,c.width-24,c.height);
    //ctx.drawImage(resources.get("img/m0.png"),12,loc.y-dy,c.width-24,c.height);
	}
function init() {  
   w1=resources.get("/images/mb0.png").width;
   h1=resources.get("/images/mb0.png").height;
 
   ctx.drawImage(resources.get("/images/splashtitle.png"),c.width/3+80,0,c.width/3.8,c.height/2.5);
   ctx.drawImage(resources.get("/images/starttip.png"),c.width/2-20,c.height/2);
   ctx.drawImage(resources.get("/images/mb0.png"),c.width/3+80,c.height/2+82,c.width/3.8,c.height);

}
 c.onmousemove = function (e) { //鼠标移动
   if (dragging) {
      //窗口坐标转canvas坐标
      loc = windowToCanvas(c, e.clientX, e.clientY);
      //ctx.drawImage(resources.get("img/m0.png"),c.width/2-w1/2,loc.y);
	  ctx.drawImage(resources.get("/images/m0.png"),c.width/4-w1/2,loc.y);
    }
  }

 c.onmouseup = function (e) { //鼠标松开
    dragging = false;
    loc = windowToCanvas(c, e.clientX, e.clientY);
    
    if(int){
        clearInterval(int);
        dy=0;
    }
    int=setInterval(Animation,20);
	evnum();
 }
 
 
 function Animation(){
     ctx.clearRect(0,0,c.width,c.height);
	 ctx.drawImage(resources.get("/images/tmbg.png"),c.width/2-135,c.height/6);
	 ctx.drawImage(resources.get("/images/tmicon.png"),c.width/2-45,c.height/6+80);
     ctx.drawImage(resources.get("/images/starttip.png"),c.width/2-20,c.height/2);
    // ctx.drawImage(resources.get("/images/mb0.png"),12,c.height/2+82,c.width-24,c.height);
	 ctx.drawImage(resources.get("/images/mb0.png"),c.width/3+80,c.height/2+82,c.width/3.8,c.height);
     ctx.drawImage(resources.get("/images/m0.png"),c.width/3+80,loc.y-dy,c.width/3.8,c.height);
     dy+=100;
  }

//窗口坐标转canvas坐标............

function windowToCanvas(canvas, x, y) {
   var canvasRectangle = canvas.getBoundingClientRect();
   
   return {
             x: x - canvasRectangle.left,
             y: y - canvasRectangle.top
          };
}