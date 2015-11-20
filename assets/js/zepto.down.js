/**
 * @author monkindey
 * @date 2015.9.1
 * @description 下降物体
 *
 * 利用渐进增强的理念去实现插件
 *
 * 1. 参数：
 * (1). bound：边界
 * (2). result: 到了边界的情况
 *
 * 2. Event：
 * down：下降时候触发的事件
 */

(function($) {
	var DOWN_TIME_GAP = 10;

	$.fn.down = function(options) {
		// 这个项目中是指下落的鸡蛋
		var $downItem = $(this);
		// 鸡蛋下降的边界
		var bound = options.bound;
		var result = options.result;
		var y = 0;

		setTimeout(function down() {
			y = $downItem.offset().top;
			
			$downItem.css({
				'top': y + 3 + 'px'
			}).trigger('down');

			if (y <= bound) {
				// 继续下降
				setTimeout(down, DOWN_TIME_GAP);
			} else {
				result();
			}
		}, DOWN_TIME_GAP);
	}
})(Zepto)