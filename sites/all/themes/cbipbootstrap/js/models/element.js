define([
	'models/node'
],
function(Node) {
	
	var Element = Node.extend({ 
		//need to init in order to bind vote to this Model as a local function
		initialize: function(opts){
			Node.prototype.initialize.call(this, opts);
			this.addNoSaveAttributes(['field_element_description', 'field_year', 'field_element_tags', 'field_student_names', 'field_element_image', 'field_links', 'field_element_files', 'type', 'title', 'body']);
		}
	});

	return Element;
});