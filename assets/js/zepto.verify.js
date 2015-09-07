/**
 * @author monkindey
 * @date 2015.9.7
 * @description 验证
 * config：
 * (1). success
 * (2). failure
 * (3). condition
 * (4). content 验证是如何展示?
 * (5). initUI
 */
(function($) {
	$.verify = function(config) {
		this.content = config.content;
		this.target = $(config.target);

		function init(config) {
			config.initUI.call(this);
			console.log(config);
			this.target.on('success', config.success.bind(this));
			this.target.on('failure', config.failure.bind(this));
		}

		return init.call(this, config);
	};
})(Zepto)