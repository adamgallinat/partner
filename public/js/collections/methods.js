App.Collections.Methods = Backbone.Collection.extend({
	initialize: function() {
	},
	model: App.Models.Method,
	comparator: 'name',
	url: '/methods'
});