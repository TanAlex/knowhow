(function($) {
	"use strict";

	$('[data-toggle=collapse-next]').on('click.collapse-next.data-api', function(e) {
		var $target = $(this).parent().parent().next()
		e.preventDefault()
		$target.data('bs.collapse') ? $target.collapse('toggle') : $target.collapse()
	})
	
})(jQuery);