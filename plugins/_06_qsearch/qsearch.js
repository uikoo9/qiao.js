/**
 * qsearch
 * 获取url后参数中的value
 * qsearch(key)：返回参数中key对应的value
 * 可以参考：plugins/_06_qsearch/qsearch.html
 */
function qsearch(key){
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
}