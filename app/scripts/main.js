var app = (function () {
	'use strict';

	var init = function () {
		_bind();
		_adjust();
		_localscroll();
		_parallax();
		_parallax2();
	};

	var _bind = function() {
		window.onresize = _adjust;  
		window.onload = _adjust;
		_inview($('#skills'));	
		_inview($('#scene-v6'));	
		_inview($('#scene-360'));	
	};

	var _inview = function(el) {
		$(el).on('inview', function (ev, visible) {
		    if (visible === true) {
		        $(this).addClass('inview');
		    }else{
		      $(this).removeClass('inview');
		    }
		});
	};

	var _localscroll = function() {
		$.localScroll(800);
	};

	var _parallax = function() {
		//.parallax(xPosition, speedFactor, outerHeight) options:
		//xPosition - Horizontal position of the element
		//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
		//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
		$('#home').parallax('50%', 0.15);
		$('#skills').parallax('50%', 0.3);
		//$('#other-projects').parallax('50%', 0.2);
	};

	var _adjust = function() {
		$('#name').css({
			'height': $('#mephoto').width()
		});
	};

	var _parallax2 = function() {
		$('#scene-v6').prllx();
		$('#scene-360').prllx();
	};

	return {
		init: init
	};

})();

$(app.init());