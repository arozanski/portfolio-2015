var app = (function () {
	'use strict';

	var init = function () {
		_bind();
		_adjust();
		_localscroll();
		_parallax();
		_parallax2();
		_form();
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
                $.post(url, $('#contact').serialize(), function() {
                    $('#successMsg').fadeIn(300);
                    $('#contact input[type="text"]').val('');
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

	return {
		init: init
	};

})();

$(app.init());