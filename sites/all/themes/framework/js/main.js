requirejs.config({
  baseUrl: 'sites/all/themes/framework/js',

  paths: {
  },

  shim: {
  }
});

require(['app'],

function(App) {
  window.bTask = new App();
});