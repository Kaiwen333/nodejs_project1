(function () {
        var StaticMoney = window.StaticMoney = function () {
                this.image = game.R.m0;
                this.x = 0;
                this.y = 0;
                this.scale = 0.7
                this.topHeight = 0;
                this.initImageSize();
                game.count++;
                game.moneyArr.push(this);

        }
        StaticMoney.prototype.initImageSize = function () {
                this.allheight = game.canvas.height;
                this.allwidth = game.canvas.width;

                this.sw = this.image.width; //切片在图片中的宽
                this.sh = this.image.height * this.scale; //切片在图片中的宽
                this.sx = 0; //切片x坐标
                this.sy = 0; //切片y坐标
                this.dw = this.allwidth * 0.7; //切片在画布上的宽度

                this.dh = (this.dw / this.sw) * this.sh; //切片在画布上高度
                this.dx = (this.allwidth - this.dw) / 2; //切片在画布上x坐标
                this.dy = this.allheight - this.dh - this.topHeight; //切片在画布上y坐标
        }
        //更新
        StaticMoney.prototype.update = function () {
                this.scale += 0.05;
                if (this.scale >= 1) {
                        this.scale = 1
                        this.topHeight += 30;
                };

                this.initImageSize();
        }
        //渲染
        StaticMoney.prototype.render = function () {

                game.ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);

        }

})();