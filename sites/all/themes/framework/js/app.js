define([ 'config', 'lib/drupal-backbone-restws' ], function(config) {
  var App = function() {
  };

  App.prototype = {
  };

  console.dir(Drupal.Backbone);



  /////// HOME PAGE ///////

  //Clicking on main menu on home page
  $('.front #navigation .menu li a').bind('click', function(event){
  	event.preventDefault();
  	$('#carousel').animate({
  		height:0
  	}, config.PAGE_TRANSITION_TIME);

  });


  return App;
});