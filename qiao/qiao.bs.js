/**
 * qiao.bs.js
 * 1.alert
 * 2.confirm
 * 3.dialog
 * 4.msg
 * 5.tooltip
 * 6.popover
 * 7.tree
 * 8.scrollspy
 * 9.initimg
 * 10.bsdate
 * 11.bstro
 */
qiao.bs 	= {};
qiao.bs.modaloptions = {
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
qiao.bs.modalstr = function(opt){
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
qiao.bs.alert = function(options, func){
	// options
	var opt = $.extend({}, qiao.bs.modaloptions);
	
	opt.title = '提示';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	
	// add
	$('body').append(qiao.bs.modalstr(opt));
	
	// init
	var $modal = $('#bsmodal'); 
	$modal.modal(opt);
	
	// bind
	qiao.on('button.bsok', 'click', function(){
		if(func) func();
		$modal.modal('hide');
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
qiao.bs.confirm = function(options, ok, cancel){
	// options
	var opt = $.extend({}, qiao.bs.modaloptions);

	opt.title = '确认操作';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	opt.btn = true;
	
	// append
	$('body').append(qiao.bs.modalstr(opt));
	
	// init
	var $modal = $('#bsmodal'); 
	$modal.modal(opt);
	
	// bind
	qiao.on('button.bsok', 'click', function(){
		if(ok) ok();
		$modal.modal('hide');
	});
	qiao.on('button.bscancel', 'click', function(){
		if(cancel) cancel();
		$modal.modal('hide');
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
qiao.bs.dialog = function(options, func){
	// options
	var opt = $.extend({}, qiao.bs.modaloptions, options);
	opt.big = true;
	
	// append
	$('body').append(qiao.bs.modalstr(opt));
	
	// ajax page
	qiao.ajax({url:options.url,dataType:'html'}, function(html){$('#bsmodal div.modal-body').empty().append(html);});
		
	// init
	var $modal = $('#bsmodal'); 
	$modal.modal(opt);
	
	// bind
	qiao.on('button.bsok', 'click', function(){
		var flag = true;
		if(func){
			flag = func();
		}
		
		if(flag){
			$modal.modal('hide');
		}
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
qiao.bs.msgoptions = {
	msg  : 'msg',
	type : 'info',
	time : 2000,
	position : 'top',
};
qiao.bs.msgstr = function(msg, type, position){
	return '<div class="alert alert-'+type+' alert-dismissible" role="alert" style="display:none;position:fixed;' + position + ':0;left:0;width:100%;z-index:2001;margin:0;text-align:center;" id="bsalert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+msg+'</div>';
};
qiao.bs.msg = function(options){
	var opt = $.extend({},qiao.bs.msgoptions);
	
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	
	$('body').prepend(qiao.bs.msgstr(opt.msg, opt.type , opt.position));
	$('#bsalert').slideDown();
	setTimeout(function(){
		$('#bsalert').slideUp(function(){
			$('#bsalert').remove();
		});
	},opt.time);
};
qiao.bs.popoptions = {
	animation 	: true,
	container 	: 'body',
	content		: 'content',
	html		: true,
	placement	: 'bottom',
	title		: '',
	trigger		: 'hover'//click | hover | focus | manual.
};
$.fn.bstip = function(options){
	var opt = $.extend({}, qiao.bs.popoptions);
	if(typeof options == 'string'){
		opt.title = options;
	}else{
		$.extend(opt, options);
	}
	
	$(this).data(opt).tooltip();
};
$.fn.bspop = function(options){
	var opt = $.extend({}, qiao.bs.popoptions);
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	$(this).popover(opt);
};
qiao.bs.tree = {};
qiao.bs.tree.options = {
	url 	: '',
	height 	: '600px',
	open	: true,
	edit	: false,
	checkbox: false,
	showurl	: true
};
$.fn.bstree = function(options){
	var opt = $.extend({}, qiao.bs.tree.options);
	if(options){
		if(typeof options == 'string'){
			opt.url = options;
		}else{
			$.extend(opt, options);
		}
	}
	
	var res = '加载失败！';
	var $this = $(this);
	qiao.ajax(opt.url + '/tree', function(json){
		if(json && json.object){
			var tree = json.object;
			
			var start = '<div class="panel panel-info"><div class="panel-body" ';
			if(opt.height != 'auto') 
				start += 'style="height:600px;overflow-y:auto;"';
			start += '><ul class="nav nav-list sidenav" id="treeul" data="url:' + opt.url +';">';
			var children = qiao.bs.tree.sub(tree, opt);
			var end = '</ul></div></div>';
			res = start + children + end;
		}
		
		$this.empty().append(res);
		qiao.bs.tree.init();
	});
};
qiao.bs.tree.sub = function(tree, opt){
	var res = '';
	if(tree){
		var res = 
			'<li>' + 
				'<a href="javascript:void(0);" data="id:' + tree.id + ';url:' + tree.url + ';">' + 
					'<span class="glyphicon glyphicon-minus"></span>';
		if(opt.checkbox){
			res += '<input type="checkbox" class="treecheckbox" ';
			if(tree.checked){
				res += 'checked';
			}
			res += '/>';
		}
			res += tree.text;
		if(opt.showurl){
			res += '(' + tree.url + ')';
		}
		if(opt.edit)
			res += 
				'&nbsp;&nbsp;<span class="label label-primary bstreeadd">添加子菜单</span>' + 
				'&nbsp;&nbsp;<span class="label label-primary bstreeedit">修改</span>' + 
				'&nbsp;&nbsp;<span class="label label-danger  bstreedel">删除</span>';
			res += '</a>';
		var children = tree.children;
		if(children && children.length > 0){
				res += '<ul style="padding-left:20px;" id="treeid_' + tree.id + '" class="nav collapse ';
			if(opt.open) 
				res += 'in';
				res += '">';
			for(var i=0; i<children.length; i++){
				res += qiao.bs.tree.sub(children[i], opt);
			}
				res += '</ul>';
		}
		res += '</li>';
	}
	
	return res;
};
qiao.bs.tree.init = function(){
	qiao.on('#treeul .glyphicon-minus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('hide');
			$(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
		}
	});
	qiao.on('#treeul .glyphicon-plus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('show');
			$(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');
		}
	});
	qiao.on('input.treecheckbox', 'change', function(){
		// 检测子级的
		var subFlag = $(this).prop('checked');
		$(this).parent().next().find('input.treecheckbox').each(function(){
			$(this).prop('checked', subFlag);
		});
		
		// 检测父辈的
		var parentFlag = true;
		var $ul = $(this).parent().parent().parent(); 
		$ul.children().each(function(){
			var checked = $(this).children().children('input').prop('checked');
			if(!checked) parentFlag = false;
		});
		$ul.prev().children('input').prop('checked', parentFlag);
	});
	
	qiao.bs.tree.url = $('#treeul').qdata().url;
	if(qiao.bs.tree.url){
		qiao.on('.bstreeadd', 'click', qiao.bs.tree.addp);
		qiao.on('.bstreedel', 'click', qiao.bs.tree.del);
		qiao.on('.bstreeedit', 'click', qiao.bs.tree.editp);
	}
};
qiao.bs.tree.addp = function(){
	qiao.bs.dialog({
		url 	: qiao.bs.tree.url + '/add/' + $(this).parent().qdata().id,
		title 	: '添加子菜单',
		okbtn 	: '保存'
	}, qiao.bs.tree.add);
};
qiao.bs.tree.add = function(){
	var res;
	qiao.ajax({url:qiao.bs.tree.url + '/save',data:$('#bsmodal').find('form').qser(),async: false}, function(obj){res = obj;});
	
	qiao.bs.msg(res);
	if(res && res.type == 'success'){
		qiao.crud.url = qiao.bs.tree.url;
		qiao.crud.reset();
		return true;
	}else{
		return false;
	}
};
qiao.bs.tree.del = function(){
	qiao.ajax({
		url:qiao.bs.tree.url + '/del/' + $(this).parent().qdata().id,
	}, function(res){
		qiao.bs.msg(res);
		
		if(res && res.type == 'success'){
			qiao.crud.url = qiao.bs.tree.url;
			qiao.crud.reset();
		}
	});
};
qiao.bs.tree.editp = function(){
	qiao.bs.dialog({
		url 	: qiao.bs.tree.url + '/savep?id=' + $(this).parent().qdata().id,
		title 	: '修改菜单',
		okbtn 	: '保存'
	}, qiao.bs.tree.edit);
};
qiao.bs.tree.edit = function(){
	qiao.crud.url = qiao.bs.tree.url;
	return qiao.crud.save();
};
qiao.bs.spy = function(target,body){
	var $body = 'body';
	var $target = '.scrolldiv';
	
	if(body) $body = body;
	if(target) $target = target;
	
	$($body).scrollspy({target:$target});
};
qiao.bs.initimg = function(){
	$('img').each(function(){
		var clazz = $(this).attr('class');
		if(clazz){
			if(clazz.indexOf('img-responsive') == -1) $(this).addClass('img-responsive');
		}else{
			$(this).addClass('img-responsive');
		}
	});
};
qiao.bs.bsdateoptions = {
	autoclose: true,
	language : 'zh-CN',
	format: 'yyyy-mm-dd'
};
qiao.bs.bsdate = function(selector, options){
	if(selector){
		var $element = $(selector);
		if($element.length > 0){
			var opt = $.extend({}, qiao.bs.bsdateoptions, options);
			$element.each(function(){
				$(this).datepicker(opt);
			});
		}
	}
};
qiao.bs.bstrooptions = {
	width 	: '500px',
	html 	: 'true',
	nbtext	: '下一步',
	place 	: 'bottom',
	title 	: '网站使用引导',
	content : 'content'
};
qiao.bs.bstroinit = function(selector, options, step){
	if(selector){
		var $element = $(selector);
		if($element.length > 0){
			var opt = $.extend({}, qiao.bs.bstrooptions, options);
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
qiao.bs.bstroopts = {
	prevButtonText : '上一步',
	finishButton : '<button class="btn btn-lg btn-success bootstro-finish-btn"><i class="icon-ok"></i>完成</button>',
	stopOnBackdropClick : false,
	stopOnEsc : false
};
qiao.bs.bstro = function(bss, options){
	if(bss && bss.length > 0){
		for(var i=0; i<bss.length; i++){
			qiao.bs.bstroinit(bss[i][0], bss[i][1], i);
		}
		
		var opt = $.extend({}, qiao.bs.bstroopts);
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
qiao.bs.search = function(selector, options){
	if(!selector || !options || !options.url || !options.make || !options.back) return;
	
	var $this = $(selector);
	var zIndex = options.zIndex || 900;
	var bgColor = options.bgColor || '#fff';
	
	var $table = $('<table class="table table-bordered table-hover" style="position:absolute;display:none;margin-top:10px;width:95%;z-index:' + zIndex + ';background-color:' + bgColor + ';"></table>');
	$this.after($table);
	
	var tid,xhr;
	qiao.on(selector, 'keyup', function(){
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
	
	qiao.on('tr.qsearchtr', 'click', function(){
		options.back($(this).data('id'));
		
		$this.val($(this).find('td').text());
		$table.hide();
	});
};