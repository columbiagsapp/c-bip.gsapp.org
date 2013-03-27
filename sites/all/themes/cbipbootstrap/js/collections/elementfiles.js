define([
	'models/elementfile',
	'collections/files'
],
function(ElementFile, Files) {
  var ElementFiles = Files.extend({
	model: ElementFile,
	comparator: function(file) {
		return file.get("description");
	}
  });

  return ElementFiles;
});