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

  

});