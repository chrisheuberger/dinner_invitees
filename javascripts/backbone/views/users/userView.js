var UserEditView = Backbone.View.extend({
  el: '.page',
  events: {
    'submit .edit-user-form': 'saveUser',
    'click .delete': 'deleteUser'
  },
  saveUser: function (ev) {
    var userDetails = $(ev.currentTarget).serializeObject();
    var user = new User();
    user.save(userDetails, {
      success: function (user) {
        router.navigate('', {trigger:true});
      }
    });
    return false;
  },
  deleteUser: function (ev) {
    this.user.destroy({
      success: function () {
        console.log('destroyed');
        router.navigate('', {trigger:true});
      }
    });
    return false;
  },
  render: function (options) {
    var that = this;
    if(options.id) {
      that.user = new User({id: options.id});
      that.user.fetch({
        success: function (user) {
          var template = _.template($('#edit-user-template').html(), {user: user});
          that.$el.html(template);
        }
      })
    } else {
      var template = _.template($('#edit-user-template').html(), {user: null});
      that.$el.html(template);
    }
  }
});
