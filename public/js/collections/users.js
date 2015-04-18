App.Collections.Users = Backbone.Collection.extend({
	initialize: function() {
		console.log('new users collection created');
		this.fetch();
	},
	url: '/users'
});