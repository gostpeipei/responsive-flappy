/*
* @Author: asus
* @Date:   2017-02-20 23:48:34
* @Last Modified by:   asus
* @Last Modified time: 2017-02-21 00:13:57
*/

'use strict';
(function(window){
	var Fly = {}

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
	window.Fly = Fly;
})(window)