function htmlEncode(value){
  return $('<div/>').text(value).html();
}
$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
      if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
          }
          o[this.name].push(this.value || '');
      } else {
          o[this.name] = this.value || '';
      }
  });
  return o;
};

$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = 'http://backbonejs-beginner.herokuapp.com' + options.url;
});

var Router = Backbone.Router.extend({
  routes: {
    "": "home",
    "edit/:id": "edit",
    "new": "edit"
  }
});

$(function(){

  var userListView = new UserListView();
  var userEditView = new UserEditView();

  window.router = new Router;
  router.on('route:home', function(){
    userListView.render();
  })
  router.on('route:edit', function(id){
    userEditView.render({id: id});
  })
  Backbone.history.start();

})
