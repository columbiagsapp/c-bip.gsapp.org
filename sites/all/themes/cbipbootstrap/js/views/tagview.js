define([
	'models/tag',
	'text!templates/tag.html',
	'views/view',
],
function(Tag, template, View) {

  var TagView = View.extend({
  	model: Tag,
    template: template,
    className: 'tag',
    tagName: 'div',

    initialize: function(opts) {
  		View.prototype.initialize.call(this, opts);
  		this.model.bind('change', this.render, this);//this calls the fetch
    }

  });


  return TagView;
});
