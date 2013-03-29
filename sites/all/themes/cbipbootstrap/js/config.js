define([], function() {
	var config = {};

	config.SCROLL_TIME = 200;

	config.WINDOW_WIDTHS = [];
	config.WINDOW_WIDTHS['mobile'] = 479;
	config.WINDOW_WIDTHS['tablet'] = 768;
	config.WINDOW_WIDTHS['min'] = 1018;
	config.WINDOW_WIDTHS['max'] = 1268;

	/////// HOME PAGE ///////

	config.PAGE_TRANSITION_TIME = 200;

	//CAROUSEL CONSTANTS
	config.TOTAL_CAROUSEL_IMAGES = 4;
	config.CURRENT_CAROUSEL_IMAGE_INDEX = 1;

	config.CAROUSEL_IMAGES_TIMING = [];

	config.setCarouselCycleTiming = function(){
		console.log('setCarouselCycleTiming()');

		$('.carousel-image-container').each(function(i){
			config.CAROUSEL_IMAGES_TIMING[i] = $(this).attr('time');
			console.log(config.CAROUSEL_IMAGES_TIMING[i]);
		});
	}


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
			var uncachedSrc = '/sites/all/themes/cbipbootstrap/images/intro1.gif?' + Math.floor( Math.random()*10000 );
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
			var uncachedSrc = '/sites/all/themes/cbipbootstrap/images/intro1.gif?' + Math.floor( Math.random()*10000 );
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
	    $('#current-tag-in-menu').remove();
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
	config.resizeCarouselImages = function(){
		console.log('resizeCarouselImages()');

		var cw = $('#carousel').width();
		var ch = $('#carousel').height();
		var caspect = cw/ch;

		var availw = Math.floor( cw - ( 2*$('#carousel-prev').width() ) );

		$('.carousel-image-container').each(function(i){
			var iw = $("img", this).width();
			var ih = $("img", this).height();
			var iaspect = iw/ih;

			if( $(this).attr('crop') == 'true'){
				if(iaspect > caspect){
					$("img", this).height( ch );
					$("img", this).width( 'auto' );
				}else{
					$("img", this).width( cw );
					$("img", this).height( 'auto' );
				}
			}else{//crop == false
				if(iaspect > caspect){
					$("img", this).width( availw );
					$("img", this).height( 'auto' );
					ih = $("img", this).height();

					//vertically center the image
					var margin_top = Math.floor( (ch - ih) / 2 );
					$("img", this).css( 'marginTop', margin_top );
				}else{
					$("img", this).height( ch );
					$("img", this).width( 'auto' );
					//reset marginTop incase was set in previous resize
					$("img", this).css( 'marginTop', '' );
				}
			}


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
	                  html.push('<img src="'+ posts[i].photos[j].alt_sizes[1].url + '" width="'+posts[i].photos[j].alt_sizes[1].width+'" height="' + posts[i].photos[j].alt_sizes[1].height+'">');
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

    config.init = function(){

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
          case 'work':
          	config.getTumblrFeed();
          	$('#navigation #block-block-1').hide();
            $('#navigation #block-block-2').hide();
          	break;
          default:
            $('#navigation #block-block-1').hide();
            $('#navigation #block-block-2').hide();
            break;
        }

 		/////// HOME PAGE ///////
 		config.setCarouselCycleTiming();

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
		$('#carousel-next').bind('click', config.incrementCarousel).css('opacity', '0.7');
		$('#carousel-prev').bind('click', config.decrementCarousel).css('opacity', '0.7');

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


  return config;
});