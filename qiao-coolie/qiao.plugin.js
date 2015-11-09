/**
 * qiao.plugin.js
 * 注：牛股王用到的一些组件
 * 1.qiao.plugin.lun
 * 2.qiao.plugin.tab
 * 3.qiao.plugin.slide
 * 4.qiao.plugin.holder
 * 5.qiao.plugin.loading
 * 6.qiao.plugin.mask
 */
define(function (require, exports, module) {
    'use strict';
	
    var qiao = require('qiao.util.js');
    
    /**
     * qiao.plugin.lun
     * 轮播组件
     */
	exports.lun = function(el){
		var $el = $(el);
		if($el.length){
			var itemLength = $el.find('.item').length;
			if(itemLength > 1){
				qiao.on(el + ' .c-left', 'click', function(){
					var $item = $(el + ' .item.active');
					$item.removeClass('active').fadeOut(function(){
						var $last = $(el + ' .item:last');
						var $prev = $item.prev('.item');
						
						var $a = $prev.length ? $prev : $last;
						$a.removeClass('active').addClass('active').fadeIn();
					});
				});
				qiao.on(el + ' .c-right', 'click', function(){
					var $item = $(el + ' .item.active');
					$item.removeClass('active').fadeOut(function(){
						var $first = $(el + ' .item:first');
						var $next = $item.next('.item');
						
						var $a = $next.length ? $next : $first;
						$a.removeClass('active').addClass('active').fadeIn();
					});
				});
			}else{
				$el.find('.c').hide();
			}
		}
	};
	
	/**
	 * qiao.plugin.tab
	 * 选项卡组件
	 */
	exports.tab = function(el, func){
		qiao.on(el, 'click', function(){
			var $this = $(this);
			if(!$this.hasClass('active')){
				$(el).removeClass('active');
				$this.addClass('active');
				if(func) func($(this).data('code'));
			}
		});
	};
	
	/**
	 * qiao.plugin.slide
	 * 收缩组件
	 */
	exports.slide = function(el){
		qiao.on(el, 'click', function(){
			var $this = $(this);
			var status = $this.data('status');
			var $i = $this.find('i');
			
			if(status == 'kai'){
				$i.html('&#xe608;');
				$this.data('status', 'guan').next().slideUp();
			}
			if(status == 'guan'){
				$(el).each(function(){
					var $t = $(this);
					if($t.data('status') == 'kai'){
						$t.find('i').html('&#xe608;');
						$t.data('status', 'guan').next().slideUp();
					}
				});
				$i.html('&#xe600;');
				$this.data('status', 'kai').next().slideDown();
			}
		});
	};
	
	/**
	 * qiao.plugin.holder
	 * 兼容ie8的placeholder 
	 */
	exports.holder = function(){
		$('input.holder').each(function(){
			$(this).val($(this).data('holder'));
        });
		
        qiao.on('input.holder', 'focus', function(){
            var $this = $(this);
            if($this.val() === $this.data('holder')) $this.val('');
        });
         
        qiao.on('input.holder', 'focusout', function(){
            var $this = $(this);
            if($.trim($this.val()) === '') $this.val($this.data('holder'));
        });
	};
	
	/**
	 * qiao.plugin.loading
	 * loading组件
	 */
	exports.loading = function(el){
		if(el == 'hide'){
			$('#ngloading').hide().remove();
		}else{
			var loadingimg = require('../../../img/loading.gif', 'image');
			var $loading = $('<div class="ng-loading" id="ngloading"><img src="' + loadingimg + '" /></div>');
			var $el = $(el);
			var top = $el.offset().top + 'px';
			var left = $el.offset().left + 'px';
			var height = $el.height() + 'px';
			var width = $el.width() + 'px';
			
			$loading.css({width: width, height: height, top: top, left: left}).appendTo($el).find('img').show().end().show();
		}
	};
	
	/**
	 * qiao.plugin.mask
	 * 遮罩组件
	 */
	exports.mask = function(options){
		if(options){
			var $window = $(window);
			var width = $window.width();
			var height = $window.height();
			var $mask = $('<div class="ng-mask"></div>').css({'position':'fixed','z-index':3000,'left':0,'top':0,'background-color':'rgba(0,0,0,0.4)','width':width+'px','height':height+'px'});
			
			var mheight = options.top || height/10 + 'px';
			var $html = $(options.html).css({'margin-top':mheight, 'margin-left':'auto', 'margin-right':'auto'});

			var animate = options.animate;
			if(animate){
				$mask.appendTo($('body')).show().append($html.show().addClass('animated bounceIn'));
			}else{
				$mask.appendTo($('body')).show().append($html.show());
			}
			
			qiao.on('.ng-close', 'click', function(){
				if(animate){
					$html.removeClass('bounceIn').addClass('bounceOut');
					setTimeout(function(){
						$mask.remove();
					},800);
				}else{
					$mask.remove();
				}
			});
		}
	};
});