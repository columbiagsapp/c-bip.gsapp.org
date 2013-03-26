define([
	'models/tag',
	'collections/taxonomyterms'
],
function(Tag, TaxonomyTerms) {
  var Tags = TaxonomyTerms.extend({
	model: Tag,
	comparator: function(tag) {
		return tag.get("name");
	}
  });

  return Tags;
});