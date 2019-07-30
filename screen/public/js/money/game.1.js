var imgArr = {
    "images" : [
        {"name" : "d0" , "url" : "/images/d0.png"},
        {"name" : "m0" , "url" : "/images/m0.png"},
        {"name" : "mb0" , "url" : "/images/mb0.png"},
        {"name" : "share_tip" , "url" : "/images/share_tip.png"},
        {"name" : "splashtitle" , "url" : "/images/splashtitle.png"},
        {"name" : "starttip" , "url" : "/images/starttip.png"},
        {"name" : "tmbg" , "url" : "/images/tmbg.png"},
        {"name" : "tmicon" , "url" : "/images/tmicon.png"}
    ]
}   
var R = []
var alreadyLoadNumber = 0;
var mycanvas = document.getElementById("canvas");
var ctx = mycanvas.getContext("2d");
mycanvas.width = document.documentElement.clientWidth;
mycanvas.height = document.documentElement.clientHeight;
loadImage();


//开始游戏
function start(){
    var fno = 0;
    setInterval(function(){
        clear();
        fno++;
            // ctx.font = "16px 宋体";
            // ctx.fillText(fno,10,20);





    },20);
}

//清除画布
function clear(){
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
}

function loadImage(){
    for(var i = 0 ; i < imgArr.images.length ; i++){
        R[imgArr.images[i].name] = new Image();
        R[imgArr.images[i].name].src = imgArr.images[i].url;
        R[imgArr.images[i].name].onload = function(){
            alreadyLoadNumber++;
            document.getElementsByClassName('loader_tip')[0].innerHTML = "正在加载第" + alreadyLoadNumber + "/" + imgArr.images.length + "张图片，请稍后"
            if(alreadyLoadNumber == imgArr.images.length){
                setTimeout(function(){
                    document.getElementsByClassName("loader_box")[0].style.display = 'none';
                    document.getElementsByClassName("game_info")[0].style.display = 'block';
                    start();
                },1000);
            }
        }
    }
}