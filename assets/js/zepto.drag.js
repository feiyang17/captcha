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
					console.log('touchOffsetEdgeX' + touchOffsetEdgeX + 'touchOffsetEdgeY' + touchOffsetEdgeY);
					$draggedItem.trigger('dragStart');

					e.preventDefault();
					e.stopPropagation();
				},

				'touchmove': function(e) {
					var touch = e.touches[0];
					var draggedItemOffset = $draggedItem.offset();
					var draggedItemY = draggedItemOffset.top;
					var draggedItemX = draggedItemOffset.left;

					console.log('move: ' + draggedItemY + '....' + draggedItemX);
					// if (draggedItemY < range.down && draggedItemY > range.up &&
					// 	draggedItemX > range.left && draggedItemX < range.right) {
					// }

					// if(draggedItemY > range.down) {
					// 	$draggedItem.css('top', range.down + 'px');
					// }

					// console.log(touch.pageX - touchOffsetEdgeX + 'draggedItemX:' + draggedItemX + 'range.right:' + range.right);
					// if(draggedItemX > range.right) {
					// 	$draggedItem.css('left', range.right + 'px');
					// }

					var left = Math.max(Math.min(touch.pageX - touchOffsetEdgeX, range.right), range.left);
					var top = Math.max(Math.min(touch.pageY - touchOffsetEdgeY, range.down), range.up);

					// $draggedItem.css({
					// 	'left': touch.pageX - touchOffsetEdgeX + 'px',
					// 	'top': touch.pageY - touchOffsetEdgeY + 'px'
					// });

					$draggedItem.css({
						'left': left + 'px',
						'top': top + 'px'
					});

					$draggedItem.trigger('drag');
					e.preventDefault();
					e.stopPropagation();
				},

				'touchend': function(e) {
					$draggedItem.trigger('dragEnd');
					e.preventDefault();
					e.stopPropagation();
				}
			})
		});

	}
})(Zepto)