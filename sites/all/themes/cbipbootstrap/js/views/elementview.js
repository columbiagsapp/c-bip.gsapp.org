define([
	'globals',
	'config',
	'models/element',
	'text!templates/element.html',
	'views/view',
	'models/elementimage',
	'views/elementimageview',
	'models/studentname',
	'views/studentnameview',
	'collections/studentnames',
	'views/studentnamesview',
	'models/tag',
	'views/tagview',
	'collections/tags',
	'views/tagsview',
	'models/elementfile',
	'views/elementfileview',
	'collections/elementfiles',
	'views/elementfilesview'
],
function(globals, config, Element, template, View, ElementImage, ElementImageView, StudentName, StudentNameView, StudentNames, StudentNamesView, Tag, TagView, Tags, TagsView, ElementFile, ElementFileView, ElementFiles, ElementFilesView) {


  var ElementView = View.extend({
  	model: Element,
    template: template,
    className: 'element',
    tagName: 'div',
    imageModel: null,
    studentNamesModel: null,
    tag_array: [],
    TaxonomyTerms: null,
    files_array: [],
    _Files: [],

    initialize: function(opts) {
    	_.bindAll(this, 'renderTags', 'renderStudentNames', 'renderImage', 'compareFiles', 'updateFiles');
		View.prototype.initialize.call(this, opts);
		this.model.bind('change', this.render, this);//this calls the fetch

    },

    render: function(variables, el){
		variables = (typeof variables === "object") ? variables : {};
		el = (typeof el === "undefined") ? this.el : el;
		if (this.model && (variables !=={})) {
			variables = this.model.renderAttributes();
		}

		var content = _.template(this.template, variables);

		$(this.el).html(content);

		config.resizeFunc();


		// return ```this``` so calls can be chained.
		return this;
    },//end render()

    renderTags: function(){
    	/////// FETCH AND RENDER TAGS ///////

    	var tagsViewEl = '#node-' + this.model.get('nid') + ' .tags';
		
		this.tags = new Tags();

		var tagsView = new TagsView({
			collection: this.tags,
			el: tagsViewEl,
			itemParent: '#tags-anchor',
			ItemView: TagView
		});

		tagsView.render();

		//populate the collection
		var element_tags = this.model.get('field_element_tags');
		
		//populate this.tags with tags from the globals.TAXONOMY_TERMS collection
		if(element_tags != undefined){
			for(var i = 0; i < element_tags.length; i++){
				var master_tag = globals.TAXONOMY_TERMS.get(element_tags[i].id);
				var tag_model = new Tag({tid: element_tags[i].id, name: master_tag.get('name') });

				tagsView.addOne( tag_model );
			}
		}

		return this;
		
    },

    renderImage: function(){
    	/////// FETCH AND RENDER IMAGE ///////

    	var imageFid = this.model.get('field_element_image').file.id;
    	var imageViewEl = '#node-' + this.model.get('nid') + ' .image';

    	if(imageFid != undefined){

			this.imageModel = new ElementImage({fid: imageFid});

			var _this = this;

			this.imageModel.fetch({
				success: function(model, response, options){
					_this.imageView = new ElementImageView({ 
						model: _this.imageModel,
						el: imageViewEl
					});

					_this.imageView.render();

					$('.preloader', imageViewEl).remove();
				}
			});
			
		}
    },

    renderStudentNames: function(){
    	/////// FETCH AND RENDER STUDENT NAMES ///////
		//@todo: maybe make this a collection instead?


		
		var studentNameViewEl = '#node-' + this.model.get('nid') + ' .student-name';
		
		this.studentNames = new StudentNames();

		var studentNamesView = new StudentNamesView({
			collection: this.studentNames,
			el: studentNameViewEl,
			itemParent: '#student-names-anchor',
			ItemView: StudentNameView
		});

		studentNamesView.render();

		//populate the collection
		var element_student_names = this.model.get('field_student_names');
		
		//populate this.tags with tags from the globals.TAXONOMY_TERMS collection
		if(element_student_names != undefined){
			for(var i = 0; i < element_student_names.length; i++){
				var master_tag = globals.TAXONOMY_TERMS.get( element_student_names[i].id );
				var student_name = new Tag({tid: element_student_names[i].id, name: master_tag.get('name') });

				studentNamesView.addOne(student_name);
			}
		}

		return this;

    },

    renderFiles: function(){
    	var element_files = this.model.get('field_element_files');

    	var elementFilesViewEl = '#node-' + this.model.get('nid') + ' .element-data-links';

    	var files = new ElementFiles();
		var files_view = new ElementFilesView({
			collection: files,
			el: elementFilesViewEl,
			itemParent: '#element-files-anchor',
			ItemView: ElementFileView
		});

		files_view.render();

		var desc = [];

    	for(var i = 0; i < element_files.length; i++){
    	
    		if(element_files[i].file.id != undefined){

    			var file_model = new ElementFile({fid: element_files[i].file.id});
    			desc[ element_files[i].file.id ] = element_files[i].description.toUpperCase();

				var _this = this;

				
				file_model.fetch({
						success: function(model, response, options){
							var fid = model.get('fid');
							model.set({'description': desc[ fid ]});

							console.log( desc[ fid ] );

							files_view.addOne( model );

							//$('.preloader', imageViewEl).remove();
						}
					});
    		}

    	}
    	console.log('');console.log('');

    },

    compareFiles: function(){
    	var element_files_field = this.model.get('field_element_files_text');

    	console.log('field_element_files_text: '+ element_files_field);



    	var element_files = this.model.get('field_element_files');

    	var discrepancy = false;

    	//Check to see if any discrepancies between text field and Drupal Files DB
    	for(var i = 0; i < element_files.length; i++){
    		if(element_files_field[i] != undefined){
	    		if(element_files[i] != element_files_field[i]){
	    			discrepancy = true;
	    		}
	    	}else{
	    		discrepancy = true;
	    	}
    	}



    	if(discrepancy){
    		console.log('*****DISCREP');

    		


			var desc = [];
			this.totalFiles = element_files.length;
			this.filesFetched = 0;

	    	for(var i = 0; i < this.totalFiles; i++){
	    	
	    		if(element_files[i].file.id != undefined){
	    			var file_model = new ElementFile({fid: element_files[i].file.id});
	    			desc[ element_files[i].file.id ] = element_files[i].description.toUpperCase();

					var _this = this;

					file_model.fetch({
						success: function(model, response, options){
							var fid = model.get('fid');
							model.set({'description': desc[ fid ]});

							_this.filesFetched++;
							_this._Files[fid] = model;
							console.log('fetch success! '+ this.filesFetched);
							_this.updateFiles();
						}
					});
	    		}
	    	}
	    }//end if discrepancy
    	console.log('');console.log('');

    },

    updateFiles: function(){
    	console.log( 'updateFiles() ');
    	if(this.filesFetched >= this.totalFiles){
    		console.log('fetched all files');

    		this.new_elements_files_value = [];

    		for(var fid in this._Files){
    			this.new_elements_files_value.push(this._Files[fid]);
    		}

    		//this.model.set({field_element_files_text: this.new_elements_files_value});
    		this.model.set({ type: "element" });
    		var bla = [];
    		bla[0] = 'somevalue';
    		bla[1] = 'second';
    		this.model.set({field_element_files_text: bla});

    		this.render();

    		this.model.save();
    	}
    }

  });


  return ElementView;
});
