define([
	'models/studentname',
	'collections/taxonomyterms'
],
function(StudentName, TaxonomyTerms) {
  var StudentNames = TaxonomyTerms.extend({
	model: StudentName,
	comparator: function(tag) {
		return tag.get("name");
	}
  });

  return StudentNames;
});