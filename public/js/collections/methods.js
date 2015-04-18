App.Collections.Methods = Backbone.Collection.extend({
	initialize: function() {
		console.log('new methods collection created');
		this.fetch();
	},
	url: '/methods'
});