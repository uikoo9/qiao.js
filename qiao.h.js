/**
 * qiao.h.js
 * html5+相关封装
 */
var qiao = {};

// qiao.on
qiao.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};

// page相关
qiao.normalStyle = {top:'45px',bottom:0};
qiao.normalPage = function(id){
	return qiao.page(id, {styles : qiao.normalStyle});
};
qiao.centerStyle = {top:'45px',bottom:'50px'};
qiao.centerPage = function(id){
	return qiao.page(id, {styles:qiao.centerStyle});
};
qiao.page = function(id, options){
	var url = id + '.html';
	
	options.id = id;
	options.url = url;
	return options;
};
qiao.indexPage = function(){
	return plus.webview.getWebviewById(plus.runtime.appid);
};
qiao.currentPage = function(){
	return plus.webview.currentWebview();
};
qiao.getPage = function(id){
	return id ? plus.webview.getWebviewById(id) : null;
};
qiao.show = function(id, ani, time, func){
	if(id) plus.webview.show(id, ani, time, func);
};
qiao.hide = function(id, ani, time){
	if(id) plus.webview.hide(id, ani, time);
};
qiao.fire = function(id, name, values){
	mui.fire(qiao.getPage(id), name, values);
};

// 以下为UI封装------------------------------------------------------------------------------
// qiao.tip
qiao.tip = function(msg, options){
	plus.nativeUI.toast(msg,options);
};

// qiao.waiting
qiao.waiting = function(titile, options){
	plus.nativeUI.showWaiting(titile, options);
};
qiao.closeWaiting = function(){
	plus.nativeUI.closeWaiting();
};

// popover
qiao.pop = function(){
	mui('.mui-popover').popover('toggle');
};

// actionsheet
qiao.sheet = function(title, btns,func){
	if(title && btns && btns.length > 0){
		var btnArray = [];
		for(var i=0; i<btns.length; i++){
			btnArray.push({title:btns[i]});
		}
		
		plus.nativeUI.actionSheet({
			title : title,
			cancel : '取消',
			buttons : btnArray
		}, function(e){
			if(func) func(e);
		});
	}
};

// 提示框相关
qiao.modaloptions = {
		title 	: 'title',
		abtn	: '确定',
		cbtn	: ['确定','取消'],
		content	: 'content'
};
qiao.alert = function(options, ok){
	var opt = $.extend({}, qiao.modaloptions);
	
	opt.title = '提示';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.alert(opt.content, function(e){
		if(ok) ok();
	}, opt.title, opt.abtn);
};
qiao.confirm = function(options, ok, cancel){
	var opt = $.extend({}, qiao.modaloptions);
	
	opt.title = '确认操作';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.confirm(opt.content, function(e){
		var i = e.index;
		if(i == 0 && ok) ok();
		if(i == 1 && cancel) cancel();
	}, opt.title, opt.cbtn);
};
qiao.prompt = function(options, ok, cancel){
	var opt = $.extend({}, qiao.modaloptions);
	
	opt.title = '输入内容';
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	plus.nativeUI.prompt(opt.content, function(e){
		var i = e.index;
		if(i == 0 && ok) ok(e.value);
		if(i == 1 && cancel) cancel(e.value);
	}, opt.title, opt.content, opt.cbtn);
};

// 以下为插件封装------------------------------------------------------------------------------
// 本地存储相关
qiao.length = function(){
	return plus.storage.getLength();
};
qiao.key = function(i){
	return plus.storage.key(i);
};
qiao.getItem = function(key){
	if(key){
		for(var i=0; i<qiao.length(); i++) {
			if(key == plus.storage.key(i)){
				return plus.storage.getItem(key);
			}
		};
	}
	
	return null;
};
qiao.insertItem = function(key, value){
	plus.storage.setItem(key, value);
};
qiao.delItem = function(key){
	plus.storage.removeItem(key);
};
qiao.clear = function(){
	plus.storage.clear();
};

// web sql
qiao.db = function(name, size){
	var db_name = name ? name : 'db_test';
	var db_size = size ? size : 2;
	
	return openDatabase(db_name, '1.0', 'db_test', db_size * 1024 * 1024);
};
qiao.update = function(db, sql){
	if(db &&sql) db.transaction(function(tx){tx.executeSql(sql);});
};
qiao.query = function(db, sql, func){
	if(db && sql){
		db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, results) {
				func(results);
			}, null);
		});
	}
};

// 以下为功能封装------------------------------------------------------------------------------
// 退出
qiao.exit = function(){
	qiao.confirm('确定要退出吗？', function(){
		plus.runtime.quit();
	});
};
// 刷新
qiao.endDown = function(selector){
	var sel = selector ? selector : '#refreshContainer';
	mui(sel).pullRefresh().endPulldownToRefresh();
};