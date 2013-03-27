define([
	'text!templates/elementfiles.html',
	'views/views'
],
function(template, Views) {

  var ElementFilesView = Views.extend({
          template: template,
          initialize: function(opts) {
		      // call parent initialize w/ opts
		      Views.prototype.initialize.call(this, opts);
		    }
        });

  return ElementFilesView;
});