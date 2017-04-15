var moment	= require('moment');

/**
 * template helper 
 */
exports.templateHelper = function(template){
	template.helper('decode', function(s){return decodeURIComponent(s);});
	template.helper('formatDate', function(s){
		return moment(s).format('YYYY-MM-DD');
	});
};

/**
 * cross domain 
 */
exports.crossDomain = function(req, res, next){
	res.set('Access-Control-Allow-Origin', '*');
	next();
};

/**
 * error page
 */
exports.errorPage = function(req, res, next){
	var errorCode = 404;
	
	res.status(errorCode);
	res.render('class/class-unfound.html', {code:errorCode});
};