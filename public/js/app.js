var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
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