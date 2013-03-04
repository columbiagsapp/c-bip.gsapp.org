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
  }

  $(window).resize(function() {
    if( $('body').hasClass('front')){
      setCarouselHeight();
    }
  });



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
  

});