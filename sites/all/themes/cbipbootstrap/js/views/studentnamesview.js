define([
	'text!templates/studentnames.html',
	'views/views'
],
function(template, Views) {

  var StudentNamesView = Views.extend({
          template: template,
          initialize: function(opts) {
		      // call parent initialize w/ opts
		      Views.prototype.initialize.call(this, opts);
		    }
        });

  return StudentNamesView;
});