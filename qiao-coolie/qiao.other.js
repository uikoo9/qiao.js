/**
 * qiao.other.js
 * 注：三方组件封装
 * 1.qiao.qrcode
 */
define(function (require, exports, module) {
    'use strict';
	
	/**
	 * qiao.qrcode
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
});
