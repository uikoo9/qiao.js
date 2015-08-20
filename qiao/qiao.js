/**
 * 封装一些最基础常用的方法，
 * 需要引入jquery：http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js
 */
var qiao = {};

/**
 * qiao.ajax
 * 
 */
qiao.ajaxoptions = {
	url 		: '',
	data 		: {},
	type 		: 'post',
	dataType	: 'json',
	async 		: true,
	crossDomain	: false
};
qiao.ajaxopt = function(options){
	var opt = $.extend({}, qiao.ajaxoptions);
	if(typeof options == 'string'){
		opt.url = options;
	}else{
		$.extend(opt, options);
	}
	
	return opt;
};
qiao.ajax = function(options, success, fail){
	if(options){
		var opt = qiao.ajaxopt(options);
		
		$.ajax(opt).done(function(obj){
			if(success) success(obj);
		}).fail(function(e){
			if(fail){
				fail(e);
			}else{
				alert('数据传输失败，请重试！');
			}
		});
	}
};
//qiao.html = function(options, target){
//	var opt = qiao.ajaxopt(options);
//	opt.dataType = 'html';
//	
//	var obj = target ? target : '#cruddiv';
//	$(obj).empty().append(qiao.ajax(opt));
//};
//qiao.ajaxinit = function(){
//	qmask.hide();
//	$(document).ajaxStart(function(){
//		qmask.show();
//	});
//	$(document).ajaxStop(function(){
//		qmask.hide();
//	});
//};
//qiao.to = function(url){
//	if(url){
//		window.location.href = url;
//	}else{
//		alert('need url');
//	}
//};
//qiao.on = function(obj, event, func){
//	$(document).off(event, obj).on(event, obj, func);
//};
//qiao.is = function(str, type){
//	if(str && type){
//		if(type == 'number') return /^\d+$/g.test(str);
//		if(type == 'mobile') return /^1\d{10}$/g.test(str);
//	}
//};
//qiao.end = function(end, $d, $c){
//	if(end){
//		var $d = $d || $(window);
//		var $c = $c || $(document);
//		
//		$d.scroll(function(){if($d.scrollTop() + $d.height() >= $c.height()) end();});
//	}else{
//		$(window).scroll(null);
//	}
//};
//
//	exports.search = function(key){
//  	var res;
//  	
//  	var s = location.search;
//  	if(s){
//  		s = s.substr(1);
//  		if(s){
//  			var ss = s.split('&');
//  			for(var i=0; i<ss.length; i++){
//  				var sss = ss[i].split('=');
//  				if(sss && sss[0] == key) res = sss[1]; 
//  			}
//  		}
//  	}
//  	
//  	return res;
//  };
//  
//  exports.end = function(end, $d, $c){
//  	if(end){
//  		var $d = $d || $(window);
//  		var $c = $c || $(document);
//  		
//  		$d.scroll(function(){if($d.scrollTop() + $d.height() >= $c.height()) end();});
//  	}else{
//  		$(window).scroll(null);
//  	}
//  };
//  
//  exports.local = function(key, value){
//  	if(typeof value == 'undefined'){
//  		return $.cookie(key);
//  	}else if(value == null){
//  		$.cookie(key, value, {path:'/', expires: -1});
//  	}else{
//  		$.cookie(key, value, {path:'/', expires:1});
//  	}
//  };