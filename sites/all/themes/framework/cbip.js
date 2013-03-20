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