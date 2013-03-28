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
			renderFiles: function(){
				for(var i = 0; i < this._itemViews.length; i++){
					this._itemViews[i].renderFiles();
				}
	      		return this;
			},
			// Add a single item to the view.
		    // Render individually and attach, if the collection view has already rendered.
		    // TODO: set up "insert at" rendering, so new models don't have to go at the end.
		    // TODO: fix issue of extended renderer property being overridden/discounted by initialize.
		    addOne: function(newModel) {
		      var myItemView = new this.ItemView({
		        model: newModel,
		      });

		      // Store pointer to this view in a private variable.
		      this._itemViews.push(myItemView);
		      
		      // TODO: refactor using model view class
		      // TODO: fix binding issue so we can just call render and have it use its own model
		      //       (currently "this" in ItemView.render is pointing to the collection view)
		      myItemView.render(newModel.renderAttributes());
		      this.$(this.itemParent).append(myItemView.el);

		      myItemView.renderTags().renderImage().renderStudentNames().renderFiles();

		      // Bind collection remove to model view remove.
		      newModel.bind('remove', myItemView.unrender);

		      //TCT2003: addOne should also add the model to this.collection
		      //this.collection.add(newModel);

		      //TCT2003 added this return
		      return myItemView;
		    },

		    // Add all, for bootstrapping, etc.
		    addAll: function() {
		      this.collection.each(this.addOne);
		    },
        });

  return ElementsView;
});