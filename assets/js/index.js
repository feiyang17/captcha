(function() {
	var $apple = $('#apple');
	var appleOffset = $apple.offset();
	// 触碰点离苹果的边缘的距离
	var touchOffsetEdgeX, touchOffsetEdgeY;
	$apple.on({
		'touchstart': function(e) {
			var touch = e.touches[0];
			touchOffsetEdgeX = touch.pageX - appleOffset.left;
			touchOffsetEdgeY = touch.pageY - appleOffset.top;
			console.log('start: ' + 'X:' + edgeX + '....' + 'Y:' + edgeY);
		},

		'touchmove': function(e) {
			var touch = e.touches[0];
			// console.log(touch);
			console.log('move: ' + touch.pageX + '....' + touch.pageY);
			$apple.css({
				'left': touch.pageX - touchOffsetEdgeX + 'px',
				'top': touch.pageY - touchOffsetEdgeY + 'px'
			});	
		}
	});

})()