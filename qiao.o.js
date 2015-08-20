/** 
 * 生成二维码
 * text：待生成文字
 * type：中文还是英文，cn为中文
 * render：展示方式，table为表格方式
 * width：宽度
 * height：高度
 * 注：需要引入<@jsfile 'qrcode'/>
 */
$.fn.qcode = function(options){
	if(options){
		var opt = {};
		if(typeof options == 'string'){
			opt.text = options;
		}else{
			if(options.text) opt.text = options.text;
			if(options.type && options.type == 'ch') opt.text = qcodetochar(opt.text);
			if(options.render && options.render == 'table') opt.render = options.render;
			if(options.width) opt.width = options.width;
			if(options.height) opt.height = options.height;
		}

		$(this).qrcode(opt);
	}
};

/** 
 * 返回顶部方法
 */
$.fn.qtotop = function(options) {
	var $this = $(this);
	$this.hide().click(function(){
		$("body, html").animate({
			scrollTop : "0px"
		});
	});
	
	var $window = $(window);
	$window.scroll(function(){
		if ($window.scrollTop()>0){
			$this.fadeIn();
		}else{
			$this.fadeOut();
		}
	});
};