App.Views.NavBar = Backbone.View.extend({
	el: '#nav-bar',
	initialize: function() {
		console.log('nav bar created');
		this.template = Handlebars.compile($('#nav-bar-template').html());
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},
	events: {
		'click #log-out': 'logOut',
		'click h1': 'returnToTechnologies'
	},
	logOut: function() {
		$.ajax({
			url: '/session',
			method: 'DELETE'
		})
			.then(function(user) {
				App.clearDisplay();
				App.navBar.model = new App.Models.User();
				App.navBar.render();
				App.logIn.render();
			}.bind(this));
	},
	returnToTechnologies: function() {
		if (App.navBar.model.get('first_name')) {
			App.clearDisplay();
			App.technologies.render();
		}
	}
});