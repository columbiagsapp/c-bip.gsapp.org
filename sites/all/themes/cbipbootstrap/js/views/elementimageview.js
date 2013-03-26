define([
	'models/elementimage',
	'text!templates/elementimage.html',
	'views/view',
],
function(ElementImage, template, View) {


  var ElementImageView = View.extend({
  	model: ElementImage,
    template: template,
    className: 'element-image',
    tagName: 'div',

    initialize: function(opts) {
  		View.prototype.initialize.call(this, opts);
  		this.model.bind('change', this.render, this);//this calls the fetch
    }

  });


  return ElementImageView;
});
