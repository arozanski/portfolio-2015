var app = (function () {
	'use strict';

	var init = function () {
		_bind();
		_adjust();
		_localscroll();
		_parallax();
	};

	var _bind = function() {
		window.onresize = _adjust;  	
	};

	var _localscroll = function() {
		$.localScroll(800);
	};

	var _parallax = function() {
		//.parallax(xPosition, speedFactor, outerHeight) options:
		//xPosition - Horizontal position of the element
		//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
		//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
		$('#home').parallax('50%', 0.1);
		//$('section').css({ 'height': window.innerHeight });
		$('#about').parallax('50%', 0.1);
		$('.bg').parallax('50%', 0.4);
		$('#third').parallax('50%', 0.3);
	};

	var _adjust = function() {
		$('#name').css({
			'height': $('#mephoto').width()
		});
	};

	return {
		init: init
	};

})();

$(app.init());