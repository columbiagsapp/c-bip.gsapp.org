define([
	'models/taxonomyterm'
],
function(TaxonomyTerm) {
	
	var Tag = TaxonomyTerm.extend({ 
		//need to init in order to bind vote to this Model as a local function
		initialize: function(opts){
			TaxonomyTerm.prototype.initialize.call(this, opts);
		}
	});

	return Tag;
});