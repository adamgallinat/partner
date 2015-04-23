var expect = require('chai').expect,
		Knowledge = require('../models').knowledges;

describe('Knowledge model', function() {
	var nullKnowledge, invalidKnowledge, validKnowledge;
	context('null knowledge', function() {
		beforeEach(function() {
			nullKnowledge = Knowledge.build();
		});

		it('should validate the presence of method_id', function() {
			nullKnowledge
				.validate()
				.then(function(err) {
					var error_paths = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_paths).to.include('method_id');
				});
		});

		it('should validate the presence of user_id', function() {
			nullKnowledge
				.validate()
				.then(function(err) {
					var error_paths = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_paths).to.include('user_id');
				});
		});

		it('should validate the presence of comfort', function() {
			nullKnowledge
				.validate()
				.then(function(err) {
					var error_paths = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_paths).to.include('comfort');
				});
		});
	});

	context('invalid knowledge', function() {
		beforeEach(function() {
			invalidKnowledge = Knowledge.build({
				method_id: 1,
				user_id: 1,
				comfort: 'foo'
			});
		});

		it('should not allow nonInt comfort', function() {
			invalidKnowledge
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Comfort level must be an integer');
				});
		});

		it('should not allow comfort below 0', function() {
			var invalidKnowledge2 = Knowledge.build({
				method_id: 1,
				user_id: 1,
				comfort: -1
			});

			invalidKnowledge2
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Comfort level must be >= 0');
				});
		});

		it('should not allow comfort above 2', function() {
			var invalidKnowledge2 = Knowledge.build({
				method_id: 1,
				user_id: 1,
				comfort: 3
			});

			invalidKnowledge2
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Comfort level must be <= 2');
				});
		});
	});

	context('valid knowledge', function() {
		beforeEach(function() {
			validKnowledge = Knowledge.build({
				method_id: 1,
				user_id: 1,
				comfort: 1
			});
		});

		it('should not return errors', function() {
			validKnowledge
				.validate()
				.then(function(err) {
					expect(err).to.be.undefined;
				});
		});

	});
});