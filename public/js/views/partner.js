App.Views.Partner = Backbone.View.extend({
	className: 'partner',
	initialize: function() {
		this.template = Handlebars.compile($('#partner-template').html());
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model));
	}
});