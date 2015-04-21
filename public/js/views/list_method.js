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
				this.$el.addClass('known')
								.append($('<div>').html(methodKnowledge.comfort));
			} else {
				this.$el.append($('<div>').html(0));
			}
	},
	events: {
		'click': 'renderMethodView'
	},
	renderMethodView: function() {
		App.method.model = this.model;
		App.method.render();
		App.method.index = App.methods.indexOf(this.model);
	},
	reRender: function() {
		this.$el.empty();
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.addClass('known');
		this.$el.append($('<div>').html(this.model.get('methodKnowledge').comfort));
	}
});