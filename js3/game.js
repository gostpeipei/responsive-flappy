/*
* @Author: asus
* @Date:   2017-02-21 15:47:30
* @Last Modified by:   asus
* @Last Modified time: 2017-02-21 16:45:39
*/

'use strict';
(function(Fly){
	var Game = function( id ){
		this.cv = Fly.createCv( id );
		this.ctx = this.cv.getContext('2d');
		this.imgList = ['birds','land','pipe1','pipe2','sky'];
		this.roleList = [];   //存放所有环境对象的数组;
		this.lastTime = new Date();
		this.curTime = 0;
		this.gameContinue = true;
		this.birds = null;
		this.evt = null;
	}
	Game.prototype = {
		constructor : Game,

		start : function(){
			var that = this;
			Fly.loadImg(this.imgList,function(imgObj){
				
				that._init( imgObj );

				that.draw( imgObj );

				that.bindEvent();

			})
		},

		over : function(){
			this.gameContinue = false;
		},

		_init : function( imgObj ){
			// 创建小鸟
			this.birds = Fly.factory( 'birds',{
				ctx : this.ctx,
				img : imgObj.birds
			})
			//创建天空
			for(var i = 0; i < 3; i++){
				this.roleList.push(Fly.factory( 'sky',{
					ctx : this.ctx,
					img : imgObj.sky,
					x : imgObj.sky.width * i,
					speed : -0.2
				}))
			}

			//创建管道
			for(var i = 0; i < 9; i++){
				this.roleList.push(Fly.factory( 'pipe',{
					ctx : this.ctx,
					cv : cv,
					imgUp : imgObj.pipe2,
					imgDown : imgObj.pipe1,
					x : imgObj.pipe1.width * 3 * i + 300,
					y : Math.random() * 200 + 50 - imgObj.pipe1.height,
					speed : -0.2
				}))
			}

			//创建陆地
			for(var i = 0; i < 5; i++){
				this.roleList.push(Fly.factory( 'land',{
					ctx : this.ctx,
					cv : this.cv,
					img : imgObj.land,
					x : imgObj.land.width * i,
					speed : -0.2
				}))
			}
		},

		draw : function( imgObj ){
			var that = this;
			var render = function(){
				that.curTime = new Date();
				var delta = that.curTime - that.lastTime; 
				that.lastTime = that.curTime;

				that.ctx.clearRect(0,0,that.cv.width,that.cv.height);
				that.ctx.save();
				that.ctx.beginPath();

				//渲染环境
				that.roleList.forEach(function( role ){
					role.draw( delta )
				})

				//渲染小鸟
				that.birds.draw( delta )

				that.ctx.restore()

				//判断游戏结束
				//超出顶部结束
				if( that.birds.y <= 0 ){
					that.over();
				}
				//落地结束
				if( that.birds.y >= that.cv.height - imgObj.land.height - 15){
					that.over();
				}
				//碰到管道结束
				if( that.ctx.isPointInPath(that.birds.x,that.birds.y - 15)){
					that.over();
				}
				if( that.gameContinue ){
					window.requestAnimationFrame( render );
				}
			}
					window.requestAnimationFrame( render );
		},

		bindEvent : function(){
			var that = this;
			if(Fly.getClient().width * 0.9 > 640){
				that.evt = 'click'
			}else {
				that.evt = 'touchstart'
			}
			cv.addEventListener(that.evt,function(e){
				e = e || window.event ;
				e.preventDefault(); 
				that.birds.changeSpeed(-0.6);
			})
		}

	}



	var instance = null;
	Fly.singleGame = function(id){
		if(instance === null){
			instance = new Game( id );
		}
		return instance;
	}

	Fly.Game = Game;
})(Fly)