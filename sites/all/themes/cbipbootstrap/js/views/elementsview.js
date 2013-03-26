define([
	'text!templates/elements.html',
	'views/views'
],
function(template, Views) {

  var ElementsView = Views.extend({
          template: template,
          initialize: function(opts) {
		      // call parent initialize w/ opts
		      Views.prototype.initialize.call(this, opts);
		      _.bindAll(this, 'renderTags', 'renderImages', 'renderStudentNames');
			},
			renderTags: function(){
				for(var i = 0; i < this._itemViews.length; i++){
					this._itemViews[i].renderTags();
				}
	      		return this;
			},
			renderImages: function(){
				for(var i = 0; i < this._itemViews.length; i++){
					this._itemViews[i].renderImage();
				}
	      		return this;
			},
			renderStudentNames: function(){
				for(var i = 0; i < this._itemViews.length; i++){
					this._itemViews[i].renderStudentNames();
				}
	      		return this;
			},
			renderLinks: function(){
				for(var i = 0; i < this._itemViews.length; i++){
					this._itemViews[i].renderLinks();
				}
	      		return this;
			}
        });

  return ElementsView;
});