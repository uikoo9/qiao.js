/**
 * qiao.js
 * 注：需要引入jquery
 * 1.qiao.on
 * 2.qiao.ajax
 * 3.qiao.is
 */
var qiao = {};

/**
 * qiao.on
 * 事件绑定
 */
qiao.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};

/**
 * qiao.ajax
 * 对$.ajax的封装
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

/**
 * qiao.is
 * 一些常用的判断，例如数字，手机号等
 */
qiao.is = function(str, type){
	if(str && type){
		if(type == 'number') return /^\d+$/g.test(str);
		if(type == 'mobile') return /^1\d{10}$/g.test(str);
	}
};

/**
 * qiao.totop
 * 返回顶部的方法
 * 可以参考：plugins/_01_qtotop/qtotop.html
 */
qiao.totop = function(el){
	var $el = $(el);
	$el.hide().click(function(){
		$('body, html').animate({scrollTop : '0px'});
	});
	
	var $window = $(window);
	$window.scroll(function(){
		if ($window.scrollTop()>0){
			$el.fadeIn();
		}else{
			$el.fadeOut();
		}
	});
};
