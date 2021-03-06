/*
* @Author: asus
* @Date:   2017-02-21 00:20:01
* @Last Modified by:   asus
* @Last Modified time: 2017-02-21 22:53:07
*/

'use strict';
(function(Fly){
	var Birds = function( config ){
		this.ctx = config.ctx;
		this.cv = config.cv;
		this.img = config.img;
		this.imgW = this.img.width/3;
		this.imgH = this.img.height;
		this.a = 0.0015;
		this.v = 0;
		this.y = 150;
		this.x = 100;
		this.imgIdx = 0;
		this.curAngle = 0;
		this.maxAngle = 45;
		this.maxV = 0.3

		this.listeners = [];   //小鸟是发布者
		this.land = config.land;
	}
	Birds.prototype = {
		constructor : Birds,
		draw : function( delta ){
			
			this.isDie();

			delta = delta || 0
			this.v += this.a * delta;
			this.y += this.v * delta + 0.5 * this.a * Math.pow(delta,2);
			this.curAngle = this.v/this.maxV * this.maxAngle
			if(this.v >= this.maxV){
				this.curAngle = this.maxAngle
			}else if(this.v <= -this.maxV){
				this.curAngle = -this.maxAngle
			}
			this.ctx.translate(this.x,this.y)
			this.ctx.rotate(Fly.toRadian(this.curAngle));
			this.ctx.drawImage(this.img,this.imgW * this.imgIdx++,0,this.imgW,this.imgH,-this.imgW/2,-this.imgH/2,this.imgW,this.imgH)
			this.imgIdx %= 3;

		},
		changeSpeed : function (speed){
			this.v = speed;
		},

		// 添加订阅者
		addListener : function( callback ){
			this.listeners.push( callback )   //将订阅者的方法添加到数组中
		},

		//判断小鸟碰撞
		isDie : function(){
			if(this.y <= 0 || this.y >= (this.cv.height - this.land.height - 15) || this.ctx.isPointInPath(this.x + 10,this.y + 15)){
				this.listeners.forEach(function(fn){
					fn();
				})
			}
		}
		
	}

	Fly.Birds = Birds;
})(Fly)