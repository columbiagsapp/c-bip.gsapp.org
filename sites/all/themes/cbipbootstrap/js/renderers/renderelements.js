define([
	'globals',
	'config',
	'views/elementview',
	'collections/elements',
	'views/elementsview'
],
function(globals, config, ElementView, Elements, ElementsView) {
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

		config.resizeFunc();

		//elements_view.renderTags().renderImages().renderStudentNames().renderFiles();


		//.renderTags();//.renderImages().renderStudentNames();

		return true;
	}

	return renderElements;
});