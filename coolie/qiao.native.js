/**
 * qiao.native.js
 * 注：牛股王app和js交互代码
 */
define(function (require, exports, module) {
    'use strict';
    
    var qiao = require('qiao.util.js');
    var qiaong 	= require('qiao.ng.js');
    var ready = false;
    var readyCallbacks = [];
    var bridge;
    
	/**
	 * 初始化
	 * 需要在每个页面初始化时调用
	 */
	exports.init = function(){
		if(window.WebViewJavascriptBridge){
			exports.initCallback(window.WebViewJavascriptBridge);
		}else{
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				exports.initCallback(window.WebViewJavascriptBridge);
			}, false);
		}
	};
	exports.initCallback = function(b){
		ready = true;

		bridge = b;
		if(bridge.init) bridge.init(function(message, responseCallback){});
		
		readyCallbacks.forEach(function(callback){callback();});
	};
	
	/**
	 * ready
	 * bridge就位后开始执行
	 */
	exports.ready = function(callback){
		if(ready){
			return callback();
		}else{
			readyCallbacks.push(callback);
		}
	};
	
	/**
	 * 获取usertoken
	 */
	exports.utoken = function(callback){
		var usertoken = qiao.search('usertoken');
		if(usertoken){
			if(callback) callback(usertoken);
		}else if(typeof android != 'undefined'){
			if(callback && android.getUserToken) callback(android.getUserToken());
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'getUserToken',
					methodtype 	: 'getUserToken'
				});
				
				if(bridge.send){
					bridge.send(msg, function(responseData) {
						var utoken = '';
						
						if(responseData){
							var json = JSON.parse(responseData);
							if(json) utoken = json.usertoken;
						}
						
						if(callback) callback(utoken);
					});
				}
			});
		}
	};
	
	/**
	 * 获取gm相关token
	 */
	exports.gmflowno = 1;
	exports.getGMToken = function(callback){
		if(qiao.search('debug')){
			if(callback) callback({
				niuguToken	: 'i6aoORWJ07DGgfTVELASS2YxtqqJdO5Ypv4Wy7CPW-Q*',
				tradeToken	: '0GYXSTBL6JOOOOH63ASQ',
//				niuguToken	: 'KVNjMoqa7mCPGp2qaS97gslijo7NLAnXjaRLZCUksl0z2VGLvjSnWQ**',
//				tradeToken	: 'WIYQT4NNTMD94DUOVWQW',
				flowno		: exports.gmflowno++
			});
		}else if(typeof android != 'undefined'){
			if(callback && android.getGMToken){
				var jsonstr = android.getGMToken();
				if(jsonstr) callback(JSON.parse(jsonstr));
			}
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'getGMToken',
					methodtype 	: 'getGMToken'
				});
				
				if(bridge.send){
					bridge.send(msg, function(responseData) {
						if(callback) callback(responseData ? JSON.parse(responseData) : {});
					});
				}
			});
		}
	};
	
	/**
	 * 返回页面的时候是否刷新当前页面
	 * type=1，刷新
	 * type=0，不刷新
	 */
	exports.initRefresh = function(type){
		if(typeof android != 'undefined'){
			if(android.initRefresh) android.initRefresh(type);
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'initRefresh',
					methodtype 	: 'initRefresh',
					type 		: type
				});
				
				if(bridge.send) bridge.send(msg);
    			if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 关闭当前页面
	 */
	exports.closePage = function(){
		if(typeof android != 'undefined'){
			if(android.closePage) android.closePage();
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'closePage',
					methodtype 	: 'closePage'
				});
				
				if(bridge.send) bridge.send(msg);
    			if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 跳转到登录页面
	 */
	exports.login = function(){
		if(typeof android != 'undefined'){
			if(android.login) android.login();
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'login',
					methodtype 	: 'login'
				});
				
				if(bridge.send) bridge.send(msg);
    			if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 跳转到港美股账户页
	 */
	exports.toGMDetail = function(fundaccount){
		if(typeof android != 'undefined'){
			if(android.toGMDetail) android.toGMDetail(fundaccount);
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'toGMDetail',
					methodtype 	: 'toGMDetail',
					fundaccount	: fundaccount
				});
				
				if(bridge.send) bridge.send(msg);
    			if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 输入交易密码
	 */
	exports.toGMTradepwd = function(){
		if(typeof android != 'undefined'){
			if(android.toGMTradepwd) android.toGMTradepwd();
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'toGMTradepwd',
					methodtype 	: 'toGMTradepwd'
				});
				
				if(bridge.send) bridge.send(msg);
				if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 常用-绑定手机页面
	 */
	exports.bindMobile = function(){
		if(typeof android != 'undefined'){
			if(android.bindMobile) android.bindMobile();
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'bindMobile',
					methodtype 	: 'bindMobile'
				});
				
				if(bridge.send) bridge.send(msg);
    			if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * A股-模拟组合页面
	 */
	exports.toVirtualAccount = function(accountId, userId){
		if(typeof android != 'undefined'){
			if(android.toVirtualAccount) android.toVirtualAccount(accountId, userId);
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'toVirtualAccount',
					methodtype 	: 'toVirtualAccount',
					accountId	: accountId,
					userId		: userId
				});
				
				if(bridge.send) bridge.send(msg);
				if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * A股-开户券商列表
	 */
	exports.toOpenAccount = function(){
		if(typeof android != 'undefined'){
			if(android.toOpenAccount) android.toOpenAccount();
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'toOpenAccount',
					methodtype 	: 'toOpenAccount'
				});
				
				if(bridge.send) bridge.send(msg);
    			if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * A股-某一券商开户页面
	 */
	exports.openStockAccount = function(bid, burl, bchannel, bpackage, bscheme){
		if(typeof android != 'undefined'){
			if(android.toOpenOneAccount) android.toOpenOneAccount(bid, burl, bchannel, bpackage, bscheme);
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'openStockAccount',
					methodtype 	: 'openStockAccount',
					bid			: bid
				});
				
				if(bridge.send) bridge.send(msg);
				if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};

	/**
	 * 港美股-模拟交易页面
	 */
	exports.toVirtualForeignAccount = function(accountId){
		if(typeof android != 'undefined'){
			if(android.toVirtualForeignAccount) android.toVirtualForeignAccount(accountId);
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'toVirtualForeignAccount',
					methodtype 	: 'toVirtualForeignAccount',
					accountId	: accountId
				});
				
				if(bridge.send) bridge.send(msg);
				if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 港美股-开户方法
	 * 调用，无返回
	 */
	exports.startToKaihu = function(){
		if(typeof android != 'undefined'){
			if(android.startToKaihu) android.startToKaihu();
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method		: 'startToKaihu',
					methodtype	: 'startToKaihu'
				});
				
				if(bridge.send) bridge.send(msg);
    			if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 港美股-判断是否在交易页面
	 * 调用，返回
	 */
	exports.loadKaihuInTrade = function(callback){
		if(typeof android != 'undefined'){
			if(callback && android.loadKaihuInTrade) callback({status : android.loadKaihuInTrade()});
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method		: 'loadKaihuInTrade',
					methodtype	: 'loadKaihuInTrade'
				});
				
				if(bridge.send){
					bridge.send(msg, function(responseData) {
						if(callback) callback(responseData ? JSON.parse(responseData) : {});
					});
				}
			});
		}
	};
	
	/**
	 * 港美股-在交易页面开户
	 * 调用，无返回
	 */
	exports.startKaihuInTrade = function(s){
		var step = s ? s : 1;
		var url = 'http://openaccount.huanyingzq.com/embed/views/gmAccountOpen/' + qiaong.url['step' + (step + 1)];
		if(typeof android != 'undefined'){
			if(android.startKaihuInTrade) android.startKaihuInTrade(url);
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method		: 'startKaihuInTrade',
					methodtype 	: 'startKaihuInTrade',
					url			: url
				});
				
				if(bridge.send) bridge.send(msg);
				if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 基金-开户认证页面
	 */
	exports.toOpenFundAccount = function(){
		if(typeof android != 'undefined'){
			if(android.toOpenFundAccount) android.toOpenFundAccount();
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'toOpenFundAccount',
					methodtype 	: 'toOpenFundAccount'
				});
				
				if(bridge.send) bridge.send(msg);
				if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 基金-模拟交易页面
	 */
	exports.toVirtualFundAccount = function(accountId){
		if(typeof android != 'undefined'){
			if(android.toVirtualFundAccount) android.toVirtualFundAccount(accountId);
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'toVirtualFundAccount',
					methodtype 	: 'toVirtualFundAccount',
					accountId	: accountId
				});
				
				if(bridge.send) bridge.send(msg);
				if(bridge.sendMessage) bridge.sendMessage(msg);
			});
		}
	};
	
	/**
	 * 拨打电话
	 */
	exports.telPhone = function(tel){
		if(tel){
			if(typeof android != 'undefined'){
				if(android.telPhone) android.telPhone(tel);
			}else{
				location.href = 'tel:' + tel; 
			}
		}
	};
	
	/**
	 * 打开pdf
	 */
	exports.openPDF = function(filepath, filename){
		if(filepath && filename){
			if(typeof android != 'undefined'){
				if(android.openPDF) android.openPDF(filepath, filename);
			}else{
				location.href = filepath; 
			}
		}
	};
	
	/**
	 * 获取相机相册权限
	 */
	exports.getCameraPhoto = function(callback){
		if(qiao.search('debug')){
			callback({});
		}else if(typeof android != 'undefined'){
//			android.getCameraPhoto();
			callback({});
		}else{
			exports.ready(function(){
				var msg = JSON.stringify({
					method 		: 'getCameraPhoto',
					methodtype 	: 'getCameraPhoto'
				});
				
				if(bridge.send){
					bridge.send(msg, function(responseData) {
						if(callback) callback(responseData ? JSON.parse(responseData) : '');
					});
				}
			});
		}
	};
	
	/**
	 * 设置标题
	 */
	exports.setTitle = function(title){
		if(title){
			if(typeof android != 'undefined'){
				if(android.setWebTitle) android.setWebTitle(title);
			}else{
				exports.ready(function(){
					var msg = JSON.stringify({
						method 		: 'settitle',
						methodtype 	: 'settitle',
						title 		: title
					});
					
					if(bridge.send) bridge.send(msg);
	    			if(bridge.sendMessage) bridge.sendMessage(msg);
				});
			}
		}
	};
	
	/**
	 * 初始化分享
	 * title，分享标题
	 * content，分享描述
	 * url，分享地址
	 * type，
	 */
    exports.initShare = function(title, content, url, type){
    	if(typeof android != 'undefined'){
    		if(android.initShare) android.initShare(title, content, url, type);
    	}else{
    		exports.ready(function(){
    			var msg = JSON.stringify({
    				method 			: 'initShare',
    				methodtype 		: 'initShare',
    				shareTitle 		: title,
    				shareContent 	: content,
    				shareUrl	 	: url,
    				type 			: type
    			});
				
    			if(bridge.send) bridge.send(msg);
    			if(bridge.sendMessage) bridge.sendMessage(msg);
			});
    	}
    };
});