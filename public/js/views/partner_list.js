App.Views.PartnerList = Backbone.View.extend({
	el: '#partner-list',
	initialize: function() {
		console.log('new partner list rendered!');
	},
	getKnowledges: function() {
		var methodList = App.methods.map(function(method) {
			return method.get('id');
		});
		var request = 'methodList=' + methodList.join(',');
		$.ajax({
			url: '/knowledges/of_methods',
			method: 'GET',
			data: request
		})
			.done(function(data) {
				this.compileKnowledges(data);
			}.bind(this));
	},
	compileKnowledges: function(data) {
		var technologySize = App.allMethods.collection.length;
		var userRankings = [];
		var myData = _.filter(data, function(item) {
			return item.user_id === App.navBar.model.get('id');
		});
		var otherData = _.filter(data, function(item) {
			return item.user_id !== App.navBar.model.get('id');
		});

		otherData.forEach(function(knowledge) {
			var userId = knowledge.user_id;
		 	userIndex = _.findIndex(userRankings, {userId: userId});
		 	if (userIndex === -1) {
		 		userRankings.push({
		 			userId: userId,
		 			skill: 0
		 		});
		 		userIndex = userRankings.length-1;
			}
			myIndex = _.findIndex(myData, {method_id: knowledge.method_id});
			myComfort = myData[myIndex].comfort;
			theirComfort = knowledge.comfort;

			if (myComfort > theirComfort) {
				userRankings[userIndex].skill += ((myComfort / 2) / technologySize);
			} else {
				userRankings[userIndex].skill += ((theirComfort / 2) / technologySize);
			}
		});

		userRankings = _.sortBy(userRankings, 'skill');
		userRankings.reverse();
		this.renderAll(userRankings);
	},
	renderAll: function(userRankings) {
		userRankings.forEach(function(user) {
			$.get('/users/' + user.userId)
				.done(function(response) {
					user.firstName = response.first_name;
					user.email = response.email;
					user.skill = Math.round(user.skill * 100);
					this.renderOne(user);
				}.bind(this));
		}.bind(this));
	},
	renderOne: function(user) {
		var newModel = new App.Views.Partner({model: user});
		this.$el.append(newModel.el);
	}
});