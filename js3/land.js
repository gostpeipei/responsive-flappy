/*
* @Author: asus
* @Date:   2017-02-21 14:02:05
* @Last Modified by:   asus
* @Last Modified time: 2017-02-21 15:10:05
*/

'use strict';
(function(Fly){
	var Land = function( config ){
		this.ctx = config.ctx;
		this.cv = config.cv;
		this.img = config.img;
		this.imgW = config.img.width;
		this.imgH = config.img.height;
		this.x = config.x;
		this.y = this.cv.height - this.imgH;
		this.speed = config.speed;
	}
	Land.prototype = {
		constructor : Land,
		draw : function( delta ){
			this.x += this.speed * delta;
			if(this.x <= -this.imgW){
				this.x += this.imgW * 5;
			}
			this.ctx.drawImage(this.img,this.x,this.y,this.imgW,this.imgH)
		}
	}

	Fly.Land = Land;
})(Fly)