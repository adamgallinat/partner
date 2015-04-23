App.Views.AllMethods = Backbone.View.extend({
	el: '#methods-list',
	initialize: function() {
		console.log('new rate method view created');
	},
	renderAll: function() {
		// $('#methods-list').show();
		$('#methods-page').show();
		$('#all-methods').empty();
		$('#completion').show();
		this.collection.each(this.renderOne, this);
		this.renderPercentComplete();
		$('#all-methods').css('display', 'inline-block');
	},
	renderOne: function(method) {
		var newMethodView = new App.Views.ListMethod({model: method});
		$('#all-methods').append(newMethodView.el);
	},
	renderPercentComplete: function() {
		var percentComplete = Math.floor((App.currentUserKnowledges.length / this.collection.length) * 100);
		$('#completion').empty;
		$('#completion').html(percentComplete + '% complete');
		if (percentComplete === 100) {
			$('#completion').append($('<button id="compare">Find a Partner!</button>'))
		}
	},
	events: {
		'click #compare' : 'renderPartners'
	},
	renderPartners: function() {
		App.clearDisplay();
		App.partnerList.getKnowledges();
	}
});