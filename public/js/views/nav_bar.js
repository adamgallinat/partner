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
		'click #log-out': 'logOut'
	},
	logOut: function() {
		$.ajax({
			url: '/session',
			method: 'DELETE'
		})
			.then(function(user) {
				this.model = new App.Models.User();
				this.render();
				App.logIn.render();
			}.bind(this));
	}
});