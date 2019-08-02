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
                "url": "/images/one.png"
            },
            {
                "name": "two",
                "url": "/images/two.png"
            },
            {
                "name": "three",
                "url": "/images/three.png"
            }

        ]
    }
    var Game = window.Game = function (params) {
        this.canvas = document.querySelector(params.canvasid);
        this.ctx = this.canvas.getContext("2d");
        // 初始化画布宽高
        this.init();
        var self = this;
        //当资源加载完成
        this.loadAllResource(function () {
            self.start(); // 进入游戏页面
        });

        this.startX = null; // 触摸开始的x坐标
        this.startY = null; // 触摸开始的y坐标
        this.endX = null; // 触摸结束的x坐标
        this.endY = null; // 触摸结束的y坐标

        this.count = 0; // 总计滑动次数
        this.time = 5; // 倒计时
        this.isStartGame = false; // 是否开始游戏标识
        this.moneyArr = []; // 钱数组

        // 触摸开始
        this.touchStart = function (e) {
            e.stopImmediatePropagation();
            self.startX = e.changedTouches[0].pageX;
            self.startY = e.changedTouches[0].pageY;
        }

        // 触摸结束
        this.touchEnd = function (e) {
            e.stopImmediatePropagation();
            self.endX = e.changedTouches[0].pageX;
            self.endY = e.changedTouches[0].pageY;
            if (self.endY < self.startY) {
                new Money()
            }
        }

        // 滑动
        this.touchMove = function (e) {
            e.preventDefault();
        }
    }
    //初始化画布宽高
    Game.prototype.init = function () {
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;
        if (windowW > 720) {
            windowW = 720
        }
        this.canvas.width = windowW;
        this.canvas.height = windowH;
    }

    // 加载图片
    Game.prototype.loadAllResource = function (callback) {
        this.R = {};
        var self = this;
        var alreadyLoadNumber = 0;

        // 遍历图片资源数组
        for (var i = 0; i < imgArr.images.length; i++) {
            self.R[imgArr.images[i].name] = new Image();
            self.R[imgArr.images[i].name].src = imgArr.images[i].url;
            self.R[imgArr.images[i].name].onload = function () {
                alreadyLoadNumber++;
                document.getElementsByClassName('loader_tip')[0].innerHTML = "正在加载第" + alreadyLoadNumber + "/" + imgArr.images.length + "张图片，请稍后"
                // 当所有图片加载完成时
                if (alreadyLoadNumber == imgArr.images.length) {
                    setTimeout(function () {
                        document.getElementsByClassName("loader_box")[0].style.display = 'none';
                        callback();
                    }, 1000);
                }
            }
        }
    }

    // 进入游戏页
    Game.prototype.start = function () {
        var self = this;
        //实例化场景管理
        self.sm = new SceneManager();
        //帧
        self.fno = 0;
        self.timer = setInterval(function () {
            self.fno++;
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            // 更新场景
            self.sm.update();
            // 渲染场景
            self.sm.render();
            self.canvas.addEventListener("touchmove", self.touchMove, { passive: false })
        }, 20);
    }

    // 开始游戏
    Game.prototype.startGame = function () {
        var self = this;
        var _time = self.time;

        // 若当前没有进行游戏
        if (!self.isStartGame) {
            // 开始游戏标识
            self.isStartGame = true;
            // 添加滑动监听
            self.canvas.addEventListener("touchstart", self.touchStart, { passive: true })
            self.canvas.addEventListener("touchend", self.touchEnd, { passive: true })
           
            // 显示剩余时间
            document.querySelector(".clock span").innerHTML = _time;
            var gameTimer = setInterval(function () {
                _time--;
                document.querySelector(".clock span").innerHTML = _time;
            }, 1000)

            // 游戏时间到
            setTimeout(function () {
                // 清除滑动监听
                self.canvas.removeEventListener("touchstart", self.touchStart, { passive: true })
                self.canvas.removeEventListener("touchend", self.touchEnd, { passive: true })

                clearInterval(gameTimer);
                // 游戏开始标识 
                self.isStartGame = false;
                self.enterGameState = false;
                self.sm.enter(4);

                
            }, self.time * 1000 + parseInt(Math.random() * 30 + 30))

        }
    }

    // 游戏结束
    Game.prototype.gameOver = function(){
        var self = this;
        
        self.showResultTk();
        document.querySelector(".game_frame_score span").innerHTML = self.count * 100;
        document.getElementsByClassName("game_frame_colse")[0].onclick = function(){
            self.closeResultTk();
        }
    }

    //显示结果弹框
    Game.prototype.showResultTk = function(){
        document.getElementsByClassName("game_mask")[0].style.display = 'block';
        document.getElementsByClassName("game_frame_wrap")[0].style.display = 'block';
        setTimeout(function(){
            document.getElementsByClassName("game_frame_bg")[0].style.transform = 'scale(1,1)';
        },40)
    }
    // 关闭结果弹框
    Game.prototype.closeResultTk = function(){
        var self = this;
        document.getElementsByClassName("game_frame_bg")[0].style.transform = 'scale(0,0)';
        setTimeout(function(){
            document.getElementsByClassName("game_mask")[0].style.display = 'none';
            document.getElementsByClassName("game_frame_wrap")[0].style.display = 'none';
            self.sm.enter(1);
        },800)
    }

})();