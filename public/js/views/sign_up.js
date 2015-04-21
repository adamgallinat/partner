App.Views.SignUp = Backbone.View.extend({
	el: '#sign-up',
	initialize: function() {
		console.log('new signup view created');
		this.template = Handlebars.compile($('#sign-up-template').html());
	},
	render: function() {
		this.$el.html(this.template());
	},
	events: {
		'click #sign-up-button': 'createAndLogIn',
		'click #or-log-in': 'orLogIn'
	},
	createAndLogIn: function() {
		var newUser = {
			first_name: $('[name=first_name]').val(),
			last_name: $('[name=last_name]').val(),
			email: $('[name=email_address]').val(),
			password: $('[name=password]').val()
		};
		var clientErrors = this.clientSideValidations();
		if (clientErrors.length) {
			$('#sign-up-errors').empty()
													.html(clientErrors);
		} else {
			$.post('/users', newUser)
				.done(function(data) {
					this.signUpUser(data);
				}.bind(this))
				.fail(function(error) {
					var errorMessages = error.responseJSON.msg.errors.map(function(message) {
						return $('<li>').html(message.message);
					});
					console.log(errorMessages);
					$('#sign-up-errors').empty()
															.html(errorMessages);
			});
		}
	},
	clientSideValidations: function() {
		var response = [];
		if ($('[name=password]').val() !== $('[name=password2]').val()) {
			response.push($('<li>').html('Passwords must match'));
		}
		if ($('[name=password]').val().length < 6) {
			response.push($('<li>').html('Passwords must be > 6 characters'));
		}
		return response;
	},
	signUpUser: function(data) {
		App.navBar.model = new App.Models.User(data);
		App.clearDisplay();
		App.navBar.render();
		App.technologies.render();
	},
	orLogIn: function() {
		App.clearDisplay();
		App.logIn.render();
	}
});