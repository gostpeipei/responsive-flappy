/*
* @Author: asus
* @Date:   2017-02-21 15:47:30
* @Last Modified by:   asus
* @Last Modified time: 2017-02-21 22:48:27
*/

'use strict';
(function(Fly){
	//设置html的字体大小
	document.documentElement.style.fontSize = Fly.getClient().width/640 * 64+"px";

	var btn = document.getElementById('btn');
	var screen = document.getElementById('screen');
	var p = document.getElementById('p');
	var pause = document.getElementById('pause');
	var Game = function( id ){
		this.cv = Fly.createCv( id );
		this.ctx = this.cv.getContext('2d');
		this.imgList = ['birds','land','pipe1','pipe2','sky'];
		this.roleList = null;   //存放所有环境对象的数组;
		// this.status = {}     //存放暂停状态
		this.curTime = 0;
		this.gameContinue = false;
		this.birds = null;
		this.downEvt = null;
		this.upEvt = null;
		this.lastTime = null;
		this.delta = 0;
		this.render = null;
	}
	Game.prototype = {
		constructor : Game,

		start : function(){
			var that = this;
			Fly.loadImg(this.imgList,function(imgObj){

				// that.delta = 0;

				// that.lastTime = new Date();

				that._init( imgObj );

				that.draw( imgObj );

				that.bindEvent();

			})
		},

		over : function(){
			this.gameContinue = false;
			screen.style.display = 'block';
			btn.style.fontSize = "0.22rem";
			btn.innerHTML = "Try Again";
			p.innerHTML = "游戏结束";
		},

		_init : function( imgObj ){
			var that = this;
			this.roleList = [];
			// 创建小鸟
			this.birds = Fly.factory( 'birds',{
				ctx : this.ctx,
				cv : this.cv,
				img : imgObj.birds,
				land : imgObj.land
			})
			//给小鸟添加订阅者  Game为订阅者
			this.birds.addListener(function(){
				that.over();
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
					cv : this.cv,
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
			that.render = function(){
				if( that.gameContinue ){
					that.curTime = new Date();
					that.delta = that.curTime - that.lastTime; 
					that.lastTime = that.curTime;
				}
				that.ctx.clearRect(0,0,that.cv.width,that.cv.height);
				that.ctx.save();
				that.ctx.beginPath();

				//渲染环境
				that.roleList.forEach(function( role ){
					role.draw( that.delta )
				})

				//渲染小鸟
				that.birds.draw( that.delta )

				that.ctx.restore()

				//判断游戏结束
				// 超出顶部结束
				// if( that.birds.y <= 0 ){
				// 	that.over();
				// }
				// //落地结束
				// if( that.birds.y >= that.cv.height - imgObj.land.height - 15){
				// 	that.over();
				// }
				// //碰到管道结束
				// if( that.ctx.isPointInPath(that.birds.x + 10,that.birds.y + 15)){
				// 	that.over();
				// }
				if( that.gameContinue ){
					window.requestAnimationFrame( that.render );
				}
			}
					window.requestAnimationFrame( that.render );
		},

		bindEvent : function(){
			var that = this;
			if(Fly.getClient().width * 0.9 > 640){
				that.downEvt = 'mousedown';
				that.upEvt = 'mouseup';
			}else {
				that.downEvt = 'touchstart';
				that.upEvt = 'touchend';
			}

			this.cv.addEventListener(that.downEvt,function(e){
				e = e || window.event ;
				if(e.stopPropagation){
					e.stopPropagation;
				}else{
					e.cancleBubble;
				}
				that.birds.changeSpeed(-0.6);
			})

			btn.addEventListener(that.downEvt,function(e){
				e = e || window.event;
				if(e.stopPropagation){
					e.stopPropagation;
				}else{
					e.cancleBubble = true;
				}
				this.data = this.style.backgroundColor;
				this.style.backgroundColor = 'transparent';
				this.style.color = '#fff';
			})

			btn.addEventListener(that.upEvt,function(e){
				e = e || window.event;
				if(e.stopPropagation){
					e.stopPropagation;
				}else{
					e.cancleBubble = true;
				}
				this.style.backgroundColor = this.data;
				this.style.color = '#000';
				screen.style.display = "none";
				that.gameContinue = true;

				// //继续功能
				// if(p.innerHTML === "游戏暂停"){
				// 	Fly.loadImg(that.imgList,function(imgObj){
				// 		window.requestAnimationFrame( that.render );
				// 		that.gameContinue = true;
				// 		that.delta = that.status.pauseDelta;
				// 		that.lastTime = that.status.pauseTime;
				// 		// that.ctx.clearRect(0,0,that.cv.width,that.cv.height)
				// 		// that.ctx.beginPath();
				// 		// that._init( imgObj )
				// 		// that.draw( imgObj );
				// 	})
				// 	return
				// }

				//重新开始功能
				Fly.loadImg(that.imgList,function(imgObj){
					that.delta = 0;
					that.lastTime = new Date();
					that.ctx.clearRect(0,0,that.cv.width,that.cv.height)
					that.ctx.beginPath();
					that._init( imgObj )
					that.draw( imgObj );
				})
			})

			// pause.addEventListener(that.downEvt,function(e){
			// 	e = e || window.event;
			// 	if(e.stopPropagation){
			// 		e.stopPropagation;
			// 	}else{
			// 		e.cancleBubble = true;
			// 	}
			// 	//在状态对象中,存放当前状态
			// 	that.status.pauseTime = that.lastTime;
			// 	that.status.pauseDelta = that.delta;

			// 	that.gameContinue = false;


			// 	screen.style.display = 'block';
			// 	btn.style.fontSize = "0.25rem";
			// 	btn.innerHTML = "继续游戏";
			// 	p.innerHTML = "游戏暂停";

			// })


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