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


    var Background = window.Background = function () {
		//背景颜色 
		game.ctx.fillStyle = "#e84144"
		game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

		this.image = game.R.mb0;
		this.scale = 0.7

		this.sw = this.image.width;                     //切片在图片中的宽
		this.sh = this.image.height * this.scale;       //切片在图片中的高
		this.sx = 0;                                    //切片在图片中的x坐标
		this.sy = 0;                                    //切片在图片中的y坐标

		this.dw = game.canvas.width * 0.7;              //切片在画布上的宽度
		this.dh = (this.dw / this.sw) * this.sh;        //切片在画布上高度
		this.dx = (game.canvas.width - this.dw) / 2;    //切片在画布上x坐标
		this.dy = game.canvas.height - this.dh ;		//切片在画布上y坐标
		
	}
	Background.prototype.update = function () {

	}
	Background.prototype.render = function () {
		game.ctx.fillStyle = "#e84144"
		game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
		game.ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
	}

    var Money = window.Money = function () {
        this.image = game.R.m0;
        // 钱显示高度的比例
        this.scale = 0.7    
        // 图片向上移动的距离    
        this.topHeight = 0;     
        // 计算图片宽高
        this.initImageSize();  
        game.count++;
        game.moneyArr.push(this);

    }
    Money.prototype.initImageSize = function () {

        this.sw = this.image.width;                     //切片在图片中的宽
        this.sh = this.image.height * this.scale;       //切片在图片中的高
        this.sx = 0;                                    //切片在图片中的x坐标
        this.sy = 0;                                    //切片在图片中的y坐标

        this.dw = game.canvas.width * 0.7;                       //切片在画布上的宽度
        this.dh = (this.dw / this.sw) * this.sh;                 //切片在画布上高度
        this.dx = (game.canvas.width - this.dw) / 2;             //切片在画布上x坐标
        this.dy = game.canvas.height - this.dh - this.topHeight; //切片在画布上y坐标
    }
    //更新
    Money.prototype.update = function () {
        this.scale += 0.05;
        if (this.scale >= 1) {
                this.scale = 1
                this.topHeight += 30;
        };
        this.initImageSize();
    }
    //渲染
    Money.prototype.render = function () {
        game.ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);

    }


    //准备页面
    var Ready = window.Ready = function () {
        this.variation = 0; // 箭头和手向上移动的变化量
    }
    Ready.prototype.update = function () {
        //每帧向上移动2
        this.variation += 2;
        if (this.variation > 100) {
            this.variation = 0;
        }
    }
    Ready.prototype.render = function () {
        // 保存当前状态
        game.ctx.save();
        // 添加一个黑色蒙层
        game.ctx.fillStyle = "rgba(0,0,0,0.5)";
        game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
        //添加手和一个向上的箭头
        game.ctx.drawImage(game.R["sou"], game.canvas.width / 2, game.canvas.height * 0.7 - this.variation, 80, 80);
        game.ctx.drawImage(game.R["jt"], game.canvas.width / 2 - 75, game.canvas.height * 0.4 - this.variation, 150, 225);
        game.ctx.drawImage(game.R["tit"], 0, 20, game.canvas.width, game.canvas.width / game.R["tit"].width * game.R["tit"].height);
        //恢复上一个状态
        game.ctx.restore();
    }


    //准备动画
    var ReadyAnimation = window.ReadyAnimation = function () {
        // 数字图片
        this.readycount = [
            game.R["three"],
            game.R["two"],
            game.R["one"]
        ]
        // 图片扩大倍数
        this.imgScale = 4;  
        // 准备动画的帧数  
        this.coutFno = 0;   
        // 当前图片下标
        this.imgIndex = 0;
    }

    ReadyAnimation.prototype.update = function () {
        this.coutFno++;
        this.imgScale -= 0.1
        if (this.imgScale <= 1) {
            this.imgScale = 1;
        }
        // 每秒变换数字
        if (this.coutFno % 50 == 0 && this.imgIndex < 2) {
            this.imgIndex++;
            this.imgScale = 4;
        }
    }

    ReadyAnimation.prototype.render = function () {
        var self = this;
        var imgWidth = 100 * self.imgScale;
        var imgHeight = 167 * self.imgScale;
        game.ctx.save();
        // 添加一个黑色蒙层
        game.ctx.fillStyle = "rgba(0,0,0,0.5)";
        game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
        //倒计时数字 
        game.ctx.drawImage(self.readycount[self.imgIndex], game.canvas.width / 2 - imgWidth / 2, game.canvas.height * 0.5, imgWidth, imgHeight);
        game.ctx.restore();
    }


    var SceneManager = window.SceneManager = function () {
        //场景 1准备 2准备动画 3开始游戏 4结束页
        this.sceneNumber = 1;
        //实例化背景
        game.background = new Background();
        //实例化准备页面
        game.ready = new Ready();
        //实例化准备动画
        game.readyAnimation = new ReadyAnimation();
        //进入游戏状态
        game.enterGameState = false;

	}
	//更新
	SceneManager.prototype.update = function () {
        
    }
    
	//渲染
	SceneManager.prototype.render = function () {
        var self = this;
        switch(self.sceneNumber){
            case 1 : 
                //渲染背景
                game.background.render();
                game.ready.update();
                game.ready.render();
                break;
            case 2:
                //渲染背景
                game.background.render();
                game.readyAnimation.update();
                //渲染准备动画
                game.readyAnimation.render();
                break;
            case 3:
                //渲染背景
                game.background.render();
                //渲染钱
                for (var i = 0; i < game.moneyArr.length; i++) {
                    game.moneyArr[i].update();
                    game.moneyArr[i].render();
                }
                //显示总钱数
                document.querySelector(".price span").innerHTML = game.count * 100;
                break;
            case 4:
                //渲染背景
                game.background.render();
                for (var i = 0; i < game.moneyArr.length; i++) {
                    game.moneyArr[i].update();
                    game.moneyArr[i].render();
                }
                //显示总钱数
                document.querySelector(".price span").innerHTML = game.count * 100;
                break;
            default:
                break;
        }
    }
    //进入场景
    SceneManager.prototype.enter = function(number){
        var self = this;
        switch(number){
            case 1 : 
                self.sceneNumber = number;
                document.getElementsByClassName("game_info")[0].style.display = 'none';
                document.getElementsByClassName("game_frame_wrap")[0].style.display = 'none';
                break;
            case 2:
                if(!game.enterGameState){
                    self.sceneNumber = number;
                    document.getElementsByClassName("game_info")[0].style.display = 'none';
                    document.getElementsByClassName("game_mask")[0].style.display = 'none';
                    document.getElementsByClassName("game_frame_wrap")[0].style.display = 'none';
                    //准备动画
                    game.readyAnimation.imgIndex = 0;
                    game.readyAnimation.imgScale = 4;
                    game.readyAnimation.coutFno = 0;

                    //清除数据
                    game.count = 0;

                    game.enterGameState = true;
                    setTimeout(function(){
                        console.log(111);
                        self.enter(3);
                    },3000)
                }
                break;
            case 3:
                self.sceneNumber = number; 
                document.getElementsByClassName("game_info")[0].style.display = 'block';
                game.time = 5;      //倒计时
                game.startGame();
                break;
            case 4:
                self.sceneNumber = number; 
                
                document.getElementsByClassName("game_info")[0].style.display = 'block';
                setTimeout(function(){
                    game.gameOver();
                
                },400)
                break;
            default:
                break;
        }
    }

})();