/*
* @Author: asus
* @Date:   2017-02-21 14:02:11
* @Last Modified by:   asus
* @Last Modified time: 2017-02-21 16:17:05
*/

'use strict';
(function(Fly){
	var Pipe = function( config ){
		this.ctx = config.ctx;
		this.cv = config.cv;
		this.imgUp = config.imgUp;
		this.imgDown = config.imgDown;
		this.imgW = this.imgUp.width;
		this.imgH = this.imgUp.height;
		this.x = config.x;
		this.y = config.y;
		this.pipeSpace = 150;
		this.speed = config.speed;
	}
	Pipe.prototype = {
		constructor : Pipe,	
		draw : function( delta ){
			this.x += this.speed * delta;
			if(this.x <= -this.imgW * 3){
				this.x += this.imgW * 3 * 9;
				this.y = Math.random() * 200 + 50 - this.imgH;
			}
			this.ctx.drawImage(this.imgUp,this.x,this.y,this.imgW,this.imgH)
			this.ctx.drawImage(this.imgDown,this.x,this.imgH + this.y + this.pipeSpace,this.imgW,this.imgH)

			this.ctx.rect(this.x,this.y,this.imgW,this.imgH);
			this.ctx.rect(this.x,this.imgH + this.y + this.pipeSpace,this.imgW,this.imgH);
		}
	}

	Fly.Pipe = Pipe;
})(Fly)