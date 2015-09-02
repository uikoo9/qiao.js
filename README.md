# qiao.js
常用js总结，以及封装bootstrap。

## 简介
qiao.js分为两大块：qiao.util.js,qiao.bs.js。

qiao.util.js

1. qiao.on：事件绑定
2. qiao.is：输入判断
3. qiao.ajax：ajax请求
4. qiao.totop：返回到顶部
5. qiao.qrcode：生成二维码
6. qiao.end：到达底部后自动执行
7. qiao.cookie：操作cookie
8. qiao.search：获取url参数

qiao.bs.js

1. alert
2. confirm
3. dialog
4. msg
5. tooltip
6. popover
7. bstree
8. scrollspy
9. initimg
10. bsdate
11. bstro

## 文件结构
	|--_other：无关的东西
	|--plugins：qiao.util.js中一些方法的示例
	|--qiao
	   |--qiao.bs.js：bootstrap的封装
	   |--qiao.util.js：一些常用的js方法
	|--qiao.js：qiao.util.js+qiao.bs.js
