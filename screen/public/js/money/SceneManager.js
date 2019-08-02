(function () {
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