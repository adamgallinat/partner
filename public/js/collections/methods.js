App.Collections.Methods = Backbone.Collection.extend({
	initialize: function() {
		console.log('new methods collection created');
	},
	model: App.Models.Method,
	comparator: 'name',
	url: '/methods'
});