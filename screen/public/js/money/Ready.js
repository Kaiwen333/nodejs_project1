(function () {
    //准备页面
    var Ready = window.Ready = function () {
        this.y = 0;     // 箭头和手向上移动的变化量
    }
    Ready.prototype.update = function () {
        //每帧向上移动2
        this.y += 2;
        if (this.y > 100) {
            this.y = 0;
        }
    }
    Ready.prototype.render = function () {
        // 保存当前状态
        game.ctx.save();
        // 添加一个黑色蒙层
        game.ctx.fillStyle = "rgba(0,0,0,0.5)";
        game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
        //添加手和一个向上的箭头
        game.ctx.drawImage(game.R["sou"], game.canvas.width / 2, game.canvas.height * 0.7 - this.y, 80, 80);
        game.ctx.drawImage(game.R["jt"], game.canvas.width / 2 - 75, game.canvas.height * 0.4 - this.y, 150, 225);
        game.ctx.drawImage(game.R["tit"], 0, 20, game.canvas.width, game.canvas.width / game.R["tit"].width * game.R["tit"].height);
        //恢复上一个状态
        game.ctx.restore();
    }


    //准备动画
    var ReadyAnimation = window.ReadyAnimation = function () {
        this.readycount = [
            game.R["three"],
            game.R["two"],
            game.R["one"]
            
        ]
        this.imgScale = 3;
        this.coutFno = 0;
        this.imgIndex = 0;
    }

    ReadyAnimation.prototype.update = function () {
        this.coutFno ++ ;
        this.imgScale -= 0.1
        if(this.imgScale <= 1){
            this.imgScale = 1 ;
        }
    }

    ReadyAnimation.prototype.render = function () {
        var self = this;
        var imgWidth = 60 * self.imgScale;
        var imgHeight = 120* self.imgScale
        game.ctx.save();
        // 添加一个黑色蒙层
        game.ctx.fillStyle = "rgba(0,0,0,0.5)";
        game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
        //倒计时数字 

        game.ctx.drawImage(self.readycount[self.imgIndex],game.canvas.width / 2 - imgWidth / 2, game.canvas.height * 0.5,imgWidth , imgHeight);

        game.ctx.restore();
    }

})();