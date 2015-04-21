App.Views.Modal = Backbone.View.extend({
	id: 'modal',
	el: '#modal',
	initialize: function() {
		console.log('modal created');
		this.template = Handlebars.compile($('#modal-template').html());
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.renderComfort();
		this.$el.show();
	},
	renderComfort: function() {
		if (!this.model.get('methodKnowledge')) {
			$('[data-val=0]').addClass('selected');
		} else {
			if (this.model.get('methodKnowledge').comfort === 0) {
				$('[data-val=0]').addClass('selected');
			} else if (this.model.get('methodKnowledge').comfort === 1) {
				$('[data-val=1]').addClass('selected');
			} else if (this.model.get('methodKnowledge').comfort === 2) {
				$('[data-val=2]').addClass('selected');
			}
		}
		$('.dot').on('click', function() {
			App.modal.setComfort(parseInt($(this).data('val')));
			// App.modal.index++;
			// App.modal.model = App.methods.at(App.modal.index);
			// App.modal.render();
		});
	},
	setComfort: function(comfort) {
		if (!App.modal.model.get('methodKnowledge').createdAt) {
			this.newComfort(comfort);
		} else {
			this.editComfort(comfort);
		}
	},
	newComfort: function(comfort) {
		var data = {
			user_id: App.navBar.model.get('id'),
			method_id: this.model.get('id'),
			comfort: comfort
		}
		$.ajax({
			url: '/knowledges',
			method: 'POST',
			data: data
		})
			.then(function(response) {
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
				App.modal.index++;
				App.modal.model = App.methods.at(App.modal.index);
				App.modal.render();
			}.bind(this));
	},
	editComfort: function(comfort) {
		var data = {
			comfort: comfort
		}
		$.ajax({
			url: '/knowledges/' + App.navBar.model.get('id') + '/' + App.modal.model.get('id'),
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
				App.modal.index++;
				App.modal.model = App.methods.at(App.modal.index);
				App.modal.render();
			}.bind(this));
	}
});