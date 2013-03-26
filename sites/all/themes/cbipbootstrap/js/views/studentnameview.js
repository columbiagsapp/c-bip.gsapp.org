define([
	'models/studentname',
	'text!templates/studentname.html',
	'views/view',
],
function(StudentName, template, View) {
  
  var StudentNameView = View.extend({
  	model: StudentName,
    template: template,
    className: 'studentname',
    tagName: 'div',

    initialize: function(opts) {
  		View.prototype.initialize.call(this, opts);
  		this.model.bind('change', this.render, this);//this calls the fetch
    }

  });


  return StudentNameView;
});
