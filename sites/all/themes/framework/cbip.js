$(document).ready(function () {


  $("h1#page-title:contains('(hide)')").hide();


  var pathname = window.location.pathname;


  


  


  

  

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