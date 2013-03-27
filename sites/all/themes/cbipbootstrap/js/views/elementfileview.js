define([
	'models/elementfile',
	'text!templates/elementfile.html',
	'views/view',
],
function(ElementFile, template, View) {
  
  var ElementFileView = View.extend({
  	model: ElementFile,
    template: template,
    className: 'elementfile',
    tagName: 'div',

    initialize: function(opts) {
  		View.prototype.initialize.call(this, opts);
  		this.model.bind('change', this.render, this);//this calls the fetch
    }

  });


  return ElementFileView;
});
