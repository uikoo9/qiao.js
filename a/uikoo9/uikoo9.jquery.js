/**
 * jquery 基础教程
 */
console.log('jquery 基础教程');

// 第二章 选择元素---------------------------------------------------------------
//	$('#selected-plays > li').addClass('horizontal');// 子一级中的li
//	$('#selected-plays li:not(.horizontal)').addClass('sub-level');// 所有的li
//	
//	$('a[href^="mailto:"]').addClass('mailto');
//	$('a[href$=".pdf"]').addClass('pdflink');
//	$('a[href^="http"][href*="henry"]').addClass('henrylink');// ^开头，$结尾，*任意位置
//	
//	$('tr:even').addClass('alt');// tr为even的
//	$('tr:nth-child(odd)').addClass('alt');// tr的父元素下的子元素为odd的
//	$('td:contains(Henry)').addClass('highlight');// 包含:input,:button,:enabled,:disabled,:checked,:selected
//	
//	$('a').filter(function() {
//		return this.hostname && this.hostname != location.hostname;
//	}).addClass('external');// filter
	
	// .next(), .nextAll(), .prev(), .prevAll(), .siblings(), .parent(), .children(), .end(), andSelf()
	
// 第三章 事件---------------------------------------------------------------
	// blur,change,click,dbclick,error,focus,keydown,keypress,keyup,load,mousedown,mousemove,mouseover,mouseuup,resize,scroll,select,submit,unload
	// toggle(), toggleClass(), hover()
	// event.stopPropagation(); event.preventDefault(); return false;

// 第四章 样式与动画---------------------------------------------------------------
	// css, show, hide, toggle, slideUp, slideDown, slideToggle, fadeIn, fadeOut, fadeToggle
//	$firstPara.animate({
//		opacity: 'toggle',
//		height: 'toggle'
//	}, 'slow');

// 第五章 操作DOM---------------------------------------------------------------
	// css, attr, prop, html, text, each, append, appendTo, prepend, prependTo, after, insertAfter, before, insertBefore, wrap, wrapAll, wrapInner, replaceAll, replaceWith, empty, remove, detach
	
// 第六章 ajax---------------------------------------------------------------
	// .load(), $.getJSON(), getScript(), $.get(), $.post(), .serialize();

// 第七章 试用插件---------------------------------------------------------------
// 第八章 开发插件---------------------------------------------------------------
	// 插件和方法
//	(function($){
//	     $.q = {};
//	     $.q.test = function(){
//	          alert(1);
//	     };
//
//	     $.fn.test = function(){
//	          alert(2);
//	     };
//	})(jQuery);
	
	// 方法连缀
//	(function($) {
//		$.fn.swapClass = function(class1, class2) {
//			return this.each(function() {
//				var $element = $(this);
//				if ($element.hasClass(class1)) {
//					$element.removeClass(class1).addClass(class2);
//				} else if ($element.hasClass(class2)) {
//					$element.removeClass(class2).addClass(class1);
//				}
//			});
//		};
//	})(jQuery);
	
	// 默认参数
//	(function($) {
//		$.fn.shadow = function(opts) {
//			var defaults = {
//				copies : 5,
//				opacity : 0.1
//			};
//			var options = $.extend(defaults, opts);// 将opts中的参数覆盖到defaults中
//
//			return this.each(function() {
//				var $originalElement = $(this);
//				for ( var i = 0; i < options.copies; i++) {
//					$originalElement.clone().css({
//						position : 'absolute',
//						left : $originalElement.offset().left + i,
//						top : $originalElement.offset().top + i,
//						margin : 0,
//						zIndex : -1,
//						opacity : options.opacity
//					}).appendTo('body');
//				}
//			});
//		};
//	})(jQuery);
	
	// 回调函数
//	(function($) {
//		$.fn.shadow = function(opts) {
//			var defaults = {
//				copies : 5,
//				opacity : 0.1,
//				copyOffset : function(index) {
//					return {
//						x : index,
//						y : index
//					};
//				}// 回调函数
//			};
//			var options = $.extend(defaults, opts);
//
//			return this.each(function() {
//				var $originalElement = $(this);
//				for ( var i = 0; i < options.copies; i++) {
//					var offset = options.copyOffset(i);
//					$originalElement.clone().css({
//						position : 'absolute',
//						left : $originalElement.offset().left + offset.x,
//						top : $originalElement.offset().top + offset.y,
//						margin : 0,
//						zIndex : -1,
//						opacity : options.opacity
//					}).appendTo('body');
//				}
//			});
//		};
//	})(jQuery);
//	
//	// 自己开发组件
//	(function($) {
//		$.widget('ljq.tooltip',{
//			options : {
//				offsetX : 10,
//				offsetY : 10,
//				content : function() {
//					return $(this).data('tooltip-text');
//				}
//			},
//
//			_create : function() {
//				this._tooltipDiv = $('<div></div>')
//						.addClass('ljq-tooltip-text ui-widget ui-state-highlight ui-corner-all')
//						.hide().appendTo('body');
//				this.element.addClass('ljq-tooltip-trigger')
//						.on('mouseenter.ljq-tooltip', $.proxy(this._open, this))
//						.on('mouseleave.ljq-tooltip', $.proxy(this._close, this));
//			},
//
//			destroy : function() {
//				this._tooltipDiv.remove();
//				this.element.removeClass('ljq-tooltip-trigger').off('.ljq-tooltip');
//				$.Widget.prototype.destroy.apply(this,arguments);
//			},
//
//			open : function() {
//				this._open();
//			},
//
//			close : function() {
//				this._close();
//			},
//
//			_open : function() {
//				if (!this.options.disabled) {
//					var elementOffset = this.element.offset();
//					this._tooltipDiv.css({
//								position : 'absolute',
//								left : elementOffset.left
//										+ this.options.offsetX,
//								top : elementOffset.top
//										+ this.element.height()
//										+ this.options.offsetY
//							}).text(this.options.content.call(this.element[0]));
//					this._tooltipDiv.show();
//					this._trigger('open');
//				}
//			},
//
//			_close : function() {
//				this._tooltipDiv.hide();
//				this._trigger('close');
//			}
//		});
//	})(jQuery);



















//1.$(document).ready()与window.onload的不同
//后者是在页面所有元素加载完之后执行，前者是在页面所有元素的结构加载完就执行，可能并没有下载完。

//2.hover()方法，类似与toggle()方法
$('#id').hover(function(){
alert('in');
},function(){
alert('out');
});

//3.事件目标，停止事件传播和默认操作
$('#id').click(function(event){
if(event.this == this){
//
}

// 停止事件传播
event.stopPropagation();

// 停止默认操作
event.preventDefault();

// 两者的结合
return false;
});

//4.事件委托
$('#id').click(function(event){
if($(event.target).is('button')){
// do something
}
});

//5.事件命名空间
$('#id').bind('click.sth',function(event){
// do something
});

//6.css内联
var $div = $('div.sth');
var num = parseFloat($div.css('fontSize'));	//parseFloat会取出数值部分

/**
* 选择符
* 1.CSS选择符
* 		a , b	a或者b
* 		a   b	a后代中所有的b
* 		a > b	a下一代中的b
* 		a + b	与a直接同辈的b
* 		a ~ b	与a所有同辈的b
* 2.同辈元素
* 		:nth-child(index)	第index个子元素（从1开始）
* 		:nth-child(even)	偶数子元素（从1开始）
* 		:nth-child(odd)		奇数子元素（从1开始）
* 		:nth-child(formula)	
* 		:first-child		第一个子元素
* 		:last-child			最后一个子元素
* 		:only-child			唯一一个子元素
* 3.匹配元素
* 		:first		第一个
* 		:last		最后一个
* 		:not(a)		与a不匹配的
* 		:even		偶数元素（从0开始）
* 		:odd		奇数元素（从0开始）
* 		:eq(index)	=index的元素（从0开始）
* 		:gt(index)	>index的元素（从0开始）
* 		:lt(index)	<index的元素（从0开始）
* 4.属性
* 		[attr]				带有attr属性的元素
* 		[attr  = "value"]	attr属性值为value
* 		[attr != "value"]	attr属性值不为value
* 		[attr ^= "value"]	attr属性值开头为value
* 		[attr $= "value"]	attr属性值结尾为value
* 		[attr *= "value"]	attr属性值包含value
* 		[attr ~= "value"]	attr属性值由空格分隔，且其中一个为value
* 		[attr |= "value"]	
* 5.表单
* 		:input		input,select,textarea,button元素
* 		:text		type="text"的input元素
* 		:password	type="password"的input元素
* 		:file		type="file"的input元素
* 		:radio		type="radio"的input元素
* 		:checkbox	type="checkbox"的input元素
* 		:submit		type="submit"的input元素
* 		:image		type="image"的input元素
* 		:reset		type="reset"的input元素
* 		:button		type="button"的input元素,button元素
* 		:enabled	启用元素
* 		:disabled	禁用元素
* 		:checked	选中的checkbox和radio元素
* 		:selected	选中的select元素
* 6.其他
* 		:header			标题元素，如h1,h2
* 		:animated		动画正在进行的元素
* 		:contains(text)	包含给定文本text的元素
* 		:empty			不包含子节点的元素
* 		:has(a)			后代元素中至少有一个与a匹配的元素
* 		:parent			包含子节点的元素
* 		:hidden			隐藏的元素
* 		:visible		可见的元素
* 		:focus			聚焦的元素
*/ 
$(function(){
$('#selected-plays > li').addClass('horizontal');
$('#selected-plays li:not(.horizontal)').addClass('sub-level');
$('a[href^="mailto:"]').addClass('mailto');
$('a[href$=".pdf"]').addClass('pdflink');
$('tr:nth-child(odd)').addClass('alt');
$('td:contains(Henry)').addClass('highlight');
});

/**
* 遍历
* 1.筛选
* 		.filter(selector)	返回给定选择符的元素
* 		.filter(callback)	返回执行函数元素
* 		.eq(index)			返回第index个元素（从0开始）
* 		.first()			第一个元素
* 		.last()				最后一个元素
* 		.slice(start,[end])	返回给定范围元素（从0开始）
* 		.not(selector)		与选择符不匹配的元素
* 		.has(selector)		已选择符匹配的元素
* 2.后代
* 		.find(selector) 	与selector匹配的后代元素
* 		.contents()			子节点
* 		.children()			子节点，符合selector
* 3.同辈
* 		.next([selector])
* 		.nextAll([selector])
* 		.nextUntil([selector],[filter])
* 		.prev([selector])
* 		.prevAll([selector])
* 		.prevUntil([selector],[filter])
* 		.siblings([selector])
* 4.祖先
* 		.parent([selector])
* 		.parents([selector])
* 		.parentUntil([selector],[filter])
* 		.closest(selector)	最近的一个祖先元素
* 		.offsetParent()		第一个被定位的祖先元素
* 5.集合
* 		.add(selector)
* 		.andSelf()
* 		.end()				内部jquery栈中之前选定的元素
* 		.map(callback)
* 		.pushStack(elements)
* 6.操作
* 		.is(selector)	是否有selector
* 		.index()		对于同辈的索引
* 		.index(element)	element对应索引
* 		$.contains(a,b)	b是否包含a
* 		.each(callback)	对每个元素执行callback函数
* 		.length			数量
* 		.get()			
* 		.get(index)
* 		.toArray()
*/ 
$('a').filter(function(){
return this.hostname && this.hostname != location.hostname;
}).addClass('external');
$(function(){
$('td:contains(Henry)').next().addClass('highlight');				//自己之后挨着的同辈元素
$('td:contains(Henry)').nextAll().addClass('highlight');			//自己之后所有的同辈元素
$('td:contains(Henry)').nextAll().andSelf().addClass('highlight');	//包括自己

$('td:contains(Henry)')
.parent()
.find('td:eq(1)').addClass('highlight')
.end()	// 之前找到的元素，即paren()
.find('td:eq(2)').addClass('highlight');

// 访问DOM元素
var s2 = $('#id').get(0).tagName;
var s1 = $('#id')[0].tagName;
});

/**
* 事件
* 1.绑定
* 		.ready(handler)
* 		.bind(type,[data],handler)
* 		.one(type,[data],handler)
* 		.unbind([type],[handler])
* 		.live(type,handler)
* 		.die(type,[handler])
* 		.delegate(selector,type,handler)
* 		.undelegate(seldector,type,handler)
* 2.简写绑定
* 		.blur(handler)		
* 		.change(handler)
* 		.click(handler)
* 		.dbclick(handler)
* 		.error(handler)
* 		.focus(handler)
* 		.focusin(handler)
* 		.focusout(handler)
* 		.keydown(handler)
* 		.keypress(handler)
* 		.keyup(handler)
* 		.mousedown(handler)
* 		.mouseenter(handler)
* 		.mouseleave(handler)
* 		.mousemove(handler)
* 		.mouseout(handler)
* 		.mouseover(handler)
* 		.mouseup(handler)
* 		.resize(handler)
* 		.scroll(handler)
* 		.select(handler)
* 		.submit(handler)
* 		.load(handler)		
* 		.unload(handler)
* 3.特殊简写
* 		.hover(enter,leave)
* 		.toggle(handler1,handler2)
* 4.触发
* 		.trigger(type,[data])			触发事件，执行默认操作
* 		.triggerHandler(type,[data])	触发事件，不执行默认操作
* 5.简写触发
* 		.blur()
* 		.change()
* 		.click()
* 		.dblclick()
* 		.error()
* 		.focus()
* 		.keydown()
* 		.keypress()
* 		.keyup()
* 		.select()
* 		.submit()
* 6.实用方法
* 		.proxy(fn,context)	创建一个新的在指定上下文中执行的函数
*/

/**
* 效果
* 1.预定义
* 		.show()
* 		.hide()
* 		.show(speed,[callback])
* 		.hide(speed,[callback])
* 		.toggle([speed],[callback])
* 		.slideDown([speed],[callback])
* 		.slideUp([speed],[callback])
* 		.slideToggle([speed],[callback])
* 		.fadeIn([speed],[callback])
* 		.fadeOut([speed],[callback])
* 		.fadeToggle([speed],[callback])
* 		.fadeTo(speed,opacity,[callback])
* 2.自定义
* 		.animate(attributes,[speed],[easing],[callback])
* 		.animate(attributes,options)
* 3.队列
* 		.queue([queueName])
* 		.queue([queueName],callback)
* 		.queue([queueName],newQueue)
* 		.dequeue([queueName])
* 		.clearQueue([queueName])
* 		.stop([clearQueue],[jumpToEnd])
* 		.delay(duration,[queueName])
* 		.promise([queueName],[target])
*/

/**
* DOM操作
* 1.特性与属性
* 		.attr(key)
* 		.attr(key,value)
* 		.attr(key,fn)
* 		.attr(map)
* 		.removeAttr(key)
* 		.prop(key)
* 		.prop(key,value)
* 		.prop(key,fn)
* 		.prop(map)
* 		.removeProp(key)
* 		.addClass(class)
* 		.removeClass(class)
* 		.toggleClass(class)
* 		.hasClass(class)
* 		.val()
* 		.val(value)
* 2.内容
* 		.html()
* 		.html(value)
* 		.text()
* 		.text(value)
* 3.css
* 		.css(key)
* 		.css(key,value)
* 		.css(map)
* 4.尺寸
* 		.offset()
* 		.position()
* 		.scrollTop()
* 		.scrollTop(value)
* 		.scrollLeft()
* 		.scrollLeft(value)
* 		.height()
* 		.height(value)
* 		.width()
* 		.width(value)
* 		.innerHeight()
* 		.innerWidth()
* 		.outerHeight(value)
* 		.outerWidth(value)
* 5.插入
* 		.append()
* 		.appendTo()
* 		.prepend()
* 		.prependTo()
* 		.after()
* 		.insertAfter()
* 		.before()
* 		.insertBefore()
* 		.wrap()
* 		.wrapAll()
* 		.wrapInner()
* 6.替换
* 		.replaceWith(content)	将匹配元素替换			
* 		.replaceAll(selector)	将selector匹配的替换为匹配元素
* 7.删除
* 		.empty()	删除子节点
* 		.unwrap()	删除父元素
* 		.remove([selector])	移除
* 		.detach([selector])	移除但保留数据
* 8.复制
* 		.clone([withHandlers])
* 9.数据
* 		.data(key)			取得元素key的数据
* 		.data(key,value)	设置元素key的数据
* 		.removeData(key)	移除元素key的数据
*/

/**
* ajax
* 1.发送请求
* 		.load(url,[data],[callback])
* 		$.ajax(options)
* 		$.get(url,[data],[callback],[returnType])
* 		$.getJSON(url,[data],[callback])
* 		$.getScript(url,[callback])
* 		$.post(url,[data],[callback],[returnType])
* 2.监视请求
* 		.ajaxComplete(handler)
* 		.ajaxError(handler)
* 		.ajaxSend(handler)
* 		.ajaxStart(handler)
* 		.ajaxStop(handler)
* 		.ajaxSuccess(handler)
* 3.配置
* 		$.ajaxSetup(options)
* 		$.ajaxPrefilter([dataTypes],handlers)	每个$.ajax()请求前，修改请求选项
* 		$.ajaxTransport(transportFunction)		为ajax定义一个新的传输机制
* 4.实用方法
* 		.serialize()		将一组表单控件编码为一个查询字符串
* 		.serializeArray()	将一组表单控件编码为一个JSON数据
* 		$.param(map)		将map编码为查询字符串			
* 		$.globalEval(code)	在全局上下文中求值		
* 		$.parseJSON(json)	将json解析为js对象
* 		$.parseXML(xml)		将xml字符串解析为xml文档
*/

/**
* 延迟方法
* 1.创建对象
* 		$.Deferred([setupFunction])
* 		$.when(deferrends)
* 2.延迟对象的方法
* 		.resolve([args])
* 		.resolveWith(context,[args])
* 		.reject([args])
* 		.rejectWith(context,[args])
* 		.promise([target])
* 3.承若对象的方法
* 		.done(callback)		被解决
* 		.fail(callback)		被拒绝
* 		.always(callback)	被解决或被拒绝
* 		.then(doneCallbacks,failCallbacks)
* 		.isRejected()
* 		.isResolved()
* 		pipe([doneCallbacks],[failCallbacks])
*/

/**
* 其他方法
* 1.jquery对象属性
* 		$.support	返回各种属性，表示浏览器是否支持
* 2.数组和对象
* 		$.each(collections,callback)
* 		$.extend(target,addition)	将addition添加到target中
* 		$.grep(array,callback,[invert])				
* 		$.makeArray(object)		将对象转为一个数组
* 		$.map(array,callback)	对数组每一项操作，并返回新数组					
* 		$.inArray(value,array)	确定array中是否包含value，若没有返回-1				
* 		$.merge(array1,array2)	合并两个数组		
* 		$.unique(array)			从数组中移除重复的dom元素
* 3.对象内省
* 		$.isArray(object)		确定是不是数组
* 		$.isEmptyObject(object)	确定是不是空的
* 		$.isFunction(object)	确定是不是函数
* 		$.isPlainObject(object)	确定是不是对象
* 		$.isWindow(object)		确定是不是浏览器窗口
* 		$.isXMLDoc(object)		确实是不是xml
* 		$.type(object)			获得js类型
* 4.其他
* 		$.trim()		去除字符串中的空白符
* 		$.noConfilct()	让出$符号
* 		$.noop()		一个什么也不做的函数
* 		$.now()			返回当前时间，以秒数表示
*/