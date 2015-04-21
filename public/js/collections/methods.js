App.Collections.Methods = Backbone.Collection.extend({
	initialize: function() {
		console.log('new methods collection created');
		this.fetch();
	},
	model: App.Models.Method,
	comparator: 'name',
	url: '/methods'
});