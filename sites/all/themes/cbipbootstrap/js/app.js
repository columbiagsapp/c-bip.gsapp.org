define([ 
	'globals',
	'config',
	'init',
	'renderers/renderelements',
	'collections/taxonomyterms',
	'collections/files',
	'collections/elements',
],
function(globals, config, init, renderElements, TaxonomyTerms, Files, Elements) {

	var pathArray = window.location.pathname.split('/');

	var App = function() {
	};

	App.prototype = {
	};

	init();

	var flag = {};
	flag.TAXONOMY_TERMS = false;
	flag.FILES = true;
	flag.ELEMENTS = false;


	var ELEMENTS = new Elements();
	ELEMENTS.fetchQuery({ type: "element" }, {
		success: function(collection, response, options){
			globals.ELEMENTS = collection;
			flag.ELEMENTS = true;
		}
	});

	var FILES = new Files();
	/*FILES.fetch({
		success: function(collection, response, options){
			globals.FILES = collection;
			flag.FILES = true;
			//renderCallback();
		}
	});*/


	var taxonomy_page = 0;
	var TAXONOMY_TERMS = new TaxonomyTerms();

	globals.TAXONOMY_TERMS = new Backbone.Collection();


	function fetchTaxonomyTerms(){
		TAXONOMY_TERMS.fetchQuery({page: taxonomy_page},{
			success: function(collection, response, options){
				globals.TAXONOMY_TERMS.add(collection.models);
				
				//if(response.next != undefined){
				//	taxonomy_page++;
				//	fetchTaxonomyTerms();
				//}else{
					flag.TAXONOMY_TERMS = true;
				//}
			}
		});
	}

	fetchTaxonomyTerms();
		

	
	
	function menuClickFunc(event, pathIn){
		event.preventDefault();
		console.log('menuClickFunc');

		var path = pathIn || $(this).attr('href');
		
		if(flag.TAXONOMY_TERMS && flag.FILES && flag.ELEMENTS){
			router( path );
			
		}else{
			setTimeout(function(){
				menuClickFunc(event, path);
			}, 100);
		}

	}

	$('#navigation a').on('click', menuClickFunc);

	function router(path){
		console.log('routher with: '+ path);
		switch( path ){
			case '/library/elements':
				console.log('hey!');
				$('body').removeClass('front');
				renderElements();
				break;
			case '/library/strategies':

				break;
			case '/resources':

				break;//end of resources
			case '/about':

				break;//end of about
			default:
				break;

		}
	}
	


	/*

	console.dir(ElementView);

	var element = new Element({nid: '93'});
	element.fetch();

	var element_view = new ElementView({
		model: element
	});

	console.log('element:');
	console.dir(element);

	element_view.render();

	console.log(element.get('field_element_description'));

	*/








	


	return App;
});