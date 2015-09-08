/**
 * exports.util.js
 * 注：需要引入jquery
 * 1.exports.on
 * 2.exports.is
 * 3.exports.ajax
 * 4.exports.totop
 * 5.exports.qrcode
 * 6.exports.end
 * 7.exports.cookie
 * 8.exports.search
 */
define(function (require, exports, module) {
    'use strict';
	
	/**
	 * exports.on
	 * 事件绑定
	 */
	exports.on = function(obj, event, func){
		$(document).off(event, obj).on(event, obj, func);
	};
	
	/**
	 * exports.is
	 * 一些常用的判断，例如数字，手机号等
	 */
	exports.is = function(str, type){
		if(str && type){
			if(type == 'number') return /^\d+$/g.test(str);
			if(type == 'mobile') return /^1\d{10}$/g.test(str);
		}
	};
	
	/**
	 * exports.ajax
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
					alert('数据传输失败，请重试！');
				}
			});
		}
	};
	
	/**
	 * exports.totop
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
	 * exports.qrcode
	 * 生成二维码
	 * 注：需要引入qrcode，<script src="http://cdn.staticfile.org/jquery.qrcode/1.0/jquery.qrcode.min.js"></script>
	 * text：待生成文字
	 * type：中文还是英文，cn为中文
	 * render：展示方式，table为表格方式
	 * width：宽度
	 * height：高度
	 * 可以参考：plugins/_03_qrcode/qrcode.html
	 */
	exports.qrcode = function(el, options){
		if(options){
			var opt = {};
			if(typeof options == 'string'){
				opt.text = options;
			}else{
				if(options.text) opt.text = options.text;
				if(options.type && options.type == 'ch') opt.text = exports.qrcodetochar(opt.text);
				if(options.render && options.render == 'table') opt.render = options.render;
				if(options.width) opt.width = options.width;
				if(options.height) opt.height = options.height;
			}
	
			$(el).qrcode(opt);
		}
	};
	exports.qrcodetochar = function(str){
	    var out, i, len, c;
	    out = "";
	    len = str.length;
	    for (i = 0; i < len; i++) {
	        c = str.charCodeAt(i);
	        if ((c >= 0x0001) && (c <= 0x007F)) {
	            out += str.charAt(i);
	        } else if (c > 0x07FF) {
	            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
	            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
	        } else {
	            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
	            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
	        }
	    }
	    return out;
	};
	
	/**
	 * exports.end
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
	 * exports.cookie
	 * 对jquery.cookie.js稍作封装
	 * 注：需要引入jquery.cookie.js，<script src="http://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
	 * exports.cookie(key)：返回key对应的value
	 * exports.cookie(key, null)： 删除key对应的cookie
	 * exports.cookie(key, value)：设置key-value的cookie
	 * 可以参考：plugins/_05_qcookie/qcookie.html
	 */
	exports.cookie = function(key, value){
		if(typeof value == 'undefined'){
			return $.cookie(key);
		}else if(value == null){
			$.cookie(key, value, {path:'/', expires: -1});
		}else{
			$.cookie(key, value, {path:'/', expires:1});
		}
	};
	
	/**
	 * exports.search
	 * 获取url后参数中的value
	 * exports.search(key)：返回参数中key对应的value
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
});
