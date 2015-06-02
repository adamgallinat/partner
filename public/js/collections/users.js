App.Collections.Users = Backbone.Collection.extend({
	initialize: function() {
		this.fetch();
	},
	url: '/users'
});