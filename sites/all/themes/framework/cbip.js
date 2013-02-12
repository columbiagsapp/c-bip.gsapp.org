$(document).ready(function () {


  $("h1#page-title:contains('(hide)')").hide();




  var pathname = window.location.pathname;
  console.log(pathname);


  

  $('#lib-work-tag-sort').hover(
    function() { console.log('showing tags')
    $('#element-and-stategy-tags').css('top', '20px');

  },
    function() { console.log('hiding tags');
    $('#element-and-stategy-tags').delay(300).css('top', '-1000px');

    // view URL elements/tag/environmental

  }
  );

  $('#element-and-stategy-tags').hover(
    function() {
      $(this).css('top', '20px');

    });

  

});