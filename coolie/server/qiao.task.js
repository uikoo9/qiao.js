'use strict';

var schedule		= require('node-schedule');
var weixinService	= require('../service/WeixinService.js');
var otimeService 	= require('../service/OTimeService.js');

/**
 * start
 */
exports.start = function(){
	// weixin
	weixinService.weixinTask();
	schedule.scheduleJob('1 */2 * * *', function() {
		weixinService.weixinTask();
	});
	
	// otime
	schedule.scheduleJob('* * * * *', function() {
		console.log(new Date() + '---otimetask');
		otimeService.otimeTask();
	});
};