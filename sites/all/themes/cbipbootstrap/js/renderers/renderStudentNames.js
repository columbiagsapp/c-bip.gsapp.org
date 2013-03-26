define([
	'views/studentnameview',
	'collections/studentnames',
	'views/studentnamesview'
],
function(ElementView, Elements, ElementsView) {
	var renderElements = function(){
		var elements = new Elements();
		elements.fetchQuery({ type: "element" });

		var elements_view = new ElementsView({
			collection: elements,
			el: '#main',
			itemParent: '#elements-anchor',
			ItemView: ElementView
		});

		elements_view.render();

		return true;
	}

	return renderElements;
});