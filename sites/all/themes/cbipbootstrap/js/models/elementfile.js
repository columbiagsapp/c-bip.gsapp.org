define([
	'models/file'
],
function(File) {
	
	
	var ElementFile = File.extend({ 
		//need to init in order to bind vote to this Model as a local function
		initialize: function(opts){
			File.prototype.initialize.call(this, opts);
		}
	});


	return ElementFile;
});