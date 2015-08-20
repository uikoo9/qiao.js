define(function (require, exports, module) {
    'use strict';

    exports.on = function(obj, event, func){
    	$(document).off(event, obj).on(event, obj, func);
    };
    
    exports.is = function(str, type){
    	if(str && type){
    		if(type == 'number') return /^\d+$/g.test(str);
    		if(type == 'mobile') return /^1\d{10}$/g.test(str);
    	}
    };
    
    exports.end = function(end, $d, $c){
    	if(end){
    		var $d = $d || $(window);
    		var $c = $c || $(document);
    		
    		$d.scroll(function(){if($d.scrollTop() + $d.height() >= $c.height()) end();});
    	}else{
    		$(window).scroll(null);
    	}
    };
    
    exports.local = function(key, value){
    	if(typeof value == 'undefined'){
    		return $.cookie(key);
    	}else if(value == null){
    		$.cookie(key, value, {path:'/', expires: -1});
    	}else{
    		$.cookie(key, value, {path:'/', expires:1});
    	}
    };
    
    exports.ajaxoptions = {
		url 	: '',
		data 	: {},
		type 	: 'post',
		dataType: 'json',
		async 	: true
	};
	exports.ajaxopt = function(options){
		var opt = $.extend({}, exports.ajaxoptions);
		if(typeof options == 'string'){
			opt.url = options;
		}else{
			$.extend(opt, options);
		}
		
		return opt;
	};
	exports.ajax = function(options, func){
		if(options){
			var opt = exports.ajaxopt(options);
			$.ajax(opt).done(function(obj){
				if(func) func(obj);
			}).fail(function(){
				alert('数据传输错误！');
			});
		}
	};
	
	// 业务
	exports.hideHeader = function(){
		var s = location.search;
		if(s && s.indexOf('isapp=1') > 0) exports.local('niuguwang_isapp', 'yes');
		
		var isapp = exports.local('niuguwang_isapp');
		if(isapp && isapp == 'yes') $('header').hide();
	};
	
	exports.title = function(){
		var title = $('#mytitle').val();
		if(title){
	        if(window.WebViewJavascriptBridge){
	        	WebViewJavascriptBridge.sendMessage('setwebtitle$' + title);
			}else{
				document.addEventListener('WebViewJavascriptBridgeReady',function onBridgeReady(){
					WebViewJavascriptBridge.sendMessage('setwebtitle$' + title);
				}, false);
			}

			if(typeof android != 'undefined'){
				var ss = title.split('-');
				if(ss.length == 2){
					android.setWebTitle(ss[0], ss[1]);
				}else{
					android.setWebTitle(ss[0], '');
				}
			}
		}
	};
	
	// 立即调用
	exports.hideHeader();
	exports.title();
});