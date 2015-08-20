// 点击radio，得到所点击项的值
$('input[name="user"]').click(function(){
	alert($(this).val());
});

// 切换select，得到所选项的值
$('#test').change(function(){
	alert($(this).val());
});

// 获取选中的checkbox的id拼接字符串
var ids = [];
$('.mycheck:checked').each(function(){
	ids.push($(this).attr('data'));
});
alert(ids.join(','));