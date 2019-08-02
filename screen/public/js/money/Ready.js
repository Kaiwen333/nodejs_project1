(function () {
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

})();