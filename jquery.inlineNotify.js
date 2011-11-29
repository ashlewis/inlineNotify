/**
 * InlineNotification v1.0 jQuery Plugin
 * 
 * Requirements
 * jQuery 1.3.2+
 * jQuery UI 1.8.4+
 * 
 * @param object options - configuration options
 *   - string 		add_class		(default:'inline-success')	// notification class to be displayed (animated) NOTE: must be existing css class
 *	 - int/string 	fade_duration  	(default:1500) 				// duration of fade to/from notification class
 *	 - int/string 	pause_duration 	(default:2000) 				// duration of pause on notification class
 */

// create closure
(function($) {
	
	// plugin definition
	$.fn.inlineNotify = function(options) {
		
		// extend default settings with those provided.
		var settings = $.extend(
			{},
			$.fn.inlineNotify.defaults,
			options
		);
		
		// iterate each matched element
		return this.each(function() {
			
			var $this = $(this);

			// reset element to prevent issues when called again before animation is complete
			//  - stop any animations currently in progress for this element
			$this.stop(true, false);
			//  - remove style attribute (used by addClass to apply animation)
			$this.removeAttr("style");
			//  - remove added class
			$this.removeClass(settings.add_class);

			// animate addition of notification class
			$this.addClass(settings.add_class, settings.fade_duration, function() {					
				// pause and animate removal of notification class
				$this
					.delay(settings.pause_duration)
					.queue(function(){
						$this.removeClass(settings.add_class, settings.fade_duration);
						$this.dequeue();								
					});			
			});
		});	
	};
	
	// plugin default settings
	$.fn.inlineNotify.defaults = {
		add_class: 'inline-success', // notification class to be displayed (animated)
		fade_duration: 1500,		 // duration of fade to/from notification class
		pause_duration: 2000		 // duration of pause on notification class
	};

// end closure
})(jQuery);