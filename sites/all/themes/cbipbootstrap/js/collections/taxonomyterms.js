define([
	'lib/backbone-min',
	'models/taxonomyterm'
],
function(Backbone, TaxonomyTerm) {

	// ### Drupal.Backbone.Collection
	//
	// Currently just sets the endpoint for all collections.
	//
	// TODO fix scoping issue that causes params to bleed between children of this object.
	//  e.g. if you have two NodeViewCollections, setting limit on one sets on both.
	var TaxonomyTerms = Backbone.Collection.extend({
	    // Base endpoint, used to create full url for each collection.
	    restEndpoint: "",
	    entityType: 'taxonomy_term',
        model: TaxonomyTerm,

	    // #### initialize()
	    //
	    // We bind the param functions to this on initialize, to avoid chain
	    // inheritance issues.
	    //
	    // *NOTE* if you subclass this and have an initialize function in your
	    // subclass, you need to execute Drupal.Backbone.Collection.initialize
	    // explicitly.
	    initialize: function(opts) {
	      _.bindAll(this, 'setParam', 'setParams', 'getParams', 'fetchQuery');
	      this.params = {};
	      if (opts) {
            if (opts.entityType) {
              this.entityType = opts.entityType;
            }
            this.model = opts.model ? opts.model : this.model;
          }
	    },

	    // #### params
	    //
	    // Drupal collections are stateful, we store params in the collection.
	    params: {},

	    // #### setParam(string, string)
	    //
	    // Setter for individual params, called as setParam('name','value').
	    setParam: function(paramName, paramValue) {
	      this.params[paramName] = paramValue;
	    },

	    // #### setParams(object)
	    //
	    // Setter for multiple params, passed as object with key/value pairs.
	    setParams: function(params) {
	      if (typeof(this.params) !== 'object') {
	        this.params = object;
	      }
	      if (typeof(params) === 'object') {
	        _.extend(
	          this.params,
	          params
	        );
	      }
	    },

	    // #### getParams()
	    //
	    // Getter. Currently just returns param object property.
	    getParams: function() {
	      return this.params;
	    },

	    url: function() {
          return Drupal.settings.basePath + this.entityType + ".json";
        },

        parse: function(resp) {
          return resp.list;
        },

	    // #### fetch() implementation
	    //
	    // Fetch method passes params as data in AJAX call.
	    fetch: function(options) {
	      options = options ? options : {};
	      if (options.data) {
	        // Allow options.data to override any params.
	        _.defaults(options.data, this.getParams());
	      }
	      else if (this.getParams()) {
	        options.data = this.getParams();
	      }

	      if(this.length > 0){
	      	var queryParams = [];
	      	for(var i = 0; i < this.length; i++){
	      		queryParams.push({ tid : this.at(i).get('tid') });
	      	}

	      	//options = _(options).extend({data: {tid: 40 }});
	      }

	      // Call Super fetch function with options array including any collection params.
	      Backbone.Collection.prototype.fetch.call(this, options);
	    },

	    //fetch with query parameters
	    fetchQuery: function(queryParams, options) {
          options = options || {};
          return this.fetch(_(options).extend({data: queryParams}));
        }
	});


	
	
	return TaxonomyTerms;

      
});