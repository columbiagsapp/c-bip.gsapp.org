define([
	'models/element',
	'collections/nodes'
],
function(Element, Nodes) {
  var Elements = Nodes.extend({
	model: Element,
	comparator: function(element) {
		return element.get("title");
	}
  });

  return Elements;
});