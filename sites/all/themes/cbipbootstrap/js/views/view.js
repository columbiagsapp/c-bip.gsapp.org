define([
	'lib/backbone-min'
],
function(Backbone) {

	// ### Drupal.Backbone.Views.Base
	//
	// The parent class for most rendered Drupal Backbone views, this object
	// mainly contains functions for standardizing and abstracting calls to
	// the template library and references to templates.  It meant to be
	// easily extended, so you can focus on logic and presentation of content
	// types, view data etc., and minimize boilerplate code.  At the same time
	// the template engine specifics have been abstracted out, so that
	// switching to a differen template library (such as Handlebars.js),
	// should be as easy as overriding the compileTemplate and/or
	// executeTemplate functions, with everything else remaining the same.
	//
	//    * TODO add parentEl property, and automatically attach the new el
	//      if it exists as part of this.render()
	var View = Backbone.View.extend({

	    tagName: 'div',
	    className: 'bb-view',

	    // #### initialize
	    //
	    // Initialize our view by preparing the template for later rendering.
	    //
	    // This can work in either of two ways:
	    //
	    //    1. by passing Drupal.Backbone.View.create() an options object with
	    //       a jQuery object or selector pointing to the template or the actual
	    //       source of the template to be loaded.
	    //    2. by subclassing this object and setting either the
	    //       templateSelector or templateSource propoerties. Note that you
	    //       need to be sure to call this initialize function in your
	    //       subclass if you override the initialize function there. Example
	    //       code would look like:
	    //
	    //           myDrupalBackboneView = Drupal.Backbone.View.extend({
	    //             templateSelector: '#template-id'
	    //           });
	    initialize: function(opts) {
	      _.bindAll(this,
	                'render',
	                'unrender'
	               );


	      if (typeof(opts) !== 'object') {
	        opts = {};
	      }

	    },

	    // #### render(variables, el)
	    //
	    // Default render function, passes arg variables or model attributes object to
	    // template, renders using executeTemplate() method and then appends to
	    // this.el or other specified el.
	    // TODO: refactor model rendering into separate view class
	    render: function(variables, el){
	      variables = (typeof variables === "object") ? variables : {};
	      el = (typeof el === "undefined") ? this.el : el;
	      if (this.model && (variables !=={})) {
	        variables = this.model.renderAttributes();
	      }

	      var content = _.template(this.template, variables);

	      $(this.el).html(content);

	      // return ```this``` so calls can be chained.
	      return this;
	    },

	    // #### unrender()
	    //
	    // Default unrender method, removes this.el from DOM.
	    unrender: function() {
	      $(this.el).remove();
	      return this;
	    }
	}); // end extend

return View;

      
});