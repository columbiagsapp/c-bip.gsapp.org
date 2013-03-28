define([
	'views/view'
],
function(View) {


	var Views = View.extend({
	    // Intiialize function takes a configuration object as argument.
	    // Expected properties must include:
	    //
	    // ```
	    // {
	    //   collection: collectionObject,
	    //   itemView: ItemViewClass,
	    //   itemParent: Selector for target attach point of rendered items, defaults to appending to this.el  //($obj or selector string)
	    // }
	    // ```
	    //
	    // This view owes a lot to the following resources:
	    //   * "[Recipes with Backbone.js](http://recipeswithbackbone.com/)" by Gauthier and Strom
	    //   * "[Binding a Collection to a View](http://liquidmedia.ca/blog/2011/02/backbone-js-part-3/)", n_time
	    //   * "[Rendering Backbone collections in a view](http://rickquantz.com/2012/02/rendering-backbone-collections-in-a-view/)", Rick Quantz
	    initialize: function(opts) {
	      // call parent initialize w/ opts
	      View.prototype.initialize.call(this, opts);
	      // Bind methods needing binding
	      _.bindAll(this, 'render', 'addAll', 'addOne', 'remove');
	      this.ItemView = opts.ItemView;
	      this.itemParent = opts.itemParent;
	      // Keep an array pointing to all item views (aka "child views").
	      this._itemViews = [];
	      // Bind to important collection events.
	      this.collection.bind('add', this.addOne);
	      this.collection.bind('reset', this.addAll);
	      this.collection.bind('remove', this.remove);
	      this.addAll();
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

	    // Special render method
	    render: function(vars) {
	      // Call parent render function, pass any vars, to render container
	      View.prototype.render.call(this, vars);
	      return this;
	    },

	    // Remove one item, if needed.
	    // NOTE: this does not remove the element from the DOM, just the internal array.
	    // The individual item view should remove itself.
	    remove: function(model) {
	      var viewToRemove = _(this._itemViews).select(function(itemView) {
	        return itemView.model === model;
	      })[0];
	      this._itemViews = _(this._itemViews).without(viewToRemove);
	    }
	});

	return Views;

});