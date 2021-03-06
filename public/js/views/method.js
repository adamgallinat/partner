App.Views.Method = Backbone.View.extend({
	id: 'method',
	el: '#method',
	initialize: function() {
		console.log('method created');
		this.template = Handlebars.compile($('#method-template').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.renderComfort();
		this.$el.parent().show();
		this.$el.show();
	},
	renderComfort: function() {
		// debugger;
		// if (!this.model.get('methodKnowledge').comfort) {
		// 	$('[data-val=0]').addClass('selected');
		// } else {
		// 	if (this.model.get('methodKnowledge').comfort === 0) {
		// 		$('[data-val=0]').addClass('selected');
		// 	} else if (this.model.get('methodKnowledge').comfort === 1) {
		// 		$('[data-val=1]').addClass('selected');
		// 	} else if (this.model.get('methodKnowledge').comfort === 2) {
		// 		$('[data-val=2]').addClass('selected');
		// 	}
		// }
		$('.dot').on('click', function() {
			App.method.setComfort(parseInt($(this).data('val')));
		});
	},
	setComfort: function(comfort) {
		if (!App.method.model.get('methodKnowledge').createdAt) {
			this.newComfort(comfort);
		} else {
			this.editComfort(comfort);
		}
	},
	newComfort: function(comfort) {
		var data = {
			method_id: this.model.get('id'),
			comfort: comfort
		}
		$.ajax({
			url: '/knowledges/' + App.navBar.model.get('id'),
			method: 'POST',
			data: data
		})
			.then(function(response) {
				App.currentUserKnowledges.push(response);
				App.allMethods.renderPercentComplete();
				this.model.set('methodKnowledge', response);
				this.model.save();
				$('.dot').removeClass('selected');
				if (response.comfort === 0) {
					$('[data-val=0]').addClass('selected');
				} else if (response.comfort === 1) {
					$('[data-val=1]').addClass('selected');
				} else {
					$('[data-val=2]').addClass('selected');
				}
				App.method.index++;
				App.method.model = App.methods.at(App.method.index);
				App.method.render();
			}.bind(this));
	},
	editComfort: function(comfort) {
		var data = {
			comfort: comfort
		}
		$.ajax({
			url: '/knowledges/' + App.navBar.model.get('id') + '/' + App.method.model.get('id'),
			method: 'PUT',
			data: data
		})
			.then(function(response) {
				this.model.set('methodKnowledge', response);
				this.model.save();
				$('.dot').removeClass('selected');
				if (parseInt(response.comfort) === 0) {
					$('[data-val=0]').addClass('selected');
				} else if (parseInt(response.comfort) === 1) {
					$('[data-val=1]').addClass('selected');
				} else {
					$('[data-val=2]').addClass('selected');
				}
				App.method.index++;
				App.method.model = App.methods.at(App.method.index);
				App.method.render();
			}.bind(this));
	},
	events: {
		'click #left': 'goBack',
		'click #right': 'goForward',
		'click #method-name': 'openModal'
	},
	goBack: function() {
		if (App.method.index > 0) {
			App.method.index--;
			App.method.model = App.methods.at(App.method.index);
			App.method.render();
		} else {
			App.method.index = App.methods.length-1;
			App.method.model = App.methods.at(App.method.index);
			App.method.render();
		}
	},
	goForward: function() {
		if (App.method.index === App.methods.length-1) {
			App.method.index = 0;
			App.method.model = App.methods.at(App.method.index);
			App.method.render();
		} else {
			App.method.index++;
			App.method.model = App.methods.at(App.method.index);
			App.method.render();
		}
	},
	openModal: function() {
		App.modal.model = this.model;
		App.modal.render();
	}
});