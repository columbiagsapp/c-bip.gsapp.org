$(document).ready(function () {


  $("h1#page-title:contains('(hide)')").hide();


  var pathname = window.location.pathname;


  


  $('#lib-work-tag-sort').hover(
    function() { 
      $('li.list-item', this).show();
      $('#current-tag-in-menu').hide();

  },
    function() { 
      $('li.list-item', this).hide();
      $('#current-tag-in-menu').show();
    // view URL elements/tag/environmental

  }
  );

  $('#element-and-stategy-tags').hover(
    function() {
      //$(this).css('top', '20px');

    });




  /* ABOUT PAGE */
  $('#secondary-nav-affiliates a').bind('click', function(event){
    
    event.preventDefault();
    $('#secondary-nav-people a').removeClass('active');
    $(this).addClass('active');

    var offset = parseInt( $("#about-affiliates-view").offset().top ) - parseInt( $('#main').css('marginTop') );


    $('html, body').animate({
      scrollTop: offset
    }, 200);


    //return false;

  });
  $('#secondary-nav-people a').bind('click', function(){
    event.preventDefault();
    $('#secondary-nav-affiliates a').removeClass('active');
    $(this).addClass('active');

    var offset = parseInt( $("#about-people-view").offset().top ) - parseInt( $('#main').css('marginTop') );

    $('html, body').animate({
      scrollTop: offset
    }, 200);
  });



  function scrollSpy(event){

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

  $(document).bind('scroll', scrollSpy);
  


  var TOTAL_CAROUSEL_IMAGES = 4;
  var CURRENT_CAROUSEL_IMAGE_INDEX = 1;

  function incrementCarousel(){

    clearTimeout(current_timeout_id);

    $('#carousel-image-' + CURRENT_CAROUSEL_IMAGE_INDEX ).hide();

    if( CURRENT_CAROUSEL_IMAGE_INDEX >= TOTAL_CAROUSEL_IMAGES ){
      CURRENT_CAROUSEL_IMAGE_INDEX = 1;
    }else{
      CURRENT_CAROUSEL_IMAGE_INDEX++;
    }

    //need to unload intro1.gif and reload so it starts at the first frame, same for any other animated GIF
    if(CURRENT_CAROUSEL_IMAGE_INDEX == 1){
      var uncachedSrc = '/sites/all/themes/framework/images/intro1.gif?' + Math.floor( Math.random()*10000 );
      $('#carousel-image-1').attr('src', '');
      $('#carousel-image-1').attr('src', uncachedSrc);
    }
    $('#carousel-image-' + CURRENT_CAROUSEL_IMAGE_INDEX ).show();

    //cycleCarousel();

  }

  function decrementCarousel(){
    clearTimeout(current_timeout_id);

    $('#carousel-image-' + CURRENT_CAROUSEL_IMAGE_INDEX ).hide();

    if( CURRENT_CAROUSEL_IMAGE_INDEX <= 1 ){
      CURRENT_CAROUSEL_IMAGE_INDEX = TOTAL_CAROUSEL_IMAGES;
    }else{
      CURRENT_CAROUSEL_IMAGE_INDEX--;
    }

    //need to unload intro1.gif and reload so it starts at the first frame, same for any other animated GIF
    if(CURRENT_CAROUSEL_IMAGE_INDEX == 1){
      var uncachedSrc = '/sites/all/themes/framework/images/intro1.gif?' + Math.floor( Math.random()*10000 );
      $('#carousel-image-1').attr('src', '');
      $('#carousel-image-1').attr('src', uncachedSrc);
    }

    $('#carousel-image-' + CURRENT_CAROUSEL_IMAGE_INDEX ).show();

    //cycleCarousel();
  }

  $('#carousel-next').bind('click', incrementCarousel);
  $('#carousel-prev').bind('click', decrementCarousel);


  var carouselImagesTiming = [];
  carouselImagesTiming[1] = 46000;
  carouselImagesTiming[2] = 5000;
  carouselImagesTiming[3] = 5000;
  carouselImagesTiming[4] = 5000;

  var current_timeout_id;

  function cycleCarousel(){
    current_timeout_id = setTimeout(function(){
          incrementCarousel();
          cycleCarousel();
        }, carouselImagesTiming[CURRENT_CAROUSEL_IMAGE_INDEX]);
  }




  function closeHomepage(event){
    event.preventDefault();

    var $this = $(this);

    $('#oldcastle-logo').hide();
    $('#gsapp-logo').hide();
    $('#carousel').css('opacity', '0').animate({
      'height': 0
    },200, 'linear', function(){
      $(this).hide();
      $('#navigation').animate({
        'marginTop': 0
      }, 50, 'linear', function(){
        window.location = $this.attr('href');
      });
    });

    return false;
  }

  //$('#navigation .menu a').bind('click', closeHomepage);




  function appendTagFilter(){
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

  appendTagFilter();



  function resizeHeader(){
    var cellWidth = 230;//parseInt( $('.element').width() );
    var cellSpacing = 22;//parseInt( $('.element').css('marginRight') );
    var x = Math.floor( window.innerWidth / (cellWidth + cellSpacing) );

    var newWidth = (x * cellWidth) + ( (x-1) * cellSpacing);

    $('#header').width( newWidth );
  }


  //sets the height of the carousel on the homepage
  function setCarouselHeight(){

    var headerMarginTop = parseInt( $('#header').css('marginTop') );
    var cBIPlogoHeight = parseInt( $('#c-bip-logo').height() );
    var carouselMarginTop = parseInt( $('#carousel').css('marginTop') );
    var navMarginTop = parseInt( $('#navigation').css('marginTop') );
    var navHeight = parseInt( $('#navigation').height() );
    var navBottomOffset = 26;//set by Leigha's design

    var carouselHeight = window.innerHeight - headerMarginTop - cBIPlogoHeight - carouselMarginTop - navMarginTop - navHeight - navBottomOffset;

    $('#carousel').height( carouselHeight+'px' );
  }


  function resizeCarouselImage(){
    var carousel_prev_next_width = parseInt( $('#carousel-prev').width() );
    var header_width = parseInt( $('#header').width() );
    var avail_width = header_width - carousel_prev_next_width;
    var avail_height = parseInt( $('#carousel').height() );

    var imageWidth = 764;//$('#carousel-image-1').width();
    var imageHeight = 460;//$('#carousel-image-1').height();

    var avail_aspect = avail_width / avail_height;
    var image_aspect = imageWidth / imageHeight;

    console.log('avail_width: '+ avail_width);
    console.log('avail_height: '+ avail_height);
    console.log('avail_aspect: '+ avail_aspect);
    console.log('imageWidth: '+ imageWidth);
    console.log('imageHeight: '+ imageHeight);
    console.log('image_aspect: '+ image_aspect);

    var carousel_images_selector = '#carousel-image-1, #carousel-image-2, #carousel-image-3, #carousel-image-4, #carousel-image-5, #carousel-image-6, #carousel-image-7';

    if(avail_aspect > image_aspect){
      $(carousel_images_selector).height( avail_height + 'px');
      $(carousel_images_selector).css('width', 'auto');
    }else{
      $(carousel_images_selector).width( avail_width + 'px');
      $(carousel_images_selector).css('height', 'auto');
    }


  }

  function resizeFunc(){
    $('#header').width( $('#container').width() );
    resizeHeader();
    if( $('body').hasClass('front')){
      setCarouselHeight();
      resizeCarouselImage();
    }
    
  }

  resizeFunc();
  $(window).resize( resizeFunc);

  if( $('body').hasClass('front')){
    cycleCarousel();
  }
  

});