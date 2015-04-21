App.Views.AllMethods = Backbone.View.extend({
	el: '#all-methods',
	initialize: function() {
		console.log('new rate method view created');
	},
	renderAll: function() {
		this.$el.empty();
		$.get('/knowledges/' + App.navBar.model.get('id'))
			.done(function(data) {
				App.currentUserKnowledges = data;
				// this.collection.each(function(method) {
				// 	var newView = new App.Views.ListMethod({model: method});
				// 	this.$el.append(newView.el);
				// }.bind(this));
				this.collection.each(this.renderOne, this)
			}.bind(this));
	},
	renderOne: function(method) {
		var newMethodView = new App.Views.ListMethod({model: method});
		this.$el.append(newMethodView.el);
	}
});