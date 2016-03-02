/**
 * qiao.util.js
 * 1.qser
 * 2.qdata
 * 3.qiao.on
 * 4.qiao.is
 * 5.qiao.ajax
 * 6.qiao.cajax
 * 7.qiao.search
 * 8.qiao.end
 * 9.qiao.totop
 * 10.qiao.title
 * 11.qiao.os
 * 12.qiao.browser
 * 13.qiao.app
 * 14.qiao.cookie
 * 15.qiao.juicer 
 * 16.qiao.rem
 * @author qiaowenbin
 * @version 0.1.1.20151229
 * @history
 * 	0.1.1.20151229<br>
 * 	0.1.0.20151217<br>
 */
define(function (require, exports, module) {
    'use strict';
    
    /**
	 * 将表单转为js对象
	 */
	$.fn.qser = function(){
		var obj = {};
		
		var objs = $(this).serializeArray();
		if(objs.length != 0){
			for(var i=0; i<objs.length; i++){
				obj[objs[i].name] = objs[i].value;
			}
		}
	
		return obj;
	};
	
	/** 
	 * 将data属性转为js对象
	 */
	$.fn.qdata = function(){
		var res = {};
		
		var data = $(this).attr('data');
		if(data){
			var options = data.split(';');
			for(var i=0; i<options.length; i++){
				if(options[i]){
					var opt = options[i].split(':');
					res[opt[0]] = opt[1];
				}
			}
		}
		
		return res;
	};
	
	/**
	 * qiao.on
	 * 事件绑定
	 */
	exports.on = function(obj, event, func){
		$(document).off(event, obj).on(event, obj, func);
	};
	
	/**
	 * qiao.is
	 * 一些常用的判断，例如数字，手机号等
	 */
	exports.is = function(str, type){
		if(str && type){
			if(type == 'number') return /^\d+$/g.test(str);
			if(type == 'mobile') return /^1\d{10}$/g.test(str);
		}
	};
	
	/**
	 * qiao.ajax
	 * 对$.ajax的封装
	 */
	exports.ajaxoptions = {
		url 		: '',
		data 		: {},
		type 		: 'post',
		dataType	: 'json',
		async 		: true,
		crossDomain	: false
	};
	exports.ajaxopt = function(options){
		var opt = $.extend({}, exports.ajaxoptions);
		if(typeof options == 'string'){
			opt.url = options;
		}else{
			$.extend(opt, options);
		}
		
		return opt;
	};
	exports.ajax = function(options, success, fail){
		if(options){
			var opt = exports.ajaxopt(options);
			$.ajax(opt).done(function(obj){
				if(success) success(obj);
			}).fail(function(e){
				if(fail){
					fail(e);
				}else{
					console.log('数据传输失败，请重试！');
				}
			});
		}
	};
	
	/**
	 * qiao.cajax
	 * cross domain ajax
	 */
	exports.cajax = function(options, suc, fail){
		var opt = exports.ajaxopt(options);
		opt.crossDomain = true;
		exports.ajax(opt, suc, fail);
	};
	
	/**
	 * qiao.search
	 * 获取url后参数中的value
	 * qiao.search(key)：返回参数中key对应的value
	 * 可以参考：plugins/_06_qsearch/qsearch.html
	 */
	exports.search = function(key){
		var res;
		
		var s = location.search;
		if(s){
			s = s.substr(1);
			if(s){
				var ss = s.split('&');
				for(var i=0; i<ss.length; i++){
					var sss = ss[i].split('=');
					if(sss && sss[0] == key) res = sss[1]; 
				}
			}
		}
		
		return res;
	};
	
	/**
	 * qiao.end
	 * 到达页面底部后自动加载内容
	 * end：到达底部后的回调函数
	 * $d：容器，默认是$(window)
	 * $c：内容，默认是$(document)
	 * 可以参考：plugins/_04_qend/qend.html
	 */
	exports.end = function(end, $d, $c){
		if(end){
			var $d = $d || $(window);
			var $c = $c || $(document);
			
			$d.scroll(function(){if($d.scrollTop() + $d.height() >= $c.height()) end();});
		}else{
			$(window).scroll(null);
		}
	};
	
	/**
	 * qiao.totop
	 * 返回顶部的方法
	 * 可以参考：plugins/_01_qtotop/qtotop.html
	 */
	exports.totop = function(el){
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
	
	/**
     * 动态设置title
     */
    exports.title = function(t){
    	if(t){
    		$('title').text(t);
    		var $iframe = $('<iframe src="http://www.baidu.com/img/baidu_jgylogo3.gif" style="display:none;"></iframe>');
    		$iframe.on('load', function(){setTimeout(function(){$iframe.off('load').remove();}, 0);}).appendTo($('body'));
    	}
    };
    
    /**
     * os判断
     * isWindowsPhone
     * isAndroid
     * isAndroidPad
     * isIPhone
     * isIPad
     * isIOS
     * isMobile
     * isWeixin
     */
    exports.os = function(){
    	var os = {};

	    var ua = window.navigator.userAgent;
	    var matched;
	    
	    if ((matched = ua.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))) {
	        os = {
	            name: 'Windows Phone',
	            isWindowsPhone: true,
	            version: matched[1]
	        };
	    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
	        os = {
	            version: matched[1]
	        };

	        if ((!!ua.match(/Mobile\s+Safari/))) {
	            os.name = 'Android';
	            os.isAndroid = true;
	        } else {
	            os.name = 'AndroidPad';
	            os.isAndroidPad = true;
	        }
	    } else if((matched = ua.match(/(iPhone|iPad|iPod)/))) {
	        var name = matched[1];

	        matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);

	        os = {
	            name: name,
	            isIPhone: (name === 'iPhone' || name === 'iPod'),
	            isIPad: name === 'iPad',
	            isIOS: true,
	            version: matched[1].split('_').join('.')
	        };
	    } else {
	        os = {
	            name:'unknown',
	            version:'0.0.0'
	        };
	    }
	    
	    if(!!ua.match(/AppleWebKit.*Mobile.*/)) os.isMobile = true;
	    if(/micromessenger/gi.test(ua)) os.isWeixin = true;

	    return os;
    };
    
    /**
     * 浏览器判断，手机版
     * isUC
     * isQQ
     * isFirefox
     * isIEMobile
     * isIE
     * isIELikeWebkit
     * isWebview
     * isSafari
     */
    exports.browser = function(){
	    var browser = {};

	    var ua = window.navigator.userAgent;
	    var matched;

	    if((matched = ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))) {
	        browser = {
	            name: 'UC',
	            isUC: true,
	            version: matched[1]
	        };
	    } else if((matched = ua.match(/MQQBrowser\/([\d\.]+)/))) {
	        browser = {
	            name: 'QQ',
	            isQQ: true,
	            version: matched[1]
	        };
	    } else if ((matched = ua.match(/Firefox\/([\d\.]+)/))) {
	        browser = {
	            name: 'Firefox',
	            isFirefox: true,
	            version: matched[1]
	        };
	    } else if ((matched = ua.match(/MSIE\s([\d\.]+)/)) || (matched = ua.match(/IEMobile\/([\d\.]+)/))) {
	        browser = {
	            version: matched[1]
	        };

	        if (ua.match(/IEMobile/)) {
	            browser.name = 'IEMobile';
	            browser.isIEMobile = true;
	        } else {
	            browser.name = 'IE';
	            browser.isIE = true;
	        }

	        if (ua.match(/Android|iPhone/)) {
	            browser.isIELikeWebkit = true;
	        }
	    } else if((matched = ua.match(/(?:Chrome|CriOS)\/([\d\.]+)/))) {
	        browser = {
	            name: 'Chrome',
	            isChrome: true,
	            version: matched[1]
	        };

	        if (ua.match(/Version\/[\d+\.]+\s*Chrome/)) {
	            browser.name = 'Chrome Webview';
	            browser.isWebview = true;
	        }
	    } else if(!!ua.match(/Safari/) && (matched = ua.match(/Android[\s\/]([\d\.]+)/))) {
	        browser = {
	            name: 'Android',
	            isAndroid: true,
	            version: matched[1]
	        };
	    } else if(ua.match(/iPhone|iPad|iPod/)) {
	        if(ua.match(/Safari/)) {
	            matched = ua.match(/Version\/([\d\.]+)/)
	            browser = {
	                name: 'Safari',
	                isSafari: true,
	                version: matched[1]
	            };
	        } else {
	            matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
	            browser = {
	                name: 'iOS Webview',
	                isWebview: true,
	                version: matched[1].replace(/\_/, '.')
	            };
	        }
	    } else {
	        browser = {
	            name:'unknown',
	            version:'0.0.0'
	        };
	    }
	    
	    return browser;
    };
    
    /**
     * 判断是否安装某app
     */
    exports.app = function(appurl, tourl){
    	var timeout, t = 1000, hasApp = true;
    	
    	setTimeout(function () {  
    		document.body.removeChild(ifr);
    		if(!hasApp && tourl) location.href = tourl;
    	}, 1100)  
    	
    	var t1 = Date.now();  
    	var ifr = document.createElement("iframe");  
    	ifr.setAttribute('src', appurl);  
    	ifr.setAttribute('style', 'display:none');  
    	document.body.appendChild(ifr);  
    	
    	timeout = setTimeout(function () {  
    		if (!t1 || Date.now() - t1 < t + 100) hasApp = false;  
    	}, t);  
    };
	
	/**
	 * qiao.cookie
	 * 对jquery.cookie.js稍作封装
	 * 注：需要引入jquery.cookie.js，<script src="http://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
	 * qiao.cookie(key)：返回key对应的value
	 * qiao.cookie(key, null)： 删除key对应的cookie
	 * qiao.cookie(key, value)：设置key-value的cookie
	 * 可以参考：plugins/_05_qcookie/qcookie.html
	 */
	exports.cookie = function(key, value, domain){
		if(typeof value == 'undefined'){
			return $.cookie(key);
		}else{
			var opt = {
				path : '/',
				expires : (value == null) ? -1 : 1
			};
			if(domain) opt.domain = domain;
			
			$.cookie(key, value, opt);
		}
	};
	
	/**
	 * qiao.juicer
	 * 对juicer进行封装
	 */
	exports.juicer = function(el, data, callback){
		if(el){
			var $tpl = $(el);
			$tpl.after(juicer($tpl.html(), data));
			if(callback) callback();
		}
	};
	
	/**
	 * qiao.rem
	 * rem调整fontsize
	 */
	exports.rem = function(){
		var os = exports.os();
		if(os && os.isIOS && parseFloat(os.version) >= 8) $('.ng-border').removeClass('ios').addClass('ios');
		
		var docEl = document.documentElement;
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		
		var fontsize = 20 * (clientWidth / 320);
		if(fontsize > 40) return;
		docEl.style.fontSize = fontsize + 'px';
	};
});