$(document).ready(function () {


  $("h1#page-title:contains('(hide)')").hide();




  var pathname = window.location.pathname;
  console.log(pathname);


  

  $('#lib-work-tag-sort').hover(
    function() { console.log('showing tags')
      $('li.list-item', this).show();

  },
    function() { console.log('hiding tags');
      $('li.list-item', this).hide();

    // view URL elements/tag/environmental

  }
  );

  $('#element-and-stategy-tags').hover(
    function() {
      //$(this).css('top', '20px');

    });



  


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

  if( $('body').hasClass('front')){
    setCarouselHeight();
    cycleCarousel();


  }

  $(window).resize(function() {
    if( $('body').hasClass('front')){
      setCarouselHeight();
    }
  });
  

});