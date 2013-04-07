define([],
function() {
	var config = {};

	config.SCROLL_TIME = 200;

	config.WINDOW_WIDTHS = [];
	config.WINDOW_WIDTHS['mobile'] = 479;
	config.WINDOW_WIDTHS['tablet'] = 768;
	config.WINDOW_WIDTHS['min'] = 1018;
	config.WINDOW_WIDTHS['max'] = 1268;

	/////// HOME PAGE ///////

	config.PAGE_TRANSITION_TIME = 200;

	/////// LIBRARY CONSTANTS ///////
	config.ELEMENT_TAGS = [];
	config.ELEMENT_TAGS.push('Atrium');
	config.ELEMENT_TAGS.push('Courtyard');
	config.ELEMENT_TAGS.push('Facade');
	config.ELEMENT_TAGS.push('Roof');
	config.ELEMENT_TAGS.push('');
	config.ELEMENT_TAGS.push('Air');
	config.ELEMENT_TAGS.push('Light');
	config.ELEMENT_TAGS.push('Solar');
	config.ELEMENT_TAGS.push('Water');
	config.ELEMENT_TAGS.push('Insulation');
	config.ELEMENT_TAGS.push('Vegetation');
	config.ELEMENT_TAGS.push('Energy Generated');
	config.ELEMENT_TAGS.push('');
	config.ELEMENT_TAGS.push('Program');
	config.ELEMENT_TAGS.push('Structural');
	config.ELEMENT_TAGS.push('Zoning');

	config.STRATEGY_TAGS = [];
	config.STRATEGY_TAGS.push('Glass Tower');
	config.STRATEGY_TAGS.push('Mid-Rise Residential');
	config.STRATEGY_TAGS.push('High-Rise Residential');
	config.STRATEGY_TAGS.push('School');
	config.STRATEGY_TAGS.push('Loft');
	config.STRATEGY_TAGS.push('Industrial');


	//CAROUSEL CONSTANTS
	config.TOTAL_CAROUSEL_IMAGES = $('.carousel-image-container').length;
	config.CAROUSEL_INDEX = 0;

	config.CAROUSEL_IMAGES_TIMING = [];

	config.CAROUSEL_IMAGES = [];

	//INTRO
	config.CAROUSEL_IMAGES[0] = {
		src: 'intro.gif',
		backgroundColor: '#000',
		crop: false,
		time: 35000,
		label: '',
		width: 764,
		height: 460
	};

	config.CAROUSEL_IMAGES[1] = {
		src: 'studio-structure.gif',
		backgroundColor: '#000',
		crop: false,
		time: 11300,
		label: 'Studio Structure',
		width: 1500,
		height: 1013
	};

	//ELEMENTS
	config.CAROUSEL_IMAGES[2] = {
		src: 'element1.gif',
		backgroundColor: '#e3e3e3',
		crop: false,
		time: 7000,
		label: 'Building Element',
		width: 1200,
		height: 776
	};

	config.CAROUSEL_IMAGES[3] = {
		src: 'element2.gif',
		backgroundColor: '#000',
		crop: true,
		time: 5000,
		label: 'Building Element',
		width: 1200,
		height: 567
	};

	config.CAROUSEL_IMAGES[4] = {
		src: 'element3.gif',
		backgroundColor: '#FFF',
		crop: false,
		time: 5000,
		label: 'Building Element',
		width: 1200,
		height: 776
	};

	//STRATEGIES
	config.CAROUSEL_IMAGES[5] = {
		src: 'strategy1.png',
		backgroundColor: '#000',
		crop: true,
		time: 3000,
		label: 'Building Strategy',
		width: 1200,
		height: 785
	};

	config.CAROUSEL_IMAGES[6] = {
		src: 'strategy2.gif',
		backgroundColor: '#ffffbb',
		crop: false,
		time: 19000,
		label: 'Building Strategy',
		width: 1200,
		height: 669
	};

	config.CAROUSEL_IMAGES[7] = {
		src: 'strategy3.png',
		backgroundColor: '#000',
		crop: true,
		time: 3000,
		label: 'Building Strategy',
		width: 1043,
		height: 700
	};

	config.CAROUSEL_IMAGES[8] = {
		src: 'strategy4.gif',
		backgroundColor: '#FFF',
		crop: false,
		time: 7000,
		label: 'Building Strategy',
		width: 1200,
		height: 710
	};

	config.CAROUSEL_IMAGES[9] = {
		src: 'strategy5.png',
		backgroundColor: '#000',
		crop: true,
		time: 3000,
		label: 'Building Strategy',
		width: 1200,
		height: 580
	};

	//COLLABORATION
	config.CAROUSEL_IMAGES[10] = {
		src: 'collaboration.gif',
		backgroundColor: '#000',
		crop: true,
		time: 7000,
		label: 'Collaboration',
		width: 945,
		height: 629
	};


	/////// HOME ///////

	//sets the height of the carousel on the homepage
	config.setCarouselHeight = function(){
		//sum all vertical dimensions of elements on the home page
		var headerPaddingTop = parseInt( $('#header').css('paddingTop') );
		var cBIPlogoHeight = parseInt( $('#c-bip-logo').height() );
		var carouselMarginTop = parseInt( $('#jcarousel').css('marginTop') );
		var carouselLabelMarginTop = parseInt( $('#carousel-label').css('marginTop') );
		var carouselLabelHeight = parseInt( $('#carousel-label').height() );
		var carouselLabelMarginBottom = parseInt( $('#carousel-label').css('marginBottom') );
		var navHeight = parseInt( $('#navigation').height() );
		var headerPaddingBottom = parseInt( $('#header').css('paddingBottom') );

		//create carousel height from the available height minus all other elements to make as high as possible
		var carouselHeight = window.innerHeight - headerPaddingTop - cBIPlogoHeight - carouselMarginTop - carouselLabelMarginTop - carouselLabelHeight - carouselLabelMarginBottom - navHeight - headerPaddingBottom - 20;
		var w = $('#jcarousel').width();
		var aspect = w/carouselHeight;
		var min_aspect = 1;

		if( aspect < min_aspect){
			carouselHeight = w/min_aspect;
		}

		$('#jcarousel').height( carouselHeight+'px' );
	}


	//slide the image carousel forward one image
	config.incrementCarousel = function(){
		console.log('incrementCarousel()');

		clearTimeout( config.CURRENT_TIMEOUT_ID );
		$('#carousel-label').text('');

		$('#jcarousel').jcarousel('scroll', '+=1', true, function(scrolled) {
		    if (scrolled) {
		        console.log('The carousel has been scrolled');

		        config.CAROUSEL_INDEX++;
		        if(config.CAROUSEL_INDEX >= $('.carousel-item').length){
		        	config.CAROUSEL_INDEX = 0;
		        }

		        console.log('idx: '+ config.CAROUSEL_INDEX);

		        console.log(config.CAROUSEL_IMAGES[ config.CAROUSEL_INDEX ].label);
		        $('#carousel-label').text( config.CAROUSEL_IMAGES[ config.CAROUSEL_INDEX ].label);

		        config.CURRENT_TIMEOUT_ID = setTimeout(function(){
		        	config.incrementCarousel();
		        }, config.CAROUSEL_IMAGES[ config.CAROUSEL_INDEX ].time);

		    } else {
		        console.log('The carousel has not been scrolled');
		    }
		});
	}//end incrementCarousel()



	config.decrementCarousel = function(){
		console.log('decrementCarousel()');

		clearTimeout( config.CURRENT_TIMEOUT_ID );
		$('#carousel-label').text('');

		$('#jcarousel').jcarousel('scroll', '-=1', true, function(scrolled) {
		    if (scrolled) {
		        console.log('The carousel has been scrolled');

		        config.CAROUSEL_INDEX--;
		        if(config.CAROUSEL_INDEX < 0){
		        	config.CAROUSEL_INDEX = $('.carousel-item').length-1;
		        }

		        $('#carousel-label').text( config.CAROUSEL_IMAGES[ config.CAROUSEL_INDEX ].label);

		        config.CURRENT_TIMEOUT_ID = setTimeout(function(){
		        	config.incrementCarousel();
		        }, config.CAROUSEL_IMAGES[ config.CAROUSEL_INDEX ].time);

		    } else {
		        console.log('The carousel has not been scrolled');
		    }
		});
	}//end decrementCarousel()


	/////// ABOUT ///////

	//pages the sub menu when the user scrolls to new sections as each page requires
	config.scrollSpy = function(event){		
		var peopleLocation = parseInt( $("#about-people-view").offset().top ) - parseInt( $('#main').css('marginTop') );
		var affiliatesLocation = parseInt( $("#about-affiliates-view").offset().top ) - parseInt( $('#main').css('marginTop') );

		if( $(document).scrollTop() >= affiliatesLocation ){
			$('#secondary-nav-people a').removeClass('active');
			$('#secondary-nav-affiliates a').addClass('active');
		}else{
			$('#secondary-nav-affiliates a').removeClass('active');
			$('#secondary-nav-people a').addClass('active');
		}	
	}

	//auto-scroll to affiliates on about page
	config.scrollToAffiliates = function(event){
		event.preventDefault();
		$('#secondary-nav-people a').removeClass('active');
		$(this).addClass('active');

		var offset = parseInt( $("#about-affiliates-view").offset().top ) - parseInt( $('#main').css('marginTop') );

		$('html, body').animate({
			scrollTop: offset
		}, config.SCROLL_TIME);
	}

	//auto-scroll to people on about page
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
	config.appendTagMenuContent = function(){
	    $('#current-tag-in-menu').remove();
	    var pathArray = window.document.location.pathname.split('/');

	    switch(pathArray[1]){
			case 'library':
				$('#lib-work-tag-sort li:not(.list-heading)').remove();
				if(pathArray[2] == 'elements'){
					for(var i = 0; i < config.ELEMENT_TAGS.length; i++){
						console.log('appending! '+ i);
						var $li = $('<li style="display:none;"></li>');
						$li.addClass('list-item');
						if(i == 0){
							$li.addClass('first');
						}
						if(config.ELEMENT_TAGS[i] == ''){
							$li.html('&middot;');
						}else{
							$li.html('<a href="/library/elements/tag/'+config.ELEMENT_TAGS[i].toLowerCase()+'">'+config.ELEMENT_TAGS[i]+'</a>');
						}
						
						$('#lib-work-tag-sort').append($li);
					}
				}else if(pathArray[2] == 'strategies'){
					for(var i = 0; i < config.STRATEGY_TAGS.length; i++){
						console.log('appending! '+ i);
						var $li = $('<li style="display:none;"></li>');
						$li.addClass('list-item');
						if(i == 0){
							$li.addClass('first');
						}
						if(config.ELEMENT_TAGS[i] == ''){
							$li.html('&middot;');
						}else{
							$li.html('<a href="/library/elements/tag/'+config.STRATEGY_TAGS[i].toLowerCase()+'">'+config.STRATEGY_TAGS[i]+'</a>');
						}
						
						$('#lib-work-tag-sort').append($li);
					}
				}
				//append current tag if sorted by tag
				if($.inArray('tag', pathArray) >= 0){
					var tag = pathArray.pop();
					tag = tag.charAt(0).toUpperCase() + tag.slice(1);//capitalize first letter
					var html = '<div id="current-tag-in-menu">' + tag + "<div>"
					$('#lib-work-tag-sort').append( html );//append to the div that wraps the ul
				}
				break;
			default:
				break;
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
	config.resizeCarouselImages = function(){
		console.log('resizeCarouselImages()');

		var cw = $('#jcarousel').width();
		var ch = $('#jcarousel').height();
		var caspect = cw/ch;

		var availw = Math.floor( cw - ( 2*$('#carousel-prev').width() ) );

		//rest the carousel-item to the carousel width/height
		$('.carousel-item').width(cw).height(ch);

		$('.carousel-item').each(function(i){
			var iaspect = config.CAROUSEL_IMAGES[i].width / config.CAROUSEL_IMAGES[i].height;

			var iw,
				ih, 
				margin_left = 0,
				margin_top = 0;

			if($(this).attr('crop') == 'true'){
				if(iaspect > caspect){
					ih = ch;
					iw = ih * iaspect;
					//vertically center the image
					margin_left = Math.floor( (cw - iw ) / 2 );
				}else{
					iw = cw;
					ih = iw/iaspect;
					//vertically center the image
					margin_top = Math.floor( (ch - ih ) / 2 );
				}
			}else{//crop == false
				if(iaspect > caspect){
					iw = availw;
					ih = iw/iaspect;
				}else{
					ih = ch;
					iw = ih * iaspect;
				}
			}

			$('img', this)
				.width(iw)
				.height(ih)
				.css('marginTop', margin_top)
				.css('marginLeft', margin_left);

		});//end each .carousel-image-container
	}// end resizeCarouselImages()
	

	//main window resize function
	config.resizeFunc = function(){
		config.pruneComponentMargin();
		if( $('body').hasClass('front')){
			config.setCarouselHeight();
			config.resizeCarouselImages();
		}
	}


	/////// GLOBAL HELPERS ///////

	config.hoverOn = function(){
		$(this).addClass('hover');
	}

	config.hoverOff = function(){
		$(this).removeClass('hover');
	}


	config.initCarousel = function(){

		config.setCarouselHeight();

		var $carousel = $('#jcarousel');
		var $carouselList = $('#jcarousel #carousel-list');

		for(var i = 0; i < config.CAROUSEL_IMAGES.length; i++){
			var $item = $('<div class="carousel-item" crop="'+config.CAROUSEL_IMAGES[i].crop+'"></div>');
			if(i == 0){
				$item.addClass('first');
			}else if(i == config.CAROUSEL_IMAGES.length -1){
				$item.addClass('last');
			}


			var cw = $('#jcarousel').width();
			var ch = $('#jcarousel').height();
			var caspect = cw/ch;

			var availw = Math.floor( cw - ( 2*$('#carousel-prev').width() ) );

			var iaspect = config.CAROUSEL_IMAGES[i].width / config.CAROUSEL_IMAGES[i].height;

			var iw,
				ih, 
				margin_left = 0,
				margin_top = 0;

			if(config.CAROUSEL_IMAGES[i].crop){
				if(iaspect > caspect){
					ih = ch;
					iw = ih * iaspect;
					//vertically center the image
					margin_left = Math.floor( (cw - iw ) / 2 );
				}else{
					iw = cw;
					ih = iw/iaspect;
					//vertically center the image
					margin_top = Math.floor( (ch - ih ) / 2 );
				}
			}else{//crop == false
				if(iaspect > caspect){
					iw = availw;
					ih = iw/iaspect;
				}else{
					ih = ch;
					iw = ih * iaspect;
				}
			}

			var $img = $('<img alt="C-BIP: Columbia Building Intelligence Project" src="/sites/all/themes/cbipbootstrap/images/' + config.CAROUSEL_IMAGES[i].src + '" width="'+iw+'" height="'+ih+'">');
			$img.css('marginLeft', margin_left).css('marginTop', margin_top);

			$item
				.css('backgroundColor', config.CAROUSEL_IMAGES[i].backgroundColor)
				.width(cw)
				.height(ch)
				.append( $img );

			$carouselList.append($item);
		}

		//initialize jcarousel
		$carousel.jcarousel({
			list: '#carousel-list',
			items: '.carousel-item',
			'animation': 'slow',
		    wrap: 'circular'
		});

		//Bind carousel buttons to actions
		$('#carousel-next').css('opacity', '0.7').bind('click', config.incrementCarousel);
		$('#carousel-prev').css('opacity', '0.7').bind('click', config.decrementCarousel);

		//begin auto-cycle through carousel
		config.CURRENT_TIMEOUT_ID = setTimeout(function(){
			config.incrementCarousel();
		}, config.CAROUSEL_IMAGES[0].time);
	}

    config.getTumblrFeed = function(){

    	myJsonpCallback = function(data){
	        console.dir(data);
	        var posts = data.response.posts;

	        var fullHTML = [];
	        fullHTML.push('<div id="posts">');

	        for(var i = 0; i < posts.length; i++){
	          var d = new Date(posts[i].date);
	          var month = d.getMonth() + 1;
	          month = ''+ month;
	          if(month.length == 1){
	            month = '0' + month;
	          }
	          var day = '' + d.getDate();
	          if(day.length == 1){
	            day = '0' + day;
	          }
	          var year = '' + d.getFullYear();

	          var html = [];
	          html.push('<div class="post-wrapper">');
	            //render the date
	            html.push('<h3 class="date">');
	              html.push('<a href="' + posts[i].post_url + '" target="_self">');
	                html.push(month+'/'+day+'/'+year);
	              html.push('</a>');
	            html.push('</h3>');


	          switch(posts[i].type){
	            case 'photo':
	              console.log('photo');
	              html.push('<div class="post photo">');

	                for(var j = 0; j < posts[i].photos.length; j++){
	                  html.push('<a target="_blank" href="'+ posts[i].post_url +'"><img src="'+ posts[i].photos[j].alt_sizes[1].url + '" width="'+posts[i].photos[j].alt_sizes[1].width+'" height="' + posts[i].photos[j].alt_sizes[1].height+'"></a>');
	                }

	                if(posts[i].caption != ''){
	                  html.push('<div class="caption">'+posts[i].caption+'</div>')
	                }

	              html.push('</div>');
	              break;
	            case 'text':
	              console.log('text');
	              html.push('<div class="post text">');
	                if(posts[i].title != null && posts[i].title != ''){
	                  html.push('<h3>'+ posts[i].title +'</h3>');
	                }
	                html.push(posts[i].body);
	              html.push('</div>');
	              break;
	            case 'video':
	              console.log('video');
	              html.push('<div class="post video">');

	                html.push(posts[i].player[2].embed_code);

	                if(posts[i].caption != ''){
	                  html.push('<div class="caption">'+posts[i].caption+'</div>')
	                }

	              html.push('</div>');
	              break;
	          }

	          if(posts[i].tags.length > 0){
	            html.push('<div class="tags">');
	            for(var t = 0; t < posts[i].tags.length; t++){
	              if(t != (posts[i].tags.length-1)){
	                html.push('<span class="tag">'+ posts[i].tags[t] + ' &middot; </span>');
	              }else{
	                html.push('<span class="tag">'+ posts[i].tags[t] + '</span>');
	              }
	            }
	            html.push('</div>');
	          }

	          html.push('</div>');

	          var htmlString = html.join('');
	          fullHTML.push(htmlString);
	          
	        }//end main for

	        var html = [];
	        html.push('<div class="post-wrapper continue-reading">');
	          html.push('<h3><a href="http://cbip2013.tumblr.com/" target="_blank">CONTINUE READING THE BLOG</a></h3>');
	        html.push('</div>');

	        fullHTML.push( html.join('') );

	        fullHTML.push('</div>');// /#posts
	        var fullHTMLstring = fullHTML.join('');
	        console.log(fullHTMLstring);
	        $('#main').html( fullHTMLstring ).css('opacity', '1');

	        $('body').removeClass('front');
	        config.init();
	     	
	    }//end myJsonpCallback

		$.ajax({
			type: "GET",
			url : "http://api.tumblr.com/v2/blog/cbip2013.tumblr.com/posts",
			dataType: "jsonp",
			data: {
				api_key : "hWkC4wLaBW4c9ifzdFahAN7rLNMsEUH0l1uuAca6SVhhxufgwA",
				jsonp : "myJsonpCallback"
			}
		});
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////     INIT     //////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////

    config.init = function(){

 		// Update the submenu tct2003
        var path = window.location.pathname.split('/');
        console.log('path[1] '+ path[1]);
        console.log('path[2] '+ path[2]);
        switch(path[1]){
        	//////////////////////////
        	///////    HOME    ///////
        	//////////////////////////
        	case '':
        		config.initCarousel();

        		//Clicking on main menu on home page
				$('.front #navigation .menu li a').bind('click', function(event){
					//event.preventDefault();
					$('#jcarousel').slideToggle(config.PAGE_TRANSITION_TIME, function(){
						$('#oldcastle-logo').remove();
						$('#gsapp-logo').remove();
						$('#carousel-label').remove();
						$(this).remove();
					});
				});
        		
        		break;

	    	//////////////////////////
	    	///////  LIBRARY  ////////
	    	//////////////////////////
          	case 'library':
	            $('#navigation #block-block-1').show();
	            $('#navigation #block-block-2').hide();

	            //prepare tag menu
	            config.appendTagMenuContent();
				$('#lib-work-tag-sort').hover(config.showTagMenu, config.hideTagMenu);

	            if(path[2] == 'elements'){
	            	console.log('elements+');
					$('#hidden-lib-of-work-subitems > div a').removeClass('active');
					$('#lib-work-elements a').addClass('active');
				}else if(path[2] == 'strategies'){
					$('#hidden-lib-of-work-subitems > div a').removeClass('active');
					$('#lib-work-strategies a').addClass('active');
				}
	            break;

	        //////////////////////////
	    	////////  ABOUT  /////////
	    	//////////////////////////
          	case 'about':
	            $('#navigation #block-block-2').show();
	            $('#navigation #block-block-1').hide();
	            $('#secondary-nav a.active').removeClass('active');
	            //initialize subnav active to people
				$('#secondary-nav-people a').addClass('active');
				
				/////// SCROLL-SPY ///////
				$('#secondary-nav-affiliates a').bind('click', config.scrollToAffiliates);
				$('#secondary-nav-people a').bind('click', config.scrollToPeople);
				$(document).bind('scroll', config.scrollSpy);
	            break;

	        //////////////////////////
        	///////    WORK    ///////
        	//////////////////////////
          	case 'work':
	          	config.getTumblrFeed();
	          	$('#navigation #block-block-1').hide();
	            $('#navigation #block-block-2').hide();
	          	break;

	        //////////////////////////
        	//////  RESOURCES  ///////
        	//////////////////////////
          	case 'resources':
	        	//clicking on resource should open in a new window
				//@todo: do i need this? can't it be in the template file?
				$('.resource').bind('click', function(){
					window.open($(this).attr("href"),'_blank');
				});

				$('.resource').hover(config.hoverOn, config.hoverOff);
	          	break;

	        //////////////////////////
	    	///////  DEFAULT  ////////
	    	////////////////////////// 	
          	default:
	            $('#navigation #block-block-1').hide();
	            $('#navigation #block-block-2').hide();
	            break;
        }
	
		/////// RESIZE FUNCTIONS ///////

		//call the resizeFunc on page load and bind to window resize events
		config.resizeFunc();
  		$(window).resize( config.resizeFunc);


  		/////// GLOBAL INIT ///////
  		$("h1#page-title:contains('(hide)')").hide();

 	}


  return config;
});