/**
 * 封装amazeui相关方法
 */
qiao.am = {};
qiao.am.loading = function(type, msg){
	if(type == 'open'){
		var $modal = $('#amloading'); 
		if($modal.length == 0){
			var ss = [];
			ss.push('<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="amloading">');
			ss.push('<div class="am-modal-dialog">');
			ss.push('<div class="am-modal-hd">' + (msg || '数据加载中...') + '</div>');
			ss.push('<div class="am-modal-bd"><span class="am-icon-spinner am-icon-spin"></span></div>');
			ss.push('</div>');
			ss.push('</div>');
			
			$('body').append(ss.join(''));
			$('#amloading').modal(); 
			qiao.on('#amloading', 'closed.modal.amui', function(){$('#amloading').remove();});
		} 
	}
	if(type == 'close'){
		var $modal = $('#amloading'); 
		if($modal.length > 0) $modal.modal('close'); 
	}
};
qiao.am.alert = function(msg, ok){
	var ss = [];
	ss.push('<div class="am-modal am-modal-alert" tabindex="-1" id="amalert">');
		ss.push('<div class="am-modal-dialog">');
			ss.push('<div class="am-modal-bd">' + (msg || '提示') + '</div>');
			ss.push('<div class="am-modal-footer">');
				ss.push('<span class="am-modal-btn alertok">确定</span>');
			ss.push('</div>');
		ss.push('</div>');
	ss.push('</div>');
	
	var str = ss.join('');
	$('body').append(str);
	
	var $modal = $('#amalert'); 
	$modal.modal();
	
	// bind
	qiao.on('span.alertok', 'click', function(){
		if(ok) ok();
		$modal.modal('close');
	});
	qiao.on('#amalert', 'closed.modal.amui', function(){
		$modal.remove();
	});
};
qiao.am.confirm = function(msg, ok, cancel){
	var mytitle = '提示';
	var mymsg = '提示';
	if(typeof msg == 'string'){
		mymsg = msg;
	}else{
		mymsg = msg.msg;
		mytitle = msg.title;
	}
	
	var ss = [];
	ss.push('<div class="am-modal am-modal-confirm" tabindex="-1" id="amconfirm">');
		ss.push('<div class="am-modal-dialog">');
			ss.push('<div class="am-modal-hd">' + mytitle + '</div>');
			ss.push('<div class="am-modal-bd">' + mymsg + '</div>');
			ss.push('<div class="am-modal-footer">');
				ss.push('<span class="am-modal-btn" data-am-modal-cancel>取消</span>');
				ss.push('<span class="am-modal-btn" data-am-modal-confirm>确定</span>');
			ss.push('</div>');
		ss.push('</div>');
	ss.push('</div>');
	
	var str = ss.join('');
	$('body').append(str);
	
	var $modal = $('#amconfirm'); 
	$modal.modal({
		relatedTarget: this,
        onConfirm: ok,
        onCancel: cancel
	});
	
	// bind
	qiao.on('#amconfirm', 'closed.modal.amui', function(){
		$modal.remove();
	});
};
qiao.am.modal = function(options){
	if(!options || !options.content) return;
	
	var ss = [];
	ss.push('<div class="am-modal am-modal-no-btn" tabindex="-1" id="ammodal">');
		ss.push('<div class="am-modal-dialog">');
			if(options.title) ss.push('<div class="am-modal-hd">提示</div>');
			ss.push('<div class="am-modal-bd">' + options.content + '</div>');
		ss.push('</div>');
	ss.push('</div>');
	$('body').append(ss.join(''));
	
	var $modal = $('#ammodal'); 
	$modal.modal();
	
	// bind
	qiao.on('#ammodal', 'closed.modal.amui', function(){$modal.remove();});
};