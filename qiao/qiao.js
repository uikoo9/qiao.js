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