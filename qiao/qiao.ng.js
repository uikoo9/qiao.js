define(function (require, exports, module) {
    'use strict';
    
    // import
    var qiao = require('qiao.js');
    var qiaoam = require('qiao.am.js');
    
    exports.formatDate = function(date, format){
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(), 
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return format;
    };
    
    exports.md5 = function(msg){
    	var hash = CryptoJS.MD5(msg);
    	return hash ? hash.toString() : null;
    };
    exports.encode = function(msg){
    	var key = 'niugu123niugu456niugu123';
    	var iv = '12312300';

    	var msgHex = CryptoJS.enc.Utf8.parse(msg);
    	var keyHex = CryptoJS.enc.Utf8.parse(key);
    	var ivHex = CryptoJS.enc.Utf8.parse(iv);

    	var encrypted = CryptoJS.TripleDES.encrypt(msgHex, keyHex, {
    		mode: CryptoJS.mode.CBC,
    		padding: CryptoJS.pad.Pkcs7,
    		iv: ivHex
    	});
    	
    	var res = CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
    	return res.toUpperCase();
    };
    exports.decode = function(msg){
    	var key = 'niugu123niugu456niugu123';
    	var iv = '12312300';

    	var msgHex = CryptoJS.enc.Hex.parse(msg);
    	var keyHex = CryptoJS.enc.Utf8.parse(key);
    	var ivHex = CryptoJS.enc.Utf8.parse(iv);
    	
    	var decrypted = CryptoJS.TripleDES.decrypt({
    		ciphertext: msgHex
    	}, keyHex, {
    		mode: CryptoJS.mode.CBC,
    		padding: CryptoJS.pad.Pkcs7,
    		iv: ivHex
    	});
    	
    	return CryptoJS.enc.Utf8.stringify(decrypted);
    };
    
    exports.tradeno = function(){
    	var no = qiao.local('niuguwang_no');
    	qiao.local('niuguwang_no', no ? new String(parseInt(no) + 1) : '1');

    	return qiao.local('niuguwang_no');
    };
    
    exports.action = function(func){
    	qiaoam.loading('open');
    	setTimeout(func, 20);
    };
    
    exports.trade = function(options, callback){
    	// opt
    	var opt = {
    		ver			: '1.0',
    		stockdealer : 'homs'
    	};
    	var date = new Date();
    	opt.flowno = parseInt(exports.tradeno());
    	opt.tick = date.getTime();
    	opt.biztime = exports.formatDate(date, 'yyyyMMdd hh:mm:ss');
    	
    	// extend
    	$.extend(opt, options);
    	
    	// en1 and en2
    	if(opt.en1) opt.en2 = exports.md5(opt.en1 + "-niuguwang-" + opt.tick);
    	if(opt.newen1) opt.en1 = opt.newen1;

    	// uid
    	var uid = qiao.local('niuguwang_uid');
    	if(!opt.userID && uid) opt.userID = uid;
    	if(!opt.userID) opt.userID = -1;

    	// utoken
    	var utoken = qiao.local('niuguwang_utoken');
    	if(!opt.utoken && utoken) opt.usertoken = utoken;

    	// tradecert
    	var tradecert = qiao.local('niuguwang_cert');
    	if(!opt.tradecert && tradecert) opt.tradecert = tradecert;

    	var tradeJson = JSON.stringify(opt);
    	var tradeCheck = exports.md5(tradeJson);
    	var tradeParam = exports.encode(tradeJson);
    	
    	$.ajax({
    		url: 'https://www.jinniu360.com/trade/trade.ashx',
    		data: {param: tradeParam, check: tradeCheck},
    		type: 'post',
    		crossDomain: true
    	}).done(function(res){
    		qiaoam.loading('close');
    		var tradeRes = exports.decode(res);
    		callback(tradeRes ? eval('(' + tradeRes + ')') : null);
    	}).fail(function(json){
    		qiaoam.loading('close');
    		qiaoam.alert('数据传输错误，请重试！');
    	});
    };
    
    exports.sinabankbind = function(func){
    	var bankCode = qiao.local('niuguwang_bankcode');
    	var bankNum = qiao.local('niuguwang_banknum');
    	var bankMobi = qiao.local('niuguwang_bankmobi');
    	var fcity = qiao.local('niuguwang_fcity');
    	var scity = qiao.local('niuguwang_scity');
    	
    	exports.trade({
    		bizcode : 'sina_bindbankcard', 
    		bankCode : bankCode,
    		bankAccount : bankNum,
    		phoneNo : bankMobi,
    		provinceName : fcity,
    		cityName: scity
    	}, function(json){
    		if(func) func(json);
    	});
    };
    exports.sinabankcharge = function(func){
    	var bankMoney = qiao.local('niuguwang_bankmoney');
    	var bankCardid = qiao.local('niuguwang_bankcardid');
    	
    	exports.trade({
    		bizcode:'sina_deposit',
    		moneyValue:bankMoney,
    		cardID:bankCardid
    	}, function(json){
    		if(func) func(json);
    	});
    };
});








/**
 * 部分业务代码
 * 
qiao.ng.hideHeader = function(){
	var s = location.search;
	if(s && s.indexOf('isapp=1') > 0) qiao.cookie('niuguwang_isapp', 'yes');
	
	var isapp = qiao.local('niuguwang_isapp');
	if(isapp && isapp == 'yes') $('header').hide();
};
qiao.ng.title = function(){
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
$(function(){
	qiao.ng.title();
	qiao.ng.hideHeader();
});
 */