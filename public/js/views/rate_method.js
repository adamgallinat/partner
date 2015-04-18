App.Views.RateMethod = Backbone.View.extend({
	el: '#rate-method',
	initialize: function() {
		console.log('new rate method view created');
		this.template = Handlebars.compile($('#rate-method-template').html());
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	}
});