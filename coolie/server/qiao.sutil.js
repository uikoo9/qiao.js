'use strict';

var request = require('request');
var crypto 	= require('crypto');
var config 	= require('../server-properties.json');

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
 * file 
 */
exports.file = {};
exports.file.ext = function(name){
	var ss = name.toLowerCase().split('.');
	return ss[ss.length - 1];
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
		obj		: null
	};
	
	if(type) json.type = type;
	if(msg)	json.msg = config.msg[msg] || msg;
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

/**
 * log相关 
 */
var log4js	= require('log4js');
log4js.configure(config.log4js);
exports.log = log4js.getLogger();

/**
 * mail相关 
 */
exports.mail 		= {};
exports.mail.mailer = require('nodemailer');
exports.mail.send	= function(options){
	var transporter = exports.mail.mailer.createTransport(config.mail);
	transporter.sendMail(options, function(error, info){
		if(error){
			exports.log.error(error);
		}else{
			exports.log.info('已发送：' + info.response);
		}
	});
};

/**
 * encrypt相关 
 */
exports.crypto = {};
exports.crypto.key = function(appid, rows){
	var key;
	
	for(var i=0; i<rows.length; i++){
		if(appid == rows[i].org_code_appid) key = rows[i].org_code_appkey;
	}
	
	return key;
};
exports.crypto.tdes = function(txt, key){
	var cipher = crypto.createCipheriv('des-ede3', key, '');
	var res = cipher.update(txt, 'utf8', 'hex');
	res += cipher.final('hex');
	
	return res;
};
exports.crypto.tdesd = function(txt, key){
	var decipher = crypto.createDecipheriv('des-ede3', key, '');
	var res = decipher.update(txt, 'hex', 'utf8');
	res += decipher.final('utf8'); 
	
	return res;
};

/**
 * db相关 
 */
exports.db 				= {};

exports.db.mysql		= {};
exports.db.mysql.lib	= require('mysql');
exports.db.mysql.pool	= exports.db.mysql.lib.createPool(config.db);
exports.db.mysql.con	= function(){
	return new Promise(function(resolve, reject){
		exports.db.mysql.pool.getConnection(function(error, connection){
			return error ? reject(error) : resolve(connection);
		});
	});
};
exports.db.mysql.query	= function(sql, params){
	return new Promise(function(resolve, reject){
		exports.db.mysql.pool.query(sql, params || [], function(error, results){
			return error ? reject(error) : resolve(results);
		});
	});
};

exports.db.mongodb		= {};
exports.db.mongodb.lib	= require('mongoose');
exports.db.mongodb.init	= function(){
	exports.db.mongodb.lib.Promise = global.Promise;  
	
	var options = config.mongodb;
	var uri = 'mongodb://' + options.user + ':' + options.password + '@' + options.host + ':' + options.port + '/' + options.database;
	exports.db.mongodb.lib.connect(uri);
};
exports.db.mongodb.model= function(n, s){
	return s ? exports.db.mongodb.lib.model(n, s, n) : exports.db.mongodb.lib.model(n);
};