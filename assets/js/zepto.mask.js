/**
 * @author monkindey
 * @date 2015.9.4
 * @description 遮罩层
 * @param: 
 * 	|__ origin: 从哪里开始覆盖
 *  |__ content
 */
(function($) {
	$.mask = function(config) {
		var $origin = $(config.origin);
		$origin.append('<div style="display: none" class="mask"></div>')
			.find('.mask').append(config.content);
	}
})(Zepto)