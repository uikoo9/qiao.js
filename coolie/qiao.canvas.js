/**
 * qiao.canvas.js
 */
define(function (require, exports, module) {
    'use strict';
	
    var qiao = require('qiao.util.js');
    
    /**
     * 获取canvas，并设置宽高 
     */
    exports.canvas = function(id, width, height){
    	var canvas = document.getElementById(id);
    	if(canvas){
    		if(width) canvas.width = width;
    		if(height) canvas.height = height;
    	}
    	
    	return canvas;
    };
    
    /**
     * 获取2d对象 
     */
    exports.ctx = function(canvas){
    	return (canvas && canvas.getContext) ? canvas.getContext('2d') : null;
    };
    
    /**
     * 缓存context对象 
     */
    exports.c = {};
    
    /**
     * 2d绘画 
     */
    exports.draw = function(m, options){
    	if(!m || !options) return;
    	
    	// ctx
    	var c = options.c || exports.c;
    	if(!c) return;
    	
    	// color
    	var color = options.color;
    	if(color){
    		if(m == 'stroke') c.strokeStyle = color;
    		if(m == 'fill') c.fillStyle = color;
    	}
    	
    	var t = options.t;
    	
    	// rect
    	if(t == 'rect'){
    		if(m == 'stroke') c.strokeRect(options.x, options.y, options.w, options.h);
    		if(m == 'fill') c.fillRect(options.x, options.y, options.w, options.h);
    	} 
    	
    	// line
    	if(t == 'line'){
    		c.beginPath();
    		for(var i=0; i<options.a.length; i++){
    			var item = options.a[i];
    			
    			if(item.t == 'm') c.moveTo(item.x, item.y);
    			if(item.t == 'l') c.lineTo(item.x, item.y);
    			if(item.t == 'c') c.arc(item.x, item.y, item.r, item.b, item.e, item.flag);
    		}
            c.closePath();
            
            if(m == 'stroke') c.stroke();
            if(m == 'fill') c.fill();
    	}
    };
    
    /**
     * 线条
     */
    exports.stroke = function(options){
    	exports.draw('stroke', options);
    };
    
    /**
     * 线条-矩形 
     */
    exports.stroker = function(options){
    	if(!options) return;
    	
    	options.t = 'rect';
    	exports.draw('stroke', options);
    };
    
    /**
     * 线条-线条 
     */
    exports.strokel = function(options){
    	if(!options) return;
    	
    	options.t = 'line';
    	exports.draw('stroke', options);
    };
    
    /**
     * 填充 
     */
    exports.fill = function(options){
    	exports.draw('fill', options);
    };
    
    /**
     * 填充-矩形 
     */
    exports.fillr = function(options){
    	if(!options) return;
    	
    	options.t = 'rect';
    	exports.draw('fill', options);
    };
    
    /**
     * 填充-线条 
     */
    exports.filll = function(options){
    	if(!options) return;
    	
    	options.t = 'line';
    	exports.draw('fill', options);
    };
    
    /**
     * 清空 
     */
    exports.clear = function(options){
    	if(!options) return;
    	
    	// ctx
    	var c = options.c || exports.c;
    	if(!c) return;
    	
    	var t = options.t;
    	if(t == 'rect') c.clearRect(options.x, options.y, options.w, options.h);
    };
    
    /**
     * 清空-矩形
     */
    exports.clearr = function(options){
    	if(!options) return;
    	
    	options.t = 'rect';
    	exports.clear(options);
    };
    
    /**
     * 设置文字 
     */
    exports.text = function(options){
    	if(!options) return;
    	
    	// ctx
    	var c = options.c || exports.c;
    	if(!c) return;
    	
    	c.font = options.f || '10px sans-serif';
    	c.textAlign = options.ta || 'start';
    	c.textBaseline = options.tb || 'alphabetic';
    	c.direction = options.d || 'inherit';
    	
    	if(options.m == 'stroke') c.strokeText(options.t, options.x, options.y);
    	if(options.m == 'fill') c.fillText(options.t, options.x, options.y);
    };

    /**
     * 设置文字-stroke
     */
    exports.texts = function(options){
    	if(!options) return;
    	
    	options.m = 'stroke';
    	exports.text(options);
    };
    
    /**
     * 设置文字-fill
     */
    exports.textf = function(options){
    	if(!options) return;
    	
    	options.m = 'fill';
    	exports.text(options);
    };
});