/**
 * @author monkindey
 * @date 2015.9.1
 * @description 下降物体
 *
 * 利用渐进增强的理念去实现插件
 *
 * 1. 参数：
 * (1). bound：边界
 *
 * 2. Event：
 * down：下降时候触发的事件
 */

(function($) {
	var DOWN_TIME_GAP = 40;
	
	$.fn.down = function(options) {
		// 在这个项目中是指下落的鸡蛋
		var $downItem = $(this);
		// 鸡蛋下降的边界
		var bound = options.bound;
		var result = options.result;

		setTimeout(function down() {
			$downItem.css({
				'top': $downItem.offset().top + 1 + 'px'
			});

			$downItem.trigger('down');
			if ($downItem.offset().top <= bound) {
				// 继续下降
				setTimeout(down, DOWN_TIME_GAP);
			} else {
				result();
			}
		}, DOWN_TIME_GAP);
	}
})(Zepto)