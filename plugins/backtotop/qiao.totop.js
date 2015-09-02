$.fn.qtotop = function(options) {
	var $this = $(this);
	$this.hide().click(function(){
		$("body, html").animate({
			scrollTop : "0px"
		});
	});
	
	var $window = $(window);
	$window.scroll(function(){
		if ($window.scrollTop()>0){
			$this.fadeIn();
		}else{
			$this.fadeOut();
		}
	});
};