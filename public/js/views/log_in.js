App.Views.LogIn = Backbone.View.extend({
	el: '#log-in',
	initialize: function() {
		console.log('new login view created');
		this.template = Handlebars.compile($('#log-in-template').html());
	},
	render: function() {
		this.$el.html(this.template());
	},
	events: {
		'click #or-sign-up': 'orSignUp',
		'click #log-in': 'logIn'
	},
	logIn: function() {
		console.log('login');
		var userInfo = {
			email: $('[name=email_address]').val(),
			password: $('[name=password]').val()
		};
		$.post('/session', userInfo)
			.done(console.log('Logged in!'))
			.fail(function(error) {
				console.log(error);
			});
	},

	orSignUp: function() {
		this.$el.empty();
		App.signUp.render();
	}
});