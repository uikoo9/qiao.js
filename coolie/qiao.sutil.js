'use strict';

/**
 * config 
 */
exports.config = require('../../static/config.json', 'json');

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
 * db相关 
 */
exports.db = {};
exports.db.info = function(){
	var c = exports.config;
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