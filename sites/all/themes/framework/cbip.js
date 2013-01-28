$(document).ready(function () {

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

  $('#lib-work-tag-sort').hover(
    function() { console.log('showing tags')
    $('#element-and-stategy-tags').css('top', '20px');

  },
    function() { console.log('hiding tags');
    $('#element-and-stategy-tags').css('top', '-1000px');
  }
  );

  $('#element-and-stategy-tags').hover(
    function() {
      $(this).css('top', '20px');

    });

  

});