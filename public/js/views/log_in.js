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
		'click #log-in-button': 'clickLogIn'
	},
	clickLogIn: function() {
		var userInfo = {
			email: $('[name=email_address]').val(),
			password: $('[name=password]').val()
		};
		var clientErrors = this.clientSideValidations();
		if (!clientErrors.length) {
			$.post('/session', userInfo)
				.done(function(data) {
					this.logInUser(data);
				}.bind(this))
				.fail(function(error) {
					$('#log-in-errors').html(error.responseJSON.msg);
				});
		} else {
			$('#log-in-errors').empty()
												 .html(clientErrors);
		}
	},
	clientSideValidations: function() {
		var response = [];
		if (!$('[name=email_address]').val()) {
			response.push($('<li>').html('Email address cannot be blank!'));
		}
		if (!$('[name=password]').val()) {
			debugger;
			response.push($('<li>').html('Password cannot be blank!'));
		} else if ($('[name=password]').val().length < 6) {
			response.push($('<li>').html('Password must be > 6 characters!'));
		}
		return response;
	},
	logInUser: function(data) {
		App.navBar.model = new App.Models.User(data);
		App.clearDisplay();
		App.navBar.render();
		App.technologies.render();
	},
	orSignUp: function() {
		App.clearDisplay();
		App.signUp.render();
	}
});