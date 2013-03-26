define([
	'models/node'
],
function(Node) {
	
	var Element = Node.extend({ 
		//need to init in order to bind vote to this Model as a local function
		initialize: function(opts){
			Node.prototype.initialize.call(this, opts);
		}
	});

	return Element;
});