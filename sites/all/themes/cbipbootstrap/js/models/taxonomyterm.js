define([
	'lib/backbone-min'
],
function(Backbone) {
	
	var TaxonomyTerm = Backbone.Model.extend({
		// Base endpoint, used to create full url for each collection.
		restEndpoint: "",
		urlRoot: "taxonomy_term",
        idAttribute: "tid",
        noSaveAttributes: ['tid', 'name', 'description', 'weight', 'node_count', 'url', 'parent', 'parents_all'],

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
	
	return TaxonomyTerm;

      
});