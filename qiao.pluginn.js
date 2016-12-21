(function($){
	
	/**
	 * 遮罩插件
	 * 使用：$('#id').qloading(options);
	 * 详见：/plugins/_11_qloading/qloading.html
	 * options：定制选项，默认配置见$.fn.qloading.defaults
	 * 
	 * hide		: 隐藏遮罩，默认为false
	 * zindex	: 遮罩背景的zindex，默认为9000
	 * bgcolor	: 遮罩背景的色值，默认为#fff，也可以使用rgba色值
	 * imgurl	: 遮罩中间的图片地址
	 * imgwidth	: 遮罩中间的图片宽度
	 * imgheight: 遮罩中间的图片高度
	 * imgzindex: 遮罩中间的图片zindex，默认为9001
	 */
	$.fn.qloading = function(opts){
		var options = $.extend({}, $.fn.qloading.defaults, opts); 
		
		return this.each(function(){
			var $el = $(this);
			
			if(options.hide){
				if($el.find('.ng-loading').length) $el.find('.ng-loading').hide().remove();
			}else{
				var top = $el.offset().top;
				var left = $el.offset().left;
				var height = $el.height();
				var width = $el.width();
				var imgmargin = '-' + parseInt(options.imgheight/2) + 'px 0 0 -' + parseInt(options.imgwidth/2) + 'px';
				
				$('<div class="ng-loading"><img src="' + options.imgurl + '" /></div>')
					.css({
						'position'			: 'absolute',
						'z-index'			: options.zindex,
						'top'				: top, 
						'left'				: left,
						'display'			: 'none',
						'width'				: width, 
						'height'			: height, 
						'background-color'	: options.bgcolor
					}).appendTo($el).find('img').css({
						'position'	: 'absolute',
						'z-index'	: options.imgzindex,
						'top'		: '50%',
						'left'		: '50%',
						'display'	: 'none',
						'width:'	: options.imgwidth,
						'height'	: options.imgheight,
						'margin'	: imgmargin
					}).show().end().show();
			}
		});
	};
	$.fn.qloading.defaults = {
		hide		: false,
		zindex		: 9000,
		bgcolor		: '#fff',
		imgurl		: '//img.niuguwang.com/static/img/0/loading.gif',
		imgwidth	: 64,
		imgheight	: 64,
		imgzindex	: 9001
	};
	
})(jQuery);