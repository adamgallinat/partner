App.Views.AllMethods = Backbone.View.extend({
	el: '#all-methods',
	initialize: function() {
		console.log('new rate method view created');
	},
	renderAll: function() {
		this.$el.empty();
		$.get('/knowledges/' + App.navBar.model.get('id') + '/' + App.currentTechnology)
			.done(function(data) {
				App.currentUserKnowledges = data;
				this.collection.each(this.renderOne, this);
				this.renderPercentComplete();
			}.bind(this));
		this.$el.css('display', 'inline-block');
	},
	renderOne: function(method) {
		var newMethodView = new App.Views.ListMethod({model: method});
		this.$el.append(newMethodView.el);
	},
	renderPercentComplete: function() {
		var percentComplete = Math.floor((App.currentUserKnowledges.length / this.collection.length) * 100);
		$('#completion').remove();
		this.$el.prepend($('<div id="completion">').html(percentComplete + '% complete'));
	}
});