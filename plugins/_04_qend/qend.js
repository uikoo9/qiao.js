/**
 * qend
 * 到达页面底部后自动加载内容
 * end：到达底部后的回调函数
 * $d：容器，默认是$(window)
 * $c：内容，默认是$(document)
 * 可以参考：plugins/_04_qend/qend.html
 */
function qend(end, $d, $c){
	if(end){
		var $d = $d || $(window);
		var $c = $c || $(document);
		
		$d.scroll(function(){if($d.scrollTop() + $d.height() >= $c.height()) end();});
	}else{
		$(window).scroll(null);
	}
}