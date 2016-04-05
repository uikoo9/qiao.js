(function($){
	
	$.fn.qloading = function(opts){
		var defaults = {
			hide		: false,
			zindex		: 9000,
			bgcolor		: '#fff',
			img 		: '//img.niuguwang.com/static/img/0/loading.gif',
			imgwidth	: 64,
			imgheight	: 64,
			imgzindex	: 9001
		};
		var options = $.extend(defaults, opts); 
		
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
				
				$('<div class="ng-loading"><img src="' + options.img + '" /></div>')
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
	
})(jQuery);