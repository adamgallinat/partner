var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	clearDisplay: function() {
		$('#sign-up').empty();
		$('#log-in').empty();
		$('#technologies').empty();
		$('#all-methods').hide().empty();
		$('#method-container').hide();
		$('#method').empty();
		$('#modal').empty();
	}
};

$(function() {
	console.log('Loaded, bro.');
	App.users = new App.Collections.Users();
	App.navBar = new App.Views.NavBar({model: new App.Models.User()});
	App.logIn = new App.Views.LogIn();
	App.signUp = new App.Views.SignUp();
	App.technologies = new App.Views.Technologies();
	App.method = new App.Views.Method({model: new App.Models.Method()});
	App.modal = new App.Views.Modal({model: new App.Models.Method()});
	App.allMethods = new App.Views.AllMethods();
	App.partnerList = new App.Views.PartnerList();
	$.get('current_user')
		.done(function(data) {
			if (data === 'not logged in') {
				App.logIn.render();
			} else {
				App.navBar.model = new App.Models.User(data);
				App.navBar.render();
				App.technologies.render()
			}
		});
});