App.Views.Technologies = Backbone.View.extend({
	el: '#technologies',
	initialize: function() {
		console.log('new technologies page');
		this.template = Handlebars.compile($('#technologies-template').html());
	},
	render: function() {
		$.get('/methods/types')
			.done(function(data) {
				var handlebarsData = data.map(function(technology) {
					return {name: technology};
				});
				this.$el.html(this.template(handlebarsData));
				this.$el.show();
			}.bind(this));
	},
	events: {
		'click .technology': 'renderRateMethods'
	},
	renderRateMethods: function(clicked) {
		App.currentTechnology = clicked.target.innerHTML;
		App.clearDisplay();
		$.get('/knowledges/' + App.navBar.model.get('id') + '/' + App.currentTechnology)
			.done(function(data) {
				App.currentUserKnowledges = data;
				$.get('/methods/of_type/' + App.currentTechnology)
					.done(function(methods) {
						App.methods = new App.Collections.Methods(methods);
						App.allMethods.collection = App.methods;
						App.allMethods.renderAll();
					});
			}); 
	}
});