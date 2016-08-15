'use strict';

var request = require('request');
var crypto 	= require('crypto');
var mailer 	= require('nodemailer');

var config 	= require('../../config.json');
config		= config[config.env];


/**
 * client ip 
 */
exports.ip = function(req){
	return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

/**
 * vendor 
 */
exports.vendor = function(ua){
	var vendor = {};
	if(ua){
		vendor.mobile 	= /AppleWebKit.*Mobile.*/.test(ua);
		vendor.android	= /android/gi.test(ua);
		vendor.ios 		= /(iphone|ipad|ipod)/gi.test(ua);
		vendor.iphone 	= /iphone/gi.test(ua);
		vendor.ipad 	= /ipad/gi.test(ua);
		vendor.ipod 	= /ipod/gi.test(ua);
		vendor.weixin 	= /micromessenger/gi.test(ua);
		vendor.qq 		= / qq/gi.test(ua);
		vendor.qqb 		= /mqqbrowser/gi.test(ua);
		vendor.weibo 	= /weibo/gi.test(ua);
		var matched;
		if((matched = ua.match(/MSIE\s([\d\.]+)/)) || (matched = ua.match(/IEMobile\/([\d\.]+)/))){
			vendor.ie = true;
			vendor.version = matched[1];
		}
	}
	
	return vendor;
};

/**
 * json相关 
 */
exports.j = {};
exports.j.json = function(type, msg, obj){
	var json = {
		success : true,
		msg		: '',
		type	: '',
		object	: null
	};
	
	if(type) json.type = type;
	if(msg)	json.msg = msg;
	if(obj) json.obj = obj;
	
	return json;
};
exports.j.success = function(msg, obj){
	return exports.j.json('success', msg, obj);
};
exports.j.info = function(msg, obj){
	return exports.j.json('info', msg, obj);
};
exports.j.warning = function(msg, obj){
	return exports.j.json('warning', msg, obj);
};
exports.j.danger = function(msg, obj){
	return exports.j.json('danger', msg, obj);
};
exports.j.parse = function(err, body){
	return JSON.parse(err ? err : body); 
};

/**
 * encrypt相关 
 */
exports.crypto = {};
exports.crypto.key = function(appid){
	var key;
	
	var apps = config.apps;
	for(var i=0; i<apps.length; i++){
		if(appid == apps[i].id) key = apps[i].key;
	}
	
	return key;
};
exports.crypto.tdes = function(txt, key, iv){
	var ivv = iv || '12345678';
	var cipher = crypto.createCipheriv('des-ede3-cbc', key, ivv);
	var res = cipher.update(txt, 'utf8', 'hex');
	res += cipher.final('hex');
	
	return res;
};
exports.crypto.tdesd = function(txt, key, iv){
	var ivv = iv || '12345678';
	var decipher = crypto.createDecipheriv('des-ede3-cbc', key, ivv);
	var res = decipher.update(txt, 'hex', 'utf8');
	res += decipher.final('utf8'); 
	
	return res;
};

/**
 * mail相关 
 */
exports.mail = {};
exports.mail.transporter = mailer.createTransport(config.mail);
exports.mail.send = function(options){
	exports.mail.transporter.sendMail(options, function(error, info){
	    if(error){
	        console.log(error);
	    }else{
	        console.log('Message sent: ' + info.response);
	    }
	});
};

/**
 * db相关 
 */
exports.db = {};
exports.db.info = function(){
	var c = config;
	return c['db_' + c.env];
};
exports.db.con = function(pool, cb){
	pool.getConnection(function(err, connection) {
		if(err){
			console.log(err);
			return;
		}
		
		if(cb) cb(connection);
		
		connection.release();
	});
};

/**
 * weixin相关 
 */
exports.weixin = {};
exports.weixin.url = {
	urlForWebLogin 		: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
	urlForWebLoginPC	: 'https://open.weixin.qq.com/connect/qrconnect?',
	urlForWebLoginAC	: 'https://api.weixin.qq.com/sns/oauth2/access_token?',
	urlForWebLoginInfo	: 'https://api.weixin.qq.com/sns/userinfo?',
};
exports.weixin.weblogin = function(uri, type, param){
	var ispc = type == 'snsapi_login';
	var url = ispc ? exports.weixin.url.urlForWebLoginPC : exports.weixin.url.urlForWebLogin;
	var appid = ispc ? config.weixin.openappid : config.weixin.appid;

	var ss = [];
	ss.push(url);
	ss.push("appid=" + appid);
	ss.push("&redirect_uri=" + decodeURI(uri));
	ss.push("&response_type=code");
	ss.push("&scope=" + type);
	if(param) ss.push("&state=" + param);
	ss.push("#wechat_redirect");
	
	return ss.join('');
};
exports.weixin.webloginbase = function(uri, param){
	return exports.weixin.weblogin(uri, 'snsapi_base', param);
};
exports.weixin.weblogininfo = function(uri, param, flag){
	var type = flag ? 'snsapi_userinfo' : 'snsapi_login';
	return exports.weixin.weblogin(uri, type, param);
};
exports.weixin.webloginaccesstoken = function(code, flag, cb){
	var appid = flag ? config.weixin.appid : config.weixin.openappid;
	var secret = flag ? config.weixin.secret : config.weixin.opensecret;
	
	var url = exports.weixin.url.urlForWebLoginAC + "appid=" + appid + "&secret=" + secret + "&code=" + code + "&grant_type=authorization_code";
	request.get(url, function(err, response, body){
		if(cb) cb(JSON.parse(body));
	});
};
exports.weixin.webloginuserinfo = function(ac, openid, cb){
	var url = exports.weixin.url.urlForWebLoginInfo + "access_token=" + ac + "&openid=" + openid + "&lang=zh_CN";
	request.get(url, function(err, response, body){
		if(cb) cb(JSON.parse(body));
	});
};