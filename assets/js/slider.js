/**
 * @author monkindey
 * @date 2015.11.21
 */
(function($) {

	$('.refresh').on('click', function() {
		var loop = ['#washer', '#egg', '#shake', '#piano'];
		var random = parseInt(Math.random() * 4);

		location.hash = loop[random];

		// var $slider = $('.captcha-slider');
		// var $list = $slider.find('.captcha-list');
		// var $captcha = $list.find('.captcha');
		// var len = $captcha.length;

		// var captchaWidth = $captcha.width();
		// var listWidth = $list.width();

		// var x = 0;
		// var hash = location.hash;

		// var next = $(this).data('next');

		// if (hash) {
		// 	loop.indexOf(hash);
		// }

		// $list.css({
		// 	'-webkit-transform': 'translate3d(' + -(next * listWidth) + 'px, 0, 0)'
		// });
	});


	$.fn.slider = function(config) {
		var $slider = $(this);
		var $list = $slider.find('.captcha-list');
		var $captcha = $list.find('.captcha');
		var len = $captcha.length;

		var captchaWidth = $captcha.width();
		var listWidth = $list.width();

		window.onhashchange = function() {
			// $list.css({
			// 	'-webkit-transform': 'translate3d(' + -listWidth + 'px, 0, 0)'
			// });
		}

	}

	// $('.captcha-slider').slider();
})(Zepto)