App.Views.PartnerList = Backbone.View.extend({
	el: '#partner-list',
	initialize: function() {
		console.log('new partner list rendered!');
	},
	render: function() {
		this.$el.html('Partner List View coming soon!');
		// For each method_id in App.methods, get all knowledges associated with that method_id
		var methodList = App.methods.map(function(method) {
			return method.get('id');
		});
		// $.get('/knowledges/of_methods', methodList)
		// 	.done(function(data) {
		// 		console.log(data);
		// 	});
	}
});