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




  

  $('.resource').bind('click', function(){
    window.open($(this).attr("href"),'_blank');
  });

  $('.resource').hover(function(){
    $(this).addClass('hover');
  }, function(){
    $(this).removeClass('hover');
  });

  $('.strategy-inner img, .strategy-inner div:not(.views-field-field-element-tags)').bind('click', function(){
    window.open($(this).closest('.strategy').attr("href"),'_blank');
  });

  $('.strategy').hover(function(){
    $(this).addClass('hover');
  }, function(){
    $(this).removeClass('hover');
  });

  $('.strategy-inner .views-field-field-element-tags').hover(function(){ 
    console.log('hoveringgggg');
    $(this).closest('.strategy').removeClass('hover');
  }, function(){
    $(this).closest('.strategy').addClass('hover');
  });




  

});