App.Views.AllMethods = Backbone.View.extend({
	el: '#rate-method',
	initialize: function() {
		console.log('new rate method view created');
	},
	renderAll: function() {
		this.collection.each(function(method) {
			var newView = new App.Views.ListMethod({model: method});
			this.$el.append(newView.$el.html());
		}.bind(this));
	}
});