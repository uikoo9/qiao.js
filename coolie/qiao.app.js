// ua
(function(){
	var ua = window.navigator.userAgent;
	
	window.qvendor = {};
	window.qvendor.mobile = /AppleWebKit.*Mobile.*/.test(ua);
	window.qvendor.android = /android/gi.test(ua);
	window.qvendor.ios = /(iphone|ipad|ipod)/gi.test(ua);
	window.qvendor.iphone = /iphone/gi.test(ua);
	window.qvendor.ipad = /ipad/gi.test(ua);
	window.qvendor.ipod = /ipod/gi.test(ua);
	window.qvendor.weixin = /micromessenger/gi.test(ua);
	window.qvendor.qq = / qq/gi.test(ua);
	window.qvendor.qqb = /mqqbrowser/gi.test(ua);
	window.qvendor.weibo = /weibo/gi.test(ua);
})();

// qmask
(function($){
	window.qmask = {};
	window.qmask.imgdownload	= 'https://img.niuguwang.com/static/img/qmask/qmask-download.png';
	window.qmask.imgopen		= 'https://img.niuguwang.com/static/img/qmask/qmask-open.png';
	window.qmask.show = function(flag){
		var src = flag ? window.qmask.imgopen : window.qmask.imgdownload;
		$('.qmask').find('img').attr('src', src).end().show();
	};
	window.qmask.hide = function(){
		$('.qmask').find('img').attr('src', '').end().hide();
	};
	window.qmask.init = function(){
		$('body').append('<div class="qmask"><img></div>');
		$('.qmask').css({
			'display'			: 'none',
			'position'			: 'fixed',
			'top'				: '0',
			'width'				: '100%',
			'height'			: '100%',
			'margin'			: '0 auto',
			'text-align'		: 'center',
			'background-color' 	: 'rgba(255, 255, 255, 0.9)',
			'z-index'			: '1200',
			'cursor'			: 'pointer'
		});
		$('.qmask img').css({
			'width' 			: '10rem',
			'margin-top'		: '3rem',
			'z-index'			: '1210'
		});
		$(document).on('click', '.qmask', function(){$(this).hide().find('img').attr('src', '');});
	};
	
	window.qmask.init();
})($);

// other
(function(){
	window.qurl = {
		'wwwurl'	: 'http://www.niuguwang.com/',
		'apkurl'	: 'http://www.niuguwang.com/niuguwang344.apk',
		'iosurl'	: 'https://itunes.apple.com/cn/app/id855046551',
		'yyburl'	: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.niuguwang.stock&g_f=991653',
		'appurl'	: 'wx37fb6ef9dd0dfafd://niuguwangtaojinzhe/'
	};
	
	window.qsearch = function(key){
		var res;
		
		var s = location.search;
		if(s){
			s = s.substr(1);
			if(s){
				var ss = s.split('&');
				for(var i=0; i<ss.length; i++){
					var sss = ss[i].split('=');
					if(sss && sss[0] == key) res = sss[1]; 
				}
			}
		}
		
		return res;
	};
})();

// download
function download(){
	var isappinstalled = qsearch('isappinstalled');
	if(qvendor.mobile){
		if(qvendor.weixin || qvendor.qq || qvendor.qqb){
			if(qvendor.ios){
				qmask.show(isappinstalled == '1');
			}
			if(qvendor.android){
				location.href = qurl.yyburl;
			}
			
			return;
		}
		
		if(qvendor.weibo){
			if(qvendor.ios){
				qmask.show(isappinstalled == '1');
			}
			if(qvendor.android){
				location.href = qurl.apkurl;
			}
			
			return;
		}
		
		if(qvendor.ios){
			location.href = (isappinstalled == '1') ? qurl.appurl : qurl.iosurl;
		}
		
		if(qvendor.android){
			location.href = qurl.apkurl;
		}
	}else{
		location.href = qurl.wwwurl;
	}
}

// init
$(function(){
	var isappinstalled = qsearch('isappinstalled') == '1';

	qurl.appurl = $('#downloadbtn').data('url') || qurl.appurl;
	
	if(qvendor.ios && isappinstalled) location.href = qurl.appurl;
	
	$('#downloadbtn').text(isappinstalled ? '打开客户端' : '下载客户端').click(download);
});