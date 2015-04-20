App.Views.ListMethod = Backbone.View.extend({
	initialize: function() {
		this.template = Handlebars.compile($('#list-method-template').html());
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	}
});