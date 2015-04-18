var App = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {}
};

$(function() {
	console.log('Loaded, bro.');
	App.currentUser = new App.Models.User();
	App.methods = new App.Collections.Methods();
	App.users = new App.Collections.Users();
	App.navBar = new App.Views.NavBar({model: new App.Models.User()});
	App.logIn = new App.Views.LogIn();
	App.signUp = new App.Views.SignUp();
	App.rateMethod = new App.Views.RateMethod({model: new App.Models.Method()});
});