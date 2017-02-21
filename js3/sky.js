/*
* @Author: asus
* @Date:   2017-02-20 23:48:25
* @Last Modified by:   asus
* @Last Modified time: 2017-02-21 00:21:41
*/

'use strict';
(function(Fly){
	var Sky = function( config ){
		this.ctx = config.ctx;
		this.img = config.img;
		this.imgW = this.img.width;
		this.imgH = this.img.height;
		this.x = config.x || 0;
		this.y = 0;
		this.speed = config.speed;
	}
	Sky.prototype = {
		constructor : Sky,
		draw : function( delta ){
			this.x += this.speed * delta;
			if(this.x <= -this.imgW){
				this.x += this.imgW * 3;
			}
			this.ctx.drawImage(this.img,this.x,this.y,this.imgW,this.imgH)
		}
	}

	Fly.Sky = Sky;
})(Fly)