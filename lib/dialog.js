(function() {
	function Dialog(options) {
		this.options = options;
		this.init();
	}
	Dialog.prototype = {
		init: function() {},
		confirm: function(content, fn) {
			var width, height, left, top;
			var masker = $('<div style="position:absolute;z-index:10;top:0;left:0;right:0;bottom:0;background:#000;opacity:0.5;"></div>').appendTo('body');
			var container = $('<div style="position:absolute;z-index:11;top:50%;left:50%;max-width:80%;padding:30px 20px;background:#fff;border-radius:5px;color:#333;"></div>').appendTo('body');
			var con = $('<p style="padding:10px;line-height:24px;white-space:nowrap;"></p>').appendTo(container);
			var buttons = $('<p style="padding-top:10px;"></p>').appendTo(container);
			var submit = $('<a href="javascript:void(0)" style="display:inline-block;padding:5px 10px;border-radius:4px;background:#fff;color:#992;border:1px solid #a6cb12;">确定</a>').appendTo(buttons);
			var cancel = $('<a href="javascript:void(0)" style="display:inline-block;margin-left:20px;padding:5px 10px;border-radius:4px;background:#fff;color:#999;border:1px solid #999;">取消</a>').appendTo(buttons);
			con.html(content);

			left = parseInt(container.innerWidth()) / 2;
			top = parseInt(container.innerHeight()) / 2;
			container.css('marginTop', '-' + top + 'px').css('marginLeft', '-' + left + 'px');
			submit.bind('click', function() {
				fn && fn();
				masker.remove();
				container.remove();
			});
			cancel.bind('click', function() {
				masker.remove();
				container.remove();
			});
			return this;
		},
		alert: function(content, fn) {
			var width, height, left, top;
			var masker = $('<div style="position:absolute;z-index:10;top:0;left:0;right:0;bottom:0;background:#000;opacity:0.5;"></div>').appendTo('body');
			var container = $('<div style="position:absolute;z-index:11;top:50%;left:50%;max-width:80%;padding:30px 20px;background:#fff;border-radius:5px;color:#333;"></div>').appendTo('body');
			var con = $('<p style="padding:10px;line-height:24px;white-space:nowrap;"></p>').appendTo(container);
			var buttons = $('<p style="padding-top:10px;"></p>').appendTo(container);
			var submit = $('<a href="javascript:void(0)" style="display:block;padding:5px 10px;border-radius:4px;background:#fff;color:#992;border:1px solid #a6cb12;text-align:center">确定</a>').appendTo(buttons);
			con.html(content);
			left = parseInt(container.innerWidth()) / 2;
			top = parseInt(container.innerHeight()) / 2;
			container.css('marginTop', '-' + top + 'px').css('marginLeft', '-' + left + 'px');

			submit.bind('click', function() {
				fn && fn();
				masker.remove();
				container.remove();
			});
			return this;
		},
		pop: function(content, modal) {
			var width, height, left, top, masker;
			var container = this.container = $('<div style="position:absolute;z-index:11;top:50%;left:50%;max-width:80%;padding:30px 50px;line-height:24px;white-space:nowrap;background:#000;border-radius:5px;color:#fff;opacity:0.8"></div>').appendTo('body');
			if (modal) {
				masker = this.masker = $('<div style="position:absolute;z-index:10;top:0;left:0;right:0;bottom:0;background:#000;opacity:0.5;"></div>').appendTo('body');
			}
			container.html(content);
			left = parseInt(container.innerWidth()) / 2;
			top = parseInt(container.innerHeight()) / 2;
			container.css('marginTop', '-' + top + 'px').css('marginLeft', '-' + left + 'px');
			if (!modal) {
				window.setTimeout(function() {
					container.remove();
				},
				1000)
			}
			return this;
		},
		destroy: function() {
			this.masker.remove();
			this.container.remove();
			return null;
		}
	}
	window.dialog = function() {
		return new Dialog();
	}
})();

