define([
	'text!templates/tags.html',
	'views/views'
],
function(template, Views) {

  var TagsView = Views.extend({
          template: template,
          initialize: function(opts) {
		      // call parent initialize w/ opts
		      Views.prototype.initialize.call(this, opts);
		    }
        });

  return TagsView;
});