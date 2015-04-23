App.Views.ListMethod = Backbone.View.extend({
	className: 'method',
	model: App.Models.Methods,
	initialize: function() {
		this.template = Handlebars.compile($('#list-method-template').html());
		this.listenTo(this.model, 'sync', this.reRender);
		this.render();
	},
	render: function() {
		// this.$el.empty();
		this.mouseoverAnimate(this);
		this.$el.html(this.template(this.model.toJSON()));
		var methodKnowledge;
			App.currentUserKnowledges.forEach(function(knowledge) {
				if (knowledge.method_id === this.model.id) {
					methodKnowledge = knowledge;
					this.model.set('methodKnowledge', methodKnowledge);
				}
			}.bind(this));
			if (methodKnowledge) {
				if (methodKnowledge.comfort === 0) {
					this.$el.addClass('unknown');
				} else if (methodKnowledge.comfort === 1) {
					this.$el.addClass('halfknown');
				} else if (methodKnowledge.comfort === 2) {
					this.$el.addClass('known');
				}
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
		this.$el.removeClass('unknown halfknown known');
		if (parseInt(this.model.get('methodKnowledge').comfort) === 0) {
			this.$el.addClass('unknown');
		} else if (parseInt(this.model.get('methodKnowledge').comfort) === 1) {
			this.$el.addClass('halfknown');
		} else if (parseInt(this.model.get('methodKnowledge').comfort) === 2) {
			this.$el.addClass('known');
		}
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.parent().animate({scrollTop: this.el.offsetTop - 152}, 150);
	},
	mouseoverAnimate: function(method) {
		method.$el.on('mouseover', function() {
			$(this).animate({'padding-left':'10px'},100);
		});
		method.$el.on('mouseleave', function() {
			$(this).animate({'padding-left':'0px'},100);
		});
	}
});