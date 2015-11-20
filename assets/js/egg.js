/**
 * @author monkindey
 * @update 2015.11.18
 * 自我感觉是写的很乱
 */
(function($) {
	var $egg = $('.egg');
	var $basket = $('.basket');
	var $eggCaptcha = $('.egg-captcha');
	var $eggBroken = $('.egg-broken');
	var eggInitHeight = $egg.offset().height;
	var basketInitHeight = $basket.offset().height;
	var eggCaptchaOffset = $eggCaptcha.offset();

	// console.log('eggInitHeight: ' + eggInitHeight, 'basketInitHeight: ' + basketInitHeight);

	// 显示验证成功
	var success = function() {
		$('.mask').show();
		$('.yes').show();
		$('.no').hide();
		// 与webview交互
		try {
			return control.toastMessage(1);
		} catch (e) {}
		return 1;
	};

	// 显示验证失败
	var fail = function() {
		$('.mask').show();
		$('.no').show();
		$('.yes').hide();
		try {
			return control.toastMessage(0);
		} catch (e) {}
		return 0;
	};

	var isBasketRange = function(caughtOffset) {
		var basketOffset = $basket.offset();
		// 被接物底部(鸡蛋底部)
		var caughtBottom = caughtOffset.top + eggInitHeight;
		console.log(caughtOffset.top, caughtOffset.height, basketOffset.top);

		return caughtOffset.left >= basketOffset.left &&
			caughtOffset.left + caughtOffset.width <= basketOffset.width + basketOffset.left &&
			caughtBottom >= basketOffset.top &&
			caughtBottom <= basketOffset.top + basketInitHeight;
	};

	// 接到鸡蛋了
	var getEgg = function() {
		// 因为装有鸡蛋图片跟只有篮子的图片高度上不同
		// 会导致在切换图片的时候Y轴位置会改变
		// 这个方法不是好方法
		$basket.css({
			top: $basket.offset().top - 26 + 'px'
		}).addClass('get-egg');
	};

	// 接鸡蛋
	var catchEgg = function() {
		var eggOffset = $egg.offset();
		// 接到鸡蛋了
		if (isBasketRange(eggOffset)) {
			$egg.hide();
			getEgg();
			setTimeout(success, 200);
		}
	};

	var breakEgg = function() {
		// 蛋碎了一地
		$egg.hide();
		$eggBroken.show();
		setTimeout(fail, 200);
	}

	$basket.drag({
		range: {
			up: 0,
			left: 0,
			down: eggCaptchaOffset.height - basketInitHeight,
			// 这个实现不好，不过先实现出来吧
			// down: 375,
			right: eggCaptchaOffset.width - $basket.offset().width
			// right: 280
		}
	});

	$basket.on('dragStart', function() {
		$egg.down({
			// 下降的边界
			bound: eggCaptchaOffset.height - eggInitHeight,
			// 下降到边界的后果：蛋碎了
			result: breakEgg
		});

		$egg.on('down', function() {
			catchEgg();
		});
	});


})(Zepto)