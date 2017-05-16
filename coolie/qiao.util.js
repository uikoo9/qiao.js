/**
 * qiao.util.js
 * 1.qser
 * 2.qdata
 * 3.qiao.xss
 * 4.qiao.on
 * 5.qiao.is
 * 6.qiao.flash
 * 7.qiao.ajax
 * 8.qiao.cajax
 * 9.qiao.search
 * 10.qiao.end
 * 11.qiao.totop
 * 12.qiao.cookie
 * 13.qiao.juicer
 * 14.qiao.art 
 * 15.qiao.rem
 * 16.qiao.vendor
 * 17.qiao.app
 * 18.qiao.title
 * 19.qiao.reload
 * 20.qiao.weixin
 * @author qiaowenbin
 * @version 0.2.1.20160712
 * @history
 * 	0.2.2.20170516<br>
 * 	0.2.1.20160712<br>
 * 	0.2.0.20160706<br>
 * 	0.1.2.20160322<br>
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
	 * qiao.xss
	 * 奖输入的html标签替换掉
	 */
	exports.xss = function(str){
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&apos;').replace(/"/g, '&quot;');
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
	 * qiao.flash
	 * 判断是否安装flash
	 * true，安装
	 * false，没有安装
	 */
	exports.flash = function(){
		var flash = true;
		
		var vendor = exports.vendor();
		if(!vendor.mobile){
			if(vendor.ie){
				try{
					var swf1 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
				}catch(e){
					flash = false;
				}
			}else{
				try{
					var swf2 = navigator.plugins['Shockwave Flash'];
					if(typeof swf2 == 'undefined') flash = false;
				}catch(e){
					flash = false;
				}
			}
		}
		
		return flash;
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
					console.log('网络传输失败，请稍候重试！');
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
		
		if($el.length){
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
		}
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
	 * qiao.art
	 * 对art-template进行封装
	 */
	exports.art = function(html, data){
		return template.compile(html)(data);
	};

	/**
	 * qiao.rem
	 * rem调整fontsize
	 */
	exports.rem = function(){
		if(exports.vendor().ios){
			$('.ng-border').removeClass('ios').addClass('ios');	
			$('.border-ios').removeClass('ios').addClass('ios');	
		}
		
		var docEl = document.documentElement;
		var clientWidth = docEl.clientWidth;
		if (!clientWidth) return;
		
		var fontsize = 20 * (clientWidth / 320);
		if(fontsize > 40) return;
		docEl.style.fontSize = fontsize + 'px';
	};
	
    /**
     * 判断vendor 
     */
    exports.vendor = function(){
    	var ua = window.navigator.userAgent;
    	
    	var vendor = {};
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
    	vendor.nochrome	= /^((?!chrome).)*$/gi.test(ua);
    	vendor.safari	= /safari/gi.test(ua) && vendor.nochrome;
    	var matched;
    	if((matched = ua.match(/MSIE\s([\d\.]+)/)) || (matched = ua.match(/IEMobile\/([\d\.]+)/))){
    		vendor.ie = true;
    		vendor.version = matched[1];
    	}
    	
    	return vendor;
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
     * 兼容微信的title
     */
    exports.title = function(t){
    	if(t){
    		$('title').text(t);
    		var $iframe = $('<iframe src="https://www.baidu.com/img/bd_logo1.png" style="display:none;"></iframe>');
    		$iframe.on('load', function(){setTimeout(function(){$iframe.off('load').remove();}, 0);}).appendTo($('body'));
    	}
    };
    
	/**
	 * 兼容微信的reload
	 */
	exports.reload = function(){
		var vendor = exports.vendor();
		if(vendor && vendor.weixin){
			var url = window.location.href;
			window.location.href = url + (url.indexOf('?') > -1 ? '&' : '?') + 'v=' + Math.random(); 
		}else{
			window.location.reload();
		}
	};
	
	/**
	 * 微信分享
	 */
	exports.weixin = function(){
		qiao.ajax({
			url : '/weixin/jsapi',
			data: {
				url : location.href.split('#')[0]
			}
		}, function(json){
			var data = json.object;
			
			wx.config({
				debug: false,
				appId: data.appid,
				timestamp: data.timestamp,
				nonceStr: data.nonceStr, 
				signature: data.signature,
				jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo']
			});
			wx.ready(function(){
				var title = document.title;
				var desc = title;
				var meta = document.getElementsByTagName('meta');
				for(var i=0; i<meta.length; i++){
					if(meta[i].name && meta[i].name.toLowerCase() == 'description') desc = meta[i].content;
				}
				
				var shareOptions = {
					title: title,
					desc: desc,
					link: data.url,
					imgUrl: 'http://7sbn90.com1.z0.glb.clouddn.com/@/uikoo9/300x300n.png'
//						trigger: function (res) {
//							alert('用户点击发送给朋友');
//						},
//						success: function () { 
//							alert(1);
//						},
//						cancel: function () { 
//							alert(2);
//						},
//						fail: function (res) {
//							alert(JSON.stringify(res));
//						}
				};
				wx.onMenuShareAppMessage(shareOptions);
				wx.onMenuShareTimeline(shareOptions);
				wx.onMenuShareQQ(shareOptions);
				wx.onMenuShareQZone(shareOptions);
				wx.onMenuShareWeibo(shareOptions);
			});
			wx.error(function(res){
				if(location.href.indexOf('version') > -1) alert(JSON.stringify(res));
			});
		});
	};
});