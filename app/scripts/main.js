var app = (function () {
	'use strict';

	var init = function () {
		_bind();
		_adjust();
		_localscroll();
		_parallax();
		_parallax2();
		_form();

		new GnMenu(document.getElementById('gn-menu'));
	};

	var _bind = function() {
		window.onresize = _adjust;  
		window.onload = _adjust;
		_inview($('#skills'));	
		_inview($('#scene-v6'));	
		_inview($('#scene-360'));
		if(navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
			_scrollToTop();	
		}
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
		$('#me-name').css({
			'height': $('#mephoto').width()
		});

		if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		    $('#contact-box').css({
				'height': $('#rc-link').height()
			});

			$('aside .label').css({
				'top': '11px'
			});
		}
		
		$('#slides').slidesjs({
        	width: 600,
        	height: 400,
        	play: {
				active: false,
				// [boolean] Generate the play and stop buttons.
				// You cannot use your own buttons. Sorry.
				effect: 'fade',
				// [string] Can be either "slide" or "fade".
				interval: 4000,
				// [number] Time spent on each slide in milliseconds.
				auto: true,
				// [boolean] Start playing the slideshow on load.
				swap: true,
				// [boolean] show/hide stop and play buttons
				pauseOnHover: false,
				// [boolean] pause a playing slideshow on hover
				restartDelay: 2500
				// [number] restart delay on inactive slideshow
			},
			effect: {
				fade: {
					speed: 500,
					// [number] Speed in milliseconds of the fade animation.
					crossfade: true
					// [boolean] Cross-fade the transition.
				}
			}
     	});
	};

	var _parallax2 = function() {
		$('#scene-v6').prllx();
		$('#scene-360').prllx();
	};

	var _form = function() {
		$('#contactFrm').validate({
            rules: {
                name: 'required',
                email: {
                  required: true,
                  email: true
                },
                message: 'required'
            },
            submitHandler: function() {
                var url = 'http://armand.rozanski.pro/mailsender.php';
                $.post(url, $('#contactFrm').serialize(), function() {
                    $('#successMsg').fadeIn(300);
                    $('#name').val('');
                    $('#email').val('');
                    $('#contact textarea').val('');
                }).fail(function() {
                    $('#errorMsg').fadeIn(300);
                });
                return false;
            }
        });

        $('.close').bind('click', function(e) {
        	e.preventDefault();
            $(this).parent().fadeOut(300);
        });
	};

	var _scrollToTop = function() {
		$('body').scrollToTop({
			distance: 200,
			speed: 1000,
			easing: 'linear',
			animation: 'slide', // fade, slide, none
			animationSpeed: 500,

			mobile: {
			    width: 768,
			    distance: 100,
			    speed: 1000,
			    easing: 'easeInOutElastic',
			    animation: 'slide',
			    animationSpeed: 200
			},

			trigger: null, // Set a custom triggering element. Can be an HTML string or jQuery object
			target: null, // Set a custom target element for scrolling to. Can be element or number
			text: '<i class="fa fa-angle-double-up"></i>', // Text for element, can contain HTML

			skin: null,
			throttle: 250,

			namespace: 'scrollToTop'
		});
	};

	return {
		init: init
	};

})();

$(app.init());