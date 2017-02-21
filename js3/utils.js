/*
* @Author: asus
* @Date:   2017-02-20 23:48:34
* @Last Modified by:   asus
* @Last Modified time: 2017-02-21 17:15:16
*/

'use strict';
(function(window){
	var Fly = {}
	var instance = null;
	Fly.toRadian = function(angle){
		return angle/180 * Math.PI;
	}
	Fly.toAngle = function(radian){
		return radian/Math.PI * 180;
	}

	Fly.loadImg = function(imgList,callback){
		var imgObj = {},
			loaded = 0;
		imgList.forEach(function(val){
			var img = new Image();
			img.src = 'fy/'+ val +'.png';
			img.addEventListener('load',function(){
				loaded++;
				imgObj[val] = img ;
				if(loaded >= imgList.length){
					callback(imgObj);
				}
			})
		})	
	}

	Fly.createCv = function(id){
		var cv = document.createElement('canvas');
		cv.width = 1200;
		cv.height = 600;
		cv.style.width = Fly.getClient().width * 0.9 + "px";
		var dv = document.getElementById(id);
		dv.appendChild(cv);
		return cv;
	}

	Fly.getClient = function(){
		return {
			width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
			height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
		}
	}

	// 工厂模式，用来创建所有的对象
	Fly.factory = function( name,config ){
		switch (name){
			case 'birds':
				return new Fly.Birds( config );
			case 'sky':
				return new Fly.Sky( config );
			case 'pipe':
				return new Fly.Pipe( config );
			case 'land':
				return new Fly.Land( config );
		}
	}

	// 使用单例模式，保证整个游戏中，只有一个实例对象！
	Fly.createGame = function( id ) {
		if(instance === null) {
			instance = new Fly.Game(id);
		}
		return instance;
	};
	window.Fly = Fly;
})(window)