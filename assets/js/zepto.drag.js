/**
 * @author monkindey
 * @date 2015.8.28
 * @description 基于zepto的拖拽插件
 *
 * 需要设置拖动的范围 range
 */

(function($) {
	$.fn.drag = function(options) {
		var touchOffsetEdgeX, touchOffsetEdgeY;
		options = options || {};
		// 设置拖动的范围
		var range = options.range || {};

		$(this).each(function(_, draggedItem) {
			var $draggedItem = $(draggedItem);
			$draggedItem.on({
				'touchstart': function(e) {
					var touch = e.touches[0];
					var draggedItemOffset = $draggedItem.offset();
					touchOffsetEdgeX = touch.pageX - draggedItemOffset.left;
					touchOffsetEdgeY = touch.pageY - draggedItemOffset.top;
				},

				'touchmove': function(e) {
					var touch = e.touches[0];
					var draggedItemOffset = $draggedItem.offset();
					var draggedItemY = draggedItemOffset.top;
					var draggedItemX = draggedItemOffset.left;

					console.log('move: ' + draggedItemY + '....' + draggedItemX);
					if (draggedItemY <= range.down && draggedItemY >= range.up &&
						draggedItemX >= range.left && draggedItemX <= range.right) {
						$draggedItem.css({
							'left': touch.pageX - touchOffsetEdgeX + 'px',
							'top': touch.pageY - touchOffsetEdgeY + 'px'
						});
					}
					$draggedItem.trigger('drag');
				},

				'touchend': function() {
					$draggedItem.trigger('dragEnd');
				}
			})
		});
	}
})(Zepto)