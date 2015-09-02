/**
 * qcookie
 * 对jquery.cookie.js稍作封装
 * qcookie(key)：返回key对应的value
 * qcookie(key, null)： 删除key对应的cookie
 * qcookie(key, value)：设置key-value的cookie
 */
function qcookie(key, value){
	if(typeof value == 'undefined'){
		return $.cookie(key);
	}else if(value == null){
		$.cookie(key, value, {path:'/', expires: -1});
	}else{
		$.cookie(key, value, {path:'/', expires:1});
	}
}