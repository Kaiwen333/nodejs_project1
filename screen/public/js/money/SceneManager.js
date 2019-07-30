(function () {
	var SceneManager = window.SceneManager = function () {
        //场景 1准备 
        this.sceneNumber = 2;
          
        //实例化背景
        game.background = new Background();
        game.ready = new Ready();
        game.readyAnimation = new ReadyAnimation();


	}
	//更新
	SceneManager.prototype.update = function () {
        
    }
    
	//渲染
	SceneManager.prototype.render = function () {
        switch(this.sceneNumber){
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
                game.readyAnimation.render();

                break;
            default:
                break;
        }

	}


})();