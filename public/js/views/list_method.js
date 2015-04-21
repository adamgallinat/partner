App.Views.ListMethod = Backbone.View.extend({
	className: 'method',
	model: App.Models.Methods,
	initialize: function() {
		this.template = Handlebars.compile($('#list-method-template').html());
		this.listenTo(this.model, 'sync', this.reRender);
		this.render();
	},
	render: function() {
		this.$el.empty();
		this.$el.html(this.template(this.model.toJSON()));
		var methodKnowledge;
			App.currentUserKnowledges.forEach(function(knowledge) {
				if (knowledge.method_id === this.model.id) {
					methodKnowledge = knowledge;
					this.model.set('methodKnowledge', methodKnowledge);
				}
			}.bind(this));
			if (methodKnowledge) {
				this.$el.append($('<div>').html(methodKnowledge.comfort));
			} else {
				this.$el.append($('<div>').html(0));
			}
	},
	events: {
		'click': 'renderModalView'
	},
	renderModalView: function() {
		App.modal.model = this.model;
		App.modal.render();
		App.modal.index = App.methods.indexOf(this.model);
	},
	reRender: function() {
		this.$el.empty();
		this.$el.html(this.template(this.model.toJSON()));
			this.$el.append($('<div>').html(this.model.get('methodKnowledge').comfort));
	}
});