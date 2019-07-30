(function () {
	var Background = window.Background = function () {
		game.ctx.fillStyle = "#e84144"
		game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

		this.image = game.R.mb0;
		this.x = 0;
		this.y = 0;
		this.scale = 0.7

		this.sw = this.image.width; //切片在图片中的宽
		this.sh = this.image.height * this.scale; //切片在图片中的宽
		this.sx = 0; //切片x坐标
		this.sy = 0; //切片y坐标
		this.dw = game.canvas.width * 0.7; //切片在画布上的宽度
		this.dh = (this.dw / this.sw) * this.sh; //切片在画布上高度
		this.dx = (game.canvas.width - this.dw) / 2; //切片在画布上x坐标
		this.dy = game.canvas.height - this.dh; //切片在画布上y坐标


	}
	//更新
	Background.prototype.update = function () {

	}
	//渲染
	Background.prototype.render = function () {
		game.ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
		game.ctx.drawImage(this.image, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
	}
	//请准备页面
	Background.prototype.ready = function () {
		
	}

})();