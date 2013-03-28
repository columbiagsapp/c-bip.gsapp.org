define([
	'globals',
	'lib/backbone-min'
],
function(globals, Backbone) {
	Backbone.old_sync = Backbone.sync;
	Backbone.sync = function(method, model, options) {
	    var new_options =  _.extend({
	        beforeSend: function(xhr) {
	            if (globals.CSRF_TOKEN) xhr.setRequestHeader('X-CSRF-Token', globals.CSRF_TOKEN);
	        }
	    }, options);
	    Backbone.old_sync(method, model, new_options);
	};

	// Set up some Utility functions
	_.mixin({
	    // ### _.objMap
	    //
	    // _.map for objects, keeps key/value associations
	    // and changes the value via function.
	    // Adapted from https://github.com/documentcloud/underscore/issues/220
	    objMap: function (input, mapper, context) {
	      return _.reduce(input, function (obj, v, k) {
	        obj[k] = mapper.call(context, v, k, input);
	        return obj;
	      }, {}, context);
	    },
	    // ### _.objFilter
	    //
	    // _.filter for objects, keeps key/value associations
	    // but only includes the properties that pass test().
	    // Adapted from https://github.com/documentcloud/underscore/issues/220
	    objFilter: function (input, test, context) {
	      return _.reduce(input, function (obj, v, k) {
	        if (test.call(context, v, k, input)) {
	          obj[k] = v;
	        }
	        return obj;
	      }, {}, context);
	    },
	    // ### _.objReject
	    //
	    // _.reject for objects, keeps key/value associations
	    // but only includes the properties that pass test().
	    // Adapted from https://github.com/documentcloud/underscore/issues/220
	    objReject: function (input, test, context) {
	      return _.reduce(input, function (obj, v, k) {
	        if (!test.call(context, v, k, input)) {
	          obj[k] = v;
	        }
	        return obj;
	      }, {}, context);
	    }
	});
	
	var Node = Backbone.Model.extend({
		// Base endpoint, used to create full url for each collection.
		restEndpoint: "",
		urlRoot: "node",
        idAttribute: "nid",
        noSaveAttributes: ['nid', 'vid', 'is_new', 'url', 'edit_url', 'changed', 'comment_count', 'comment_count_new'],

		// #### initialize()
		//
		// Set up defaults for attribute processing.
		initialize: function() {
		  this.toJSONProcessors = this.JSONProcessors || {};
		  this.noSaveAttributes = this.noSaveAttributes || [];
		  _(this).bindAll('setNoSaveAttributes', 'getNoSaveAttributes', 'addNoSaveAttributes', 'toJSON');
		},

		// #### toJSON: Enhanced JSON processing function
		// Allows us to specify and override processing functions
		// for a single field. Most of this customization will actuallly
		// be in the backend specific functions, as the preparation is
		// needed to prepare for communication with the server.
		toJSON: function() {
		  return _(this.attributes)
		    .chain()
		    // Filter out any attributes that should not be sent.
		    .objReject(function(value, name, list) {
		      return (_(this.noSaveAttributes).indexOf(name) >= 0);
		    }, this)
		    // Transform any attribute values that need processing.
		    .objMap(this.toJSONAttribute, this)
		    .value();
		},

		// #### setNoSaveAttributes: specify attributes we should not send on save
		// Some backends reject our request when we send attributes we can't change.
		// This function takes a single attribute name or an array of attribute
		// names and will filter those attributes out on save.
		setNoSaveAttributes: function(attributes) {
		  this.noSaveAttributes = attributes;
		},

		addNoSaveAttributes: function(attributes) {
		  this.noSaveAttributes = _(this.noSaveAttributes).union(attributes);
		},

		getNoSaveAttributes: function(attributes) {
		  return this.noSaveAttributes;
		},

		// ### setToJSONProcessor()
		//
		// Use this method to set a custom JSON processor for a given
		// attribute. Currently all overrides are attribute name based,
		// so provide the name of the attribute (e.g. "title") and
		// a function to use (either anonymous func or a method on your
		// model).
		setToJSONProcessor: function(attributeName, processorFunction) {
		  this.toJSONProcessors[attributeName] = processorFunction;
		},

		// #### toJSONAttribute: process attribute into JSON if process funciton given.
		toJSONAttribute: function(attributeValue, attributeName) {
		  if (this.toJSONProcessors[attributeName]) {
		    attributeValue = this.toJSONProcessors[attributeName].call(this, attributeValue);
		  }
		  return attributeValue;
		},

		// Both Services and RESTWS use the format
		// "{endpoint}/{resource-type}/{id}.json, only {endpoint} is empty for
		// RESTWS.
		// We don't include the collection stuff here, since Drupal collections are
		// indpendent of their objects.
		url: function() {
          return Drupal.settings.basePath + this.urlRoot + '/' + this.get(this.idAttribute) + ".json";
        },

		// TODO: evaluate moving all of this to Views.Base
		//       In terms of proper architecture, model should not have views-specific functions.

		// Prepare an object for default rendering
		// arg1: whitelist, array of whitelisted properties (to render)
		// TODO: add blacklist
		renderAttributes: function(whitelist, blacklist) {
			var properties = _.clone(this.attributes);
			if (_.isArray(whitelist)) {
				properties = _(properties).pick(whitelist);
			}
			return properties;
		}

	});
	
	return Node;

      
});