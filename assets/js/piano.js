(function($) {
	var $pianoCaptcha = $('.piano-captcha');
	// 验证码
	var code = '1155665';
	var count = 0;

	// 0 ~ 9 随机数
	var rand9 = function() {
		return ~~(Math.random() * 10);
	};

	// 生成验证码
	var generateCode = function() {
		code = '';
		for (var i = 0; i < 4; i++) {
			code += rand9();
		}
		return code;
	};

	var initPage = function() {
		var initCode = generateCode();
		$('#code').html(initCode);

		$.verify({
			target: '.piano-captcha',
			content: '',
			initUI: function() {
				// this.target.append('<div class="mask" style="display: none"></div>');
				// this.target.find('.mask').append(this.content);
				this.target.append('<em id="piano-success" class="success" style="display:none"></em>\
				<em id="piano-failure" class="failure" style="display:none"></em>');
			},
			// 验证成功
			success: function() {
				// console.log('success');
				var target = this.target;
				$('#piano-success').show().addClass('show');
				$('#piano-failure').hide();

				// target.find('.mask').show();
				// target.find('.yes').show();
				// target.find('.no').hide();
				try {
					return control.toastMessage(1);
				} catch (e) {}
			},

			// 验证失败
			failure: function() {
				// console.log('failure');
				var target = this.target;
				$('#piano-failure').show().addClass('show');
				$('#piano-success').hide();

				// target.find('.mask').show();
				// target.find('.yes').hide();
				// target.find('.no').show();

				var captchas = ['egg', 'shake', 'washer', 'piano'];
				setTimeout(function() {
					var random = parseInt(Math.random() * 4);
					window.location.href = captchas[random] + '.html';
				}, 1000);
				// 与webview交互
				try {
					return control.toastMessage(0);
				} catch (e) {}
			}
		});
	};

	var initEvent = function() {
		$('.refresh').on('click', function() {
			var captchas = ['egg', 'shake', 'washer', 'piano'];
			var random = parseInt(Math.random() * 4);
			window.location.href = captchas[random] + '.html';
		});
		
		$('.piano li').on({
			// 添加点击效果
			'touchstart': function() {
				$(this).addClass('active');
			},

			'touchend': function() {
				$(this).removeClass('active');
			},

			'tap': function() {
				// 正在播放的音符
				var $playingNote = $(this);
				var index = $playingNote.data('index');
				// 得到正在弹的音符，为了后面验证
				var note = $playingNote.data('note') || index;
				var keyboard = $('.keyboard').get(index - 1);
				console.log(note);

				if (!keyboard.ended) {
					// keyboard.load();
					keyboard.currentTime = 0;
					keyboard.play();
				}

				keyboard.play();

				if (count < 4) {
					if (note != code.charAt(count)) {
						count = 0;
						setTimeout(function() {
							$pianoCaptcha.trigger('failure')
						}, 500);
						console.log('failure');
						return;
					}
					count++;
				}

				// 等按七个键就出现成功
				if (count == 4) {
					setTimeout(function() {
						$pianoCaptcha.trigger('success')
					}, 500);
					console.log('success');
					count = 0;
				}

			}
		});
	};

	var init = function() {
		initPage();
		initEvent()
	};

	init();
})(Zepto)