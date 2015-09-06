(function($) {
	// 0 ~ 9 随机数
	var rand9 = function() {
		return ~~ Math.round() * 10;
	};

	$('.piano li').on('tap', function() {
		var index = $(this).data('index');
		var keyboard = $('.keyboard').get(index);

		if (!keyboard.ended) {
			// keyboard.load();
			keyboard.currentTime = 0;
			keyboard.play();
		}

		keyboard.play();
		// console.log(keyboard.ended);
	});
})(Zepto)