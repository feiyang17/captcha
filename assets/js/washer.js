/**
 * 如何设置拖拽的终点? 
 * 最笨拙的使用了坐标
 */
(function($) {
	var $dress = $('.dress');
	var $pants = $('.pants');
	$('.dragable').drag({
		range: {
			up: 0,
			left: 0,
			down: 200,
			right: 280
		}
	});

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

	var isWasherRange = function(offset) {
		var $washer = $('.washer');
		var washerOffset = $washer.offset();
		var washerLeftEdge = washerOffset.left;
		var washerRightEdge = washerLeftEdge + washerOffset.width - offset.width;
		var washerTopEdge = washerOffset.top;
		var washerBottomEdge = washerTopEdge + washerOffset.height - offset.height;
		return offset.left <= washerRightEdge && offset.left >= washerLeftEdge && offset.top <= washerBottomEdge && offset.top >= washerTopEdge;
	}

	$dress.on({
		'dragEnd': function() {
			var dressOffset = $dress.offset();
			if (isWasherRange(dressOffset)) {
				$dress.addClass('grip');
			}
		},
		'webkitAnimationEnd': function() {
			var rotateWasher = $('.washer-rotate');
			$dress.hide();
			rotateWasher.show();
			rotateWasher.addClass('rotate');

			setTimeout(success, 100);
		}
	});

	$pants.on({
		'dragEnd': function() {
			var pantsOffset = $pants.offset();
			if (isWasherRange(pantsOffset)) {
				setTimeout(fail, 100);
			}
		}
	});
})(Zepto)