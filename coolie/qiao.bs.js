/**
 * qiao.bs.js
 * 1.alert
 * 2.confirm
 * 3.dialog
 * 4.msg
 * 5.tooltip
 * 6.popover
 * 7.scrollspy
 * 8.initimg
 * 9.bsdate
 * 10.bstro
 */
define(function (require, exports, module) {
    'use strict';
    
	exports.bs 	= {};
	exports.bs.modaloptions = {
		url 	: '',
		fade	: 'fade',
		close	: true,
		title	: 'title',
		head	: true,
		foot	: true,
		btn		: false,
		okbtn	: '确定',
		qubtn	: '取消',
		msg		: 'msg',
		big		: false,
		show	: false,
		remote	: false,
		backdrop: 'static',
		keyboard: true,
		style	: '',
		mstyle	: ''
	};
	exports.bs.modalstr = function(opt){
		var start = '<div class="modal '+opt.fade+'" id="bsmodal" tabindex="-1" role="dialog" aria-labelledby="bsmodaltitle" aria-hidden="true" style="position:fixed;top:20px;'+opt.style+'">';
		if(opt.big){
			start += '<div class="modal-dialog modal-lg" style="'+opt.mstyle+'"><div class="modal-content">';
		}else{
			start += '<div class="modal-dialog" style="'+opt.mstyle+'"><div class="modal-content">';
		}
		var end = '</div></div></div>';
		
		var head = '';
		if(opt.head){
			head += '<div class="modal-header">';
			if(opt.close){
				head += '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
			}
			head += '<h3 class="modal-title" id="bsmodaltitle">'+opt.title+'</h3></div>';
		}
		
		var body = '<div class="modal-body"><p><h4>'+opt.msg+'</h4></p></div>';
		
		var foot = '';
		if(opt.foot){
			foot += '<div class="modal-footer"><button type="button" class="btn btn-primary bsok">'+opt.okbtn+'</button>';
			if(opt.btn){
				foot += '<button type="button" class="btn btn-default bscancel">'+opt.qubtn+'</button>';
			}
			foot += '</div>';
		}
		
		return start + head + body + foot + end;
	};
	exports.bs.alert = function(options, func){
		// options
		var opt = $.extend({}, exports.bs.modaloptions);
		
		opt.title = '提示';
		if(typeof options == 'string'){
			opt.msg = options;
		}else{
			$.extend(opt, options);
		}
		
		// add
		$('body').append(exports.bs.modalstr(opt));
		
		// init
		var $modal = $('#bsmodal'); 
		$modal.modal(opt);
		
		// bind
		exports.on('button.bsok', 'click', function(){
			if(func) func();
			$modal.modal('hide');
		});
		exports.on('#bsmodal', 'hidden.bs.modal', function(){
			$modal.remove();
		});
		
		// show
		$modal.modal('show');
	};
	exports.bs.confirm = function(options, ok, cancel){
		// options
		var opt = $.extend({}, exports.bs.modaloptions);
	
		opt.title = '确认操作';
		if(typeof options == 'string'){
			opt.msg = options;
		}else{
			$.extend(opt, options);
		}
		opt.btn = true;
		
		// append
		$('body').append(exports.bs.modalstr(opt));
		
		// init
		var $modal = $('#bsmodal'); 
		$modal.modal(opt);
		
		// bind
		exports.on('button.bsok', 'click', function(){
			if(ok) ok();
			$modal.modal('hide');
		});
		exports.on('button.bscancel', 'click', function(){
			if(cancel) cancel();
			$modal.modal('hide');
		});
		exports.on('#bsmodal', 'hidden.bs.modal', function(){
			$modal.remove();
		});
		
		// show
		$modal.modal('show');
	};
	exports.bs.dialog = function(options, func){
		// options
		var opt = $.extend({}, exports.bs.modaloptions, options);
		opt.big = true;
		
		// append
		$('body').append(exports.bs.modalstr(opt));
		
		// ajax page
		exports.ajax({url:options.url,dataType:'html'}, function(html){$('#bsmodal div.modal-body').empty().append(html);});
			
		// init
		var $modal = $('#bsmodal'); 
		$modal.modal(opt);
		
		// bind
		exports.on('button.bsok', 'click', function(){
			var flag = true;
			if(func){
				flag = func();
			}
			
			if(flag){
				$modal.modal('hide');
			}
		});
		exports.on('#bsmodal', 'hidden.bs.modal', function(){
			$modal.remove();
		});
		
		// show
		$modal.modal('show');
	};
	exports.bs.msgoptions = {
		msg  : 'msg',
		type : 'info',
		time : 2000,
		position : 'top',
	};
	exports.bs.msgstr = function(msg, type, position){
		return '<div class="alert alert-'+type+' alert-dismissible" role="alert" style="display:none;position:fixed;' + position + ':0;left:0;width:100%;z-index:2001;margin:0;text-align:center;" id="bsalert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+msg+'</div>';
	};
	exports.bs.msg = function(options){
		var opt = $.extend({},exports.bs.msgoptions);
		
		if(typeof options == 'string'){
			opt.msg = options;
		}else{
			$.extend(opt, options);
		}
		
		$('body').prepend(exports.bs.msgstr(opt.msg, opt.type , opt.position));
		$('#bsalert').slideDown();
		setTimeout(function(){
			$('#bsalert').slideUp(function(){
				$('#bsalert').remove();
			});
		},opt.time);
	};
	exports.bs.popoptions = {
		animation 	: true,
		container 	: 'body',
		content		: 'content',
		html		: true,
		placement	: 'bottom',
		title		: '',
		trigger		: 'hover'//click | hover | focus | manual.
	};
	$.fn.bstip = function(options){
		var opt = $.extend({}, exports.bs.popoptions);
		if(typeof options == 'string'){
			opt.title = options;
		}else{
			$.extend(opt, options);
		}
		
		$(this).data(opt).tooltip();
	};
	$.fn.bspop = function(options){
		var opt = $.extend({}, exports.bs.popoptions);
		if(typeof options == 'string'){
			opt.content = options;
		}else{
			$.extend(opt, options);
		}
		
		$(this).popover(opt);
	};
	exports.bs.spy = function(target,body){
		var $body = 'body';
		var $target = '.scrolldiv';
		
		if(body) $body = body;
		if(target) $target = target;
		
		$($body).scrollspy({target:$target});
	};
	exports.bs.initimg = function(){
		$('img').each(function(){
			var clazz = $(this).attr('class');
			if(clazz){
				if(clazz.indexOf('img-responsive') == -1) $(this).addClass('img-responsive');
			}else{
				$(this).addClass('img-responsive');
			}
		});
	};
	exports.bs.bsdateoptions = {
		autoclose: true,
		language : 'zh-CN',
		format: 'yyyy-mm-dd'
	};
	exports.bs.bsdate = function(selector, options){
		if(selector){
			var $element = $(selector);
			if($element.length > 0){
				var opt = $.extend({}, exports.bs.bsdateoptions, options);
				$element.each(function(){
					$(this).datepicker(opt);
				});
			}
		}
	};
	exports.bs.bstrooptions = {
		width 	: '500px',
		html 	: 'true',
		nbtext	: '下一步',
		place 	: 'bottom',
		title 	: '网站使用引导',
		content : 'content'
	};
	exports.bs.bstroinit = function(selector, options, step){
		if(selector){
			var $element = $(selector);
			if($element.length > 0){
				var opt = $.extend({}, exports.bs.bstrooptions, options);
				if(typeof options == 'string'){
					opt.content = options;
				}else{
					$.extend(opt, options);
				}
				
				$element.each(function(){
					$(this).attr({
						'data-bootstro-width'			: opt.width, 
						'data-bootstro-title' 			: opt.title, 
						'data-bootstro-html'			: opt.html,
						'data-bootstro-content'			: opt.content, 
						'data-bootstro-placement'		: opt.place,
						'data-bootstro-nextButtonText'	: opt.nbtext,
						'data-bootstro-step'			: step
					}).addClass('bootstro');
				});
			}
		}
	};
	exports.bs.bstroopts = {
		prevButtonText : '上一步',
		finishButton : '<button class="btn btn-lg btn-success bootstro-finish-btn"><i class="icon-ok"></i>完成</button>',
		stopOnBackdropClick : false,
		stopOnEsc : false
	};
	exports.bs.bstro = function(bss, options){
		if(bss && bss.length > 0){
			for(var i=0; i<bss.length; i++){
				exports.bs.bstroinit(bss[i][0], bss[i][1], i);
			}
			
			var opt = $.extend({}, exports.bs.bstroopts);
			if(options){
				if(options.hasOwnProperty('pbtn')){
					opt.prevButtonText = options.pbtn;
				}
				if(options.hasOwnProperty('obtn')){
					if(options.obtn == ''){
						opt.finishButton = '';
					}else{
						opt.finishButton = '<button class="btn btn-mini btn-success bootstro-finish-btn"><i class="icon-ok"></i>'+options.obtn+'</button>';
					}
				}
				if(options.hasOwnProperty('stop')){
					opt.stopOnBackdropClick = options.stop;
					opt.stopOnEsc = options.stop;
				}
				if(options.hasOwnProperty('exit')){
					opt.onExit = options.exit;
				}
			}
			
			bootstro.start('.bootstro', opt);
		}
	};
	exports.bs.search = function(selector, options){
		if(!selector || !options || !options.url || !options.make || !options.back) return;
		
		var $this = $(selector);
		var zIndex = options.zIndex || 900;
		var bgColor = options.bgColor || '#fff';
		
		var $table = $('<table class="table table-bordered table-hover" style="position:absolute;display:none;margin-top:10px;width:95%;z-index:' + zIndex + ';background-color:' + bgColor + ';"></table>');
		$this.after($table);
		
		var tid,xhr;
		exports.on(selector, 'keyup', function(){
			if(tid) clearTimeout(tid);
			if(xhr) xhr.abort();
			tid = setTimeout(function(){
				var code = $this.val();
				if(code){
					xhr = $.ajax({
						url: base + options.url + '?code=' + code,
						type:'get',
						dataType:'json'
					}).done(function(json){
						if(json && json.type == 'success'){
							var codes = json.object;
							if(codes && codes.length > 0){
								$table.empty();
								$.each(codes, function(i, item){
									if(item) $table.append('<tr class="qsearchtr" style="cursor:pointer;" data-id="' + item.id + '"><td>' + options.make(item) + '</td></tr>');
								});
							}
						}
						
						$table.show();
					});
				}
			}, 500);
		});
		
		exports.on('tr.qsearchtr', 'click', function(){
			options.back($(this).data('id'));
			
			$this.val($(this).find('td').text());
			$table.hide();
		});
	};
});