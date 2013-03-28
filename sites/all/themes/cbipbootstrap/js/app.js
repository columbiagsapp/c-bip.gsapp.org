define([ 
	'globals',
	'config',
	'init',
	'renderers/renderelements',
	'collections/taxonomyterms',
	'collections/files',
	'collections/elements',
	'models/elementfile',
	'views/elementfileview',
	'collections/elementfiles',
	'views/elementfilesview'
],
function(globals, config, init, renderElements, TaxonomyTerms, Files, Elements, ElementFile, ElementFileView, ElementFiles, ElementFilesView) {


		//attach fetched Element Files to Element
		function attachElementFiles(element, elementfiles){
			console.log('attachElementFiles(), showing element');
			element._ElementFiles = elementfiles;
			console.dir(element);
			console.log('');console.log('');
		}

		function fetchElementFiles(){
			//console.log('fetchElementFiles()');
			//console.dir(globals.ELEMENTS);

			_.each(globals.ELEMENTS.models, function(element, index, list){
				//console.log('element number: '+ index);
				//console.dir(element);

				var _elementFiles = element.get('field_element_files');
				var _elementFilesViewEl = '#node-' + element.get('nid') + ' .element-data-links';

				//console.log('_elementFilesViewEl: '+ _elementFilesViewEl);
				
				var element_files = new ElementFiles();

				var _descriptions = [];
				var _filesTotal = _elementFiles.length;
				var _filesCount = 0;

				//console.log('_filesTotal: '+ _filesTotal);

				for(var i = 0; i < _elementFiles.length; i++){
					var file_model = new ElementFile({fid: _elementFiles[i].file.id});
					_descriptions[ _elementFiles[i].file.id ] = _elementFiles[i].description.toUpperCase();

					file_model.fetch({
						success: function(model, response, options){

							_filesCount++;
							var fid = model.get('fid');
							model.set({'description': _descriptions[ fid ]});
							
							element_files.add(model);
							//console.log('fetched! model with fid: '+fid);
							//console.log('*******element_files_view:');
							//console.dir(element_files_view);
							

							if(_filesCount == _filesTotal){
								attachElementFiles(element, element_files);
							}
							//$('.preloader', imageViewEl).remove();
						}
					});
				}
			});
		}

	var App = function() {
		var pathArray = window.location.pathname.split('/');

		var flag = {};
		flag.TAXONOMY_TERMS = false;
		flag.FILES = true;
		flag.ELEMENTS = false;



		//STEP
		//Ferch all collections

		var ELEMENTS = new Elements();
		ELEMENTS.fetchQuery({ type: "element" }, {
			success: function(collection, response, options){
				globals.ELEMENTS = collection;
				flag.ELEMENTS = true;

				fetchElementFiles();

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
	}

	
	


	return App;
});