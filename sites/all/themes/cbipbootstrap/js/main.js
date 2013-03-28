requirejs.config({
  baseUrl: '/sites/all/themes/cbipbootstrap/js',

  paths: {
  },

  shim: {
  	'lib/underscore-min': {
      exports: '_'
    },
    'lib/backbone-min': {
      deps: ['lib/underscore-min']
    , exports: 'Backbone'
    },
    'app': {
      deps: ['lib/underscore-min', 'lib/backbone-min']
    }
  }
});

require([
  'config',
  'init',
  'app'
],

function(config, init, App) {

  init();
  App();
});