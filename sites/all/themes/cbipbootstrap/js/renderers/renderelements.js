define([
	'globals',
	'views/elementview',
	'collections/elements',
	'views/elementsview'
],
function(globals, ElementView, Elements, ElementsView) {
	var renderElements = function(){
		console.dir(globals.ELEMENTS);

		var elements = new Elements();
		var elements_view = new ElementsView({
			collection: elements,
			el: '#main',
			itemParent: '#elements-anchor',
			ItemView: ElementView
		});

		elements_view.render();

		_.each(globals.ELEMENTS.models, function(element){
			elements_view.addOne(element);
		});

		elements_view.renderTags().renderImages().renderStudentNames().compareFiles();


		//.renderTags();//.renderImages().renderStudentNames();

		return true;
	}

	return renderElements;
});