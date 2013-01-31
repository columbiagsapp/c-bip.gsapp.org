$(document).ready(function () {


  $("h1#page-title:contains('(hide)')").hide();




  var pathname = window.location.pathname;
  console.log(pathname);


  
  // show hide various menus based on pathname
  switch (pathname) {
    case '/elements':
      $("#hidden-lib-of-work-subitems").show();
      break;
    case '/building-strategies':
      $("#hidden-lib-of-work-subitems").show();
      break;
  }

  if (/elements./.test(pathname)) {
    $("#hidden-lib-of-work-subitems").show();
    // set tags to be bordered by box
  }


  $('#lib-work-tag-sort').hover(
    function() { 
    $('#element-and-stategy-tags').css('top', '20px');

  },
    function() { 
    $('#element-and-stategy-tags').delay(300).css('top', '-1000px');

    // view URL elements/tag/environmental

  }
  );

  $('#element-and-stategy-tags').hover(
    function() {
      $(this).css('top', '20px');

    });

  

});