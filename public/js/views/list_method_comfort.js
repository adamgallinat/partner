App.Views.ListMethodView = Backbone.View.extend({
	initialize: function() {
		this.template = Handlebars.compile($('#list-method-comfort-template').html());
		this.render();
		this.listenTo(this.model, 'change', this.render)
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	}
});