# qiao.js
常用js总结，以及封装bootstrap。

## 简介
qiao.js分为两大块：qiao.util.js,qiao.bs.js。

qiao.util.js

1. qser：将表单转为js对象
2. qdata：获取data属性
3. qiao.on：事件绑定
4. qiao.is：输入判断
5. qiao.ajax：ajax请求
6. qiao.totop：返回到顶部
7. qiao.qrcode：生成二维码
8. qiao.end：到达底部后自动执行
9. qiao.cookie：操作cookie
10. qiao.search：获取url参数

qiao.bs.js

1. alert
2. confirm
3. dialog
4. msg
5. tooltip
6. popover
7. scrollspy
8. initimg
9. bsdate
10. bstro

## 文件结构
	|--_other：无关的东西
	|--coolie：模块化的qiao.js
	|--plugins：qiao.util.js中一些方法的示例
	|--qiao.h.js:对html5+的封装
	|--qiao.js：qiao.util.js+qiao.bs.js
