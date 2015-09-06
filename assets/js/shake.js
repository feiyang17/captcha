(function($) {
	var ball = document.querySelector('.ball');
	var garden = document.querySelector('.garden');
	var output = document.querySelector('.output');

	var maxX = garden.clientWidth - ball.clientWidth;
	var maxY = garden.clientHeight - ball.clientHeight;

	console.log(maxY + '...' + maxX);

	function handleOrientation(event) {
		console.dir(event);
		var x = event.beta; // In degree in the range [-180,180]
		var y = event.gamma; // In degree in the range [-90,90]

		output.innerHTML = "beta : " + x + "\n";
		output.innerHTML += "gamma: " + y + "\n";

		// Because we don't want to have the device upside down
		// We constrain the x value to the range [-90,90]
		if (x > 90) {
			x = 90
		};
		if (x < -90) {
			x = -90
		};

		// To make computation easier we shift the range of 
		// x and y to [0,180]
		x += 90;
		y += 90;

		// 10 is half the size of the ball
		// It center the positioning point to the center of the ball
		// ball.style.top = (maxX * x / 180 - 10) + "px";
		ball.style.left = (maxY * y / 180 - 10) + "px";
		var left = $(ball).offset().left;

		if (left < 80) {
			// $(ball).down({
			// 	bound: 300,
			// 	result: function() {
			// 		console.log('123');
			// 	}
			// });
			
			$(ball).addClass('animg50');
			

			// var ballParabola = new Parabola({
			// 	el: ".ball",
			// 	offset: [100, 70],
			// 	curvature: 0.005,
			// 	duration: 2000
			// });


			// ballParabola.start();
			window.removeEventListener("deviceorientation", handleOrientation, true);
		}

	}

	window.addEventListener("deviceorientation", handleOrientation, true);
})(Zepto)