App.Views.Modal = Backbone.View.extend({
	el: '#modal',
	initialize: function() {
		console.log('new modal created');
		this.template = Handlebars.compile($('#modal-template').html());
	},
	render: function() {
		this.$el.show();
		this.$el.html(this.template(this.model.toJSON()));
	},
	events: {
		'click #shader' : 'hideModal'
	},
	hideModal: function() {
		this.$el.hide();
	}
});