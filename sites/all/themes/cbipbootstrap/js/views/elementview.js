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

    initialize: function(opts) {
    	_.bindAll(this, 'renderTags', 'renderStudentNames', 'renderImage');
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

    }

  });


  return ElementView;
});
