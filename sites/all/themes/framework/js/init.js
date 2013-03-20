define([ 'config' ], function(config) {
 

 	var init = function(){

 		/////// HOME PAGE ///////

		//Clicking on main menu on home page
		$('.front #navigation .menu li a').bind('click', function(event){
			event.preventDefault();
			$('#carousel').slideToggle(config.PAGE_TRANSITION_TIME, function(){
				$('#oldcastle-logo').hide();
				$('#gsapp-logo').hide();
			});
		});


		/////// ABOUT ///////
		$('#secondary-nav-affiliates a').bind('click', config.scrollToAffiliates);
		$('#secondary-nav-people a').bind('click', config.scrollToPeople);
		$(document).bind('scroll', config.scrollSpy);

		/////// LIBRARY OF WORK ///////
		config.appendTagFilter();



		/////// CAROUSEL ///////

		//Bind carousel buttons to actions
		$('#carousel-next').bind('click', config.incrementCarousel);
		$('#carousel-prev').bind('click', config.decrementCarousel);

		//begin the carousel cycle if home page
		if( $('body').hasClass('front')){
			config.cycleCarousel();
		}



		/////// RESIZE FUNCTIONS ///////

		//call the resizeFunc on page load and bind to window resize events
		config.resizeFunc();
  		$(window).resize( config.resizeFunc);

 	}

 	return init;
  
});



