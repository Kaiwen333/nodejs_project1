(function () {
    //图片
    var imgArr = {
        "images": [{
                "name": "d0",
                "url": "/images/d0.png"
            },
            {
                "name": "m0",
                "url": "/images/m0.png"
            },
            {
                "name": "mb0",
                "url": "/images/mb0.png"
            },
            {
                "name": "share_tip",
                "url": "/images/share_tip.png"
            },
            {
                "name": "splashtitle",
                "url": "/images/splashtitle.png"
            },
            {
                "name": "starttip",
                "url": "/images/starttip.png"
            },
            {
                "name": "tmbg",
                "url": "/images/tmbg.png"
            },
            {
                "name": "tmicon",
                "url": "/images/tmicon.png"
            },
            {
                "name": "sou",
                "url": "/images/sou2.png"
            },
            {
                "name": "jt",
                "url": "/images/jt.png"
            },
            {
                "name": "tit",
                "url": "/images/tit.png"
            },
            {
                "name": "one",
                "url": "/images/1.png"
            },
            {
                "name": "two",
                "url": "/images/2.png"
            },
            {
                "name": "three",
                "url": "/images/3.png"
            }

        ]
    }
    var Game = window.Game = function (params) {
        this.canvas = document.querySelector(params.canvasid);
        //上下文
        this.ctx = this.canvas.getContext("2d");
        //初始化画布宽高
        this.init();
        var self = this;
        //资源加载完成
        this.loadAllResource(function () {
            //进入游戏
            self.start();
            // self.startGame();
        });

        this.startX = null;
        this.startY = null;
        this.endX = null;
        this.endY = null;

        this.count = 0; //总计滑动次数
        this.time = 5; //倒计时
        this.isStartGame = false;   //是否开始游戏


        //触摸开始
        this.touchStart = function(e) {
            e.stopImmediatePropagation();
            self.startX = e.changedTouches[0].pageX;
            self.startY = e.changedTouches[0].pageY;
        }

        //触摸结束
        this.touchEnd = function(e) {
            e.stopImmediatePropagation();
            self.endX = e.changedTouches[0].pageX;
            self.endY = e.changedTouches[0].pageY;
            if (self.endY < self.startY) {
                new StaticMoney()
            }
            
        }

        //滑动
        this.touchMove = function(e) {
            e.preventDefault();
        }

    }

    Game.prototype.init = function () {
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;
        if (windowW > 720) {
            windowW = 720
        }
        this.canvas.width = windowW;
        this.canvas.height = windowH;
    }

    Game.prototype.loadAllResource = function (callback) {
        this.R = {};
        var self = this;
        var alreadyLoadNumber = 0;

        for (var i = 0; i < imgArr.images.length; i++) {
            self.R[imgArr.images[i].name] = new Image();
            self.R[imgArr.images[i].name].src = imgArr.images[i].url;
            self.R[imgArr.images[i].name].onload = function () {
                alreadyLoadNumber++;
                document.getElementsByClassName('loader_tip')[0].innerHTML = "正在加载第" + alreadyLoadNumber + "/" + imgArr.images.length + "张图片，请稍后"
                if (alreadyLoadNumber == imgArr.images.length) {
                    setTimeout(function () {
                        document.getElementsByClassName("loader_box")[0].style.display = 'none';
                        // document.getElementsByClassName("game_info")[0].style.display = 'block';
                        callback();
                    }, 1000);
                }
            }
        }
    }

    Game.prototype.start = function () {
        //实例化场景管理器
        this.sm = new SceneManager();
        
        //实例化背景
        // this.background = new Background();
        //帧
        this.fno = 0;
        //钱数组
        // this.moneyArr = [];

        var self = this;
        this.timer = setInterval(function () {
            self.fno++;
            //清除画布
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            
            self.sm.update();
			self.sm.render();
            //渲染背景
            // self.background.render();
            //渲染钱
            
            // for (var i = 0; i < self.moneyArr.length; i++) {
            //     self.moneyArr[i].update();
            //     self.moneyArr[i].render();
            // }
            //显示总钱数
            // document.querySelector(".price span").innerHTML = self.count * 100;
        

        }, 20);

    }
    
    Game.prototype.startGame = function(){
        var self = this;
        var _time = self.time;
        //若当前没有进行游戏
        if(!self.isStartGame){
            self.isStartGame = true;

            self.canvas.addEventListener("touchstart", self.touchStart,{passive: true})
            self.canvas.addEventListener("touchend",  self.touchEnd,{passive: true})
            self.canvas.addEventListener("touchmove",  self.touchMove, {passive: false})

           //剩余时间
            document.querySelector(".clock span").innerHTML = _time;
            
            // 计时器
            var gameTimer = setInterval(function(){
                _time -- ;
                document.querySelector(".clock span").innerHTML = _time;

            },1000)
         
            // 游戏时间到
            setTimeout(function(){
                self.canvas.removeEventListener("touchstart", self.touchStart,{passive: true})
                self.canvas.removeEventListener("touchend", self.touchEnd,{passive: true})
                self.canvas.removeEventListener("touchmove", self.touchMove, {passive: false})
                clearInterval(gameTimer);
                self.isStartGame = false;
            },self.time * 1000 + parseInt(Math.random() * 30 + 30))
    
        }
    }



})();