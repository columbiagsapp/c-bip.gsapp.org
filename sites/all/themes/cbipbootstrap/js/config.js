define([], function() {
	var config = {};

	config.SCROLL_TIME = 200;

	config.WINDOW_WIDTHS = [];
	config.WINDOW_WIDTHS['mobile'] = 479;
	config.WINDOW_WIDTHS['tablet'] = 768;
	config.WINDOW_WIDTHS['min'] = 1018;
	config.WINDOW_WIDTHS['max'] = 1268;

	/////// HOME PAGE ///////

	config.PAGE_TRANSITION_TIME = 500;

	//CAROUSEL CONSTANTS
	config.TOTAL_CAROUSEL_IMAGES = 4;
	config.CURRENT_CAROUSEL_IMAGE_INDEX = 1;

	config.CAROUSEL_IMAGES_TIMING = [];
	config.CAROUSEL_IMAGES_TIMING[1] = 4000;//was 46000
	config.CAROUSEL_IMAGES_TIMING[2] = 5000;
	config.CAROUSEL_IMAGES_TIMING[3] = 5000;
	config.CAROUSEL_IMAGES_TIMING[4] = 5000;

	//sets the height of the carousel on the homepage
	config.setCarouselHeight = function(){
		//sum all vertical dimensions of elements on the home page
		var headerPaddingTop = parseInt( $('#header').css('paddingTop') );
		var cBIPlogoHeight = parseInt( $('#c-bip-logo').height() );
		var carouselMarginTop = parseInt( $('#carousel').css('marginTop') );
		var carouselMarginBottom = parseInt( $('#carousel').css('marginBottom') );
		var navHeight = parseInt( $('#navigation').height() );
		var headerPaddingBottom = parseInt( $('#header').css('paddingBottom') );

		//create carousel height from the available height minus all other elements to make as high as possible
		var carouselHeight = window.innerHeight - headerPaddingTop - cBIPlogoHeight - carouselMarginTop - carouselMarginBottom - navHeight - headerPaddingBottom;
		$('#carousel').height( carouselHeight+'px' );
	}


	//slide the image carousel forward one image
	config.incrementCarousel = function(){
		//cancel the autocycle as soon as user has interacted with the carousel
		clearTimeout(config.CURRENT_TIMEOUT_ID);

		$('#carousel-image-' + config.CURRENT_CAROUSEL_IMAGE_INDEX ).hide();

		if( config.CURRENT_CAROUSEL_IMAGE_INDEX >= config.TOTAL_CAROUSEL_IMAGES ){
			config.CURRENT_CAROUSEL_IMAGE_INDEX = 1;
		}else{
			config.CURRENT_CAROUSEL_IMAGE_INDEX++;
		}

		//need to unload intro1.gif and reload so it starts at the first frame, same for any other animated GIF
		if(config.CURRENT_CAROUSEL_IMAGE_INDEX == 1){
			var uncachedSrc = '/sites/all/themes/framework/images/intro1.gif?' + Math.floor( Math.random()*10000 );
			$('#carousel-image-1').attr('src', '');
			$('#carousel-image-1').attr('src', uncachedSrc);
		}
		$('#carousel-image-' + config.CURRENT_CAROUSEL_IMAGE_INDEX ).show();
	}//end incrementCarousel()



	config.decrementCarousel = function(){
		//cancel the autocycle as soon as user has interacted with the carousel
		clearTimeout(config.CURRENT_TIMEOUT_ID);

		$('#carousel-image-' + config.CURRENT_CAROUSEL_IMAGE_INDEX ).hide();

		if( config.CURRENT_CAROUSEL_IMAGE_INDEX <= 1 ){
			config.CURRENT_CAROUSEL_IMAGE_INDEX = config.TOTAL_CAROUSEL_IMAGES;
		}else{
			config.CURRENT_CAROUSEL_IMAGE_INDEX--;
		}

		//need to unload intro1.gif and reload so it starts at the first frame, same for any other animated GIF
		if(config.CURRENT_CAROUSEL_IMAGE_INDEX == 1){
			var uncachedSrc = '/sites/all/themes/framework/images/intro1.gif?' + Math.floor( Math.random()*10000 );
			$('#carousel-image-1').attr('src', '');
			$('#carousel-image-1').attr('src', uncachedSrc);
		}

		$('#carousel-image-' + config.CURRENT_CAROUSEL_IMAGE_INDEX ).show();
	}//end decrementCarousel()

	//regularly cycle the carousel images
	config.cycleCarousel = function(){
		config.CURRENT_TIMEOUT_ID = setTimeout(function(){
			config.incrementCarousel();
			config.cycleCarousel();
		}, config.CAROUSEL_IMAGES_TIMING[ config.CURRENT_CAROUSEL_IMAGE_INDEX ]);
	}



	/////// ABOUT ///////

	//pages the sub menu when the user scrolls to new sections as each page requires
	config.scrollSpy = function(event){
		switch(window.document.location.pathname){
			case '/about':
				var peopleLocation = parseInt( $("#about-people-view").offset().top ) - parseInt( $('#main').css('marginTop') );
				var affiliatesLocation = parseInt( $("#about-affiliates-view").offset().top ) - parseInt( $('#main').css('marginTop') );

				if( $(document).scrollTop() >= affiliatesLocation ){
					$('#secondary-nav-people a').removeClass('active');
					$('#secondary-nav-affiliates a').addClass('active');
				}else{
					$('#secondary-nav-affiliates a').removeClass('active');
					$('#secondary-nav-people a').addClass('active');
				}
				break;
		}
	}

	config.scrollToAffiliates = function(event){
		event.preventDefault();
		$('#secondary-nav-people a').removeClass('active');
		$(this).addClass('active');

		var offset = parseInt( $("#about-affiliates-view").offset().top ) - parseInt( $('#main').css('marginTop') );

		$('html, body').animate({
			scrollTop: offset
		}, config.SCROLL_TIME);
	}

	config.scrollToPeople = function(event){
		event.preventDefault();
		$('#secondary-nav-affiliates a').removeClass('active');
		$(this).addClass('active');

		var offset = parseInt( $("#about-people-view").offset().top ) - parseInt( $('#main').css('marginTop') );

		$('html, body').animate({
			scrollTop: offset
		}, config.SCROLL_TIME);
	}


	/////// LIBRARY OF WORK ///////

	//if element or strategy is sorted by tag, adds it to the sub nav menu
	config.appendTagFilter = function(){
	    var pathArray = window.document.location.pathname.split('/');

	    if($.inArray('tag', pathArray) >= 0){
	      var tag = pathArray.pop();

	      tag = tag.charAt(0).toUpperCase() + tag.slice(1);//capitalize first letter
	      switch(pathArray[1]){
	        case 'library':
	          var html = '<div id="current-tag-in-menu">' + tag + "<div>"
	          $('#lib-work-tag-wrapper').append( html );//append to the div that wraps the ul
	          break;
	        default:
	          break;
	      }
	    }
	}

	//reveals tag menu on hover
	config.showTagMenu = function(){
		$('li.list-item', this).show();
		$('#current-tag-in-menu').hide();
	}

	//hides tag menu on hover off
	config.hideTagMenu = function(){
		$('li.list-item', this).hide();
		$('#current-tag-in-menu').show();
	}

	//remove the margin-right of the last element/strategy in the row
	config.pruneComponentMargin = function(){
		var ww = window.innerWidth;

		//reset in case previously set
		$('#main .view-library-elements .views-row .element').css('marginRight', '');
		$('#main .view-library-strategies .views-row .strategy').css('marginRight', '');
		$('#main #about-right-view .about-item').css('marginRight', '');
		$('#main .view-resources-view .views-row .resource').css('marginRight', '');

		if(ww <= config.WINDOW_WIDTHS['tablet']){
			$('#main .view-library-elements .views-row:nth-child(2n)').find('.element').css('marginRight', '0');
			$('#main .view-library-strategies .views-row:nth-child(2n)').find('.strategy').css('marginRight', '0');

			$('#main #about-right-view .about-item:nth-child(3n)').css('marginRight', '0');
			$('#main .view-resources-view .views-row:nth-child(2n)').find('.resource').css('marginRight', '0');
		}else if(ww <= config.WINDOW_WIDTHS['min']){
			$('#main .view-library-elements .views-row:nth-child(3n)').find('.element').css('marginRight', '0');
			$('#main .view-library-strategies .views-row:nth-child(3n)').find('.strategy').css('marginRight', '0');

			$('#main .view-resources-view .views-row:nth-child(3n)').find('.resource').css('marginRight', '0');
			$('#main #about-right-view .about-item:nth-child(2n)').css('marginRight', '0');
		}else if(ww <= config.WINDOW_WIDTHS['max']){
			$('#main .view-library-elements .views-row:nth-child(4n)').find('.element').css('marginRight', '0');
			$('#main .view-library-strategies .views-row:nth-child(4n)').find('.strategy').css('marginRight', '0');

			$('#main .view-resources-view .views-row:nth-child(4n)').find('.resource').css('marginRight', '0');
			$('#main #about-right-view .about-item:nth-child(4n)').css('marginRight', '0');
		}else{
			$('#main .view-library-elements .views-row:nth-child(5n)').find('.element').css('marginRight', '0');
			$('#main .view-library-strategies .views-row:nth-child(5n)').find('.strategy').css('marginRight', '0');

			$('#main .view-resources-view .views-row:nth-child(5n)').find('.resource').css('marginRight', '0');
			$('#main #about-right-view .about-item:nth-child(5n)').css('marginRight', '0');
		}
		
	}

	/////// RESOURCES ///////
	



	/////// RESIZE FUNCTIONS ///////

	//resize header width on window load and resize to align with columns
	config.resizeHeader = function(){
		var cellWidth = 230;//parseInt( $('.element').width() );
		var cellSpacing = 22;//parseInt( $('.element').css('marginRight') );
		var x = Math.floor( window.innerWidth / (cellWidth + cellSpacing) );

		var newWidth = (x * cellWidth) + ( (x-1) * cellSpacing);

		$('#header').width( newWidth );
	}


	//resizes the image in the carousel preserving its aspect ratio
	config.resizeCarouselImage = function(){
		var carousel_prev_next_width = parseInt( $('#carousel-prev').width() );
		var header_width = parseInt( $('#header').width() );
		var avail_width = header_width - carousel_prev_next_width;
		var avail_height = parseInt( $('#carousel').height() );

		var imageWidth = 764;//$('#carousel-image-1').width();
		var imageHeight = 460;//$('#carousel-image-1').height();

		var avail_aspect = avail_width / avail_height;
		var image_aspect = imageWidth / imageHeight;

		var carousel_images_selector = '#carousel-image-1, #carousel-image-2, #carousel-image-3, #carousel-image-4, #carousel-image-5, #carousel-image-6, #carousel-image-7';

		if(avail_aspect > image_aspect){
			$(carousel_images_selector).height( avail_height + 'px');
			$(carousel_images_selector).css('width', 'auto');
		}else{
			$(carousel_images_selector).width( avail_width + 'px');
			$(carousel_images_selector).css('height', 'auto');
		}
	}

	//main window resize function
	config.resizeFunc = function(){
		config.pruneComponentMargin();
		if( $('body').hasClass('front')){
			config.setCarouselHeight();
			config.resizeCarouselImage();
		}
	}


	/////// GLOBAL HELPERS ///////

	config.hoverOn = function(){
		$(this).addClass('hover');
	}

	config.hoverOff = function(){
		$(this).removeClass('hover');
	}


  return config;
});