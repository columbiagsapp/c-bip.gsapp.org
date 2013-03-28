define([ 
	'config'
], function(config) {
 

 	var init = function(){

 		// Update the submenu tct2003
        var path = window.location.pathname.split('/');
        switch(path[1]){
          case 'library':
            $('#navigation #block-block-1').show();
            $('#navigation #block-block-2').hide();
            break;
          case 'about':
            $('#navigation #block-block-2').show();
            $('#navigation #block-block-1').hide();
            break;
          default:
            $('#navigation #block-block-1').hide();
            $('#navigation #block-block-2').hide();
            break;
        }

 		/////// HOME PAGE ///////

		//Clicking on main menu on home page
		$('.front #navigation .menu li a').bind('click', function(event){
			//event.preventDefault();
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
		$('#lib-work-tag-sort').hover(config.showTagMenu, config.hideTagMenu);


		/////// RESOURCES ///////

		//clicking on resource should open in a new window
		//@todo: do i need this? can't it be in the template file?
		$('.resource').bind('click', function(){
			window.open($(this).attr("href"),'_blank');
		});

		$('.resource').hover(config.hoverOn, config.hoverOff);



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


  		/////// GLOBAL INIT ///////
  		$("h1#page-title:contains('(hide)')").hide();

 	}

 	return init;
  
});



