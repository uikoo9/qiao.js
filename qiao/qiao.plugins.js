/** 
 * qtotop
 * 返回顶部
 * 可以参考：plugins/_01_qtotop/qtotop.html
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

/**
 * qcode
 * 生成二维码
 * text：待生成文字
 * type：中文还是英文，cn为中文
 * render：展示方式，table为表格方式
 * width：宽度
 * height：高度
 * 可以参考：plugins/_03_qcode/qcode.html
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

    exports.tip = function(func){
		exports.on('.ng-stock-title .tip', 'click', function(){
			var $this = $(this);
			if(!$this.hasClass('tip-active')){
				$this.parent().parent().find('.tip-active').removeClass('tip-active');
				$this.addClass('tip-active');
				
				if(func) func($this.text());
			}
		});
	};
	
	exports.iscroll = {};
	exports.iscroll.v;
	exports.iscroll.init = function(func){
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		exports.iscroll.v = new IScroll('#wrapper', {click: true});
		exports.iscroll.v.on('scrollStart', function(){if(this.directionY == -1 && this.y == 0) $('.ng-pulldown').show();});
		exports.iscroll.v.on('scrollEnd', function(){if(this.y == 0) $('.ng-pulldown').slideUp(function(){if(func) func();});});
	};
	exports.iscroll.height = function(flag){
		if(exports.iscroll.v){
			var documentH = $(document).height();
			var headerH = $('header').height();
			var footerH = $('footer').height();
			if($('footer').is(':hidden')){
				$('#wrapper').height(documentH - headerH);
			}else{
				$('#wrapper').height(documentH - headerH - footerH);
			}
			
			exports.iscroll.v.refresh();
		}
	};
    
    qiao.ue = function(id, options){
	if(typeof(UE) != "undefined"){
		if(!options){
			return UE.getEditor(id);
		}else if(typeof options == 'string'){
			if(options == 'mini'){
				return UE.getEditor(id, {toolbars: [['bold','italic','underline','forecolor','backcolor','|','fontfamily','fontsize','|','removeformat','formatmatch','pasteplain']]});
			}
		}else{
			var opt = $.extend({}, window.UEDITOR_CONFIG);
			return UE.getEditor(id, $.extend(opt, options));
		}
	}
	
	return {};
};