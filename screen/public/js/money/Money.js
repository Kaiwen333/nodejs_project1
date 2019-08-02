(function () {
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

})();