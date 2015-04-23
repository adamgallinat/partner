var expect = require('chai').expect,
		Method = require('../models').methods;

describe('Method model', function() {
	var nullMethod, invalidMethod, validMethod;

	context('null method', function() {
		beforeEach(function() {
			nullMethod = Method.build();
		});

		it('should validate the presence of technology', function(done) {
			nullMethod
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_fields).to.include('technology');
					done();
				});
		});

		it('should validate the presence of name', function(done) {
			nullMethod
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_fields).to.include('name');
					done();
				});
		});

		it('should validate the presernce of url', function(done) {
			nullMethod
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_fields).to.include('url');
					done();
				});
		});
	});

	context('invalid method', function() {
		beforeEach(function() {
			invalidMethod = Method.build({
				technology: '',
				name: '',
				url: 'abc123'
			});
		});

		it('should not allow empty technology', function(done) {
			invalidMethod
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Technology field cannot be blank');
					done();
				});
		});

		it('should not allow empty name', function(done) {
			invalidMethod
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Name cannot be blank');
					done();
				});
		});

		it('should not allow invalid looking URLs', function(done) {
			invalidMethod
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Not a valid URL');
					done();
				});
		});
	});

	context('valid method', function() {
		beforeEach(function() {
			validMethod = Method.build({
				technology: 'Javascript',
				name: '.innerHTML',
				url: 'http://www.javascript.com'
			});
		});

		it('should not return any errors', function() {
			validMethod
				.validate()
				.then(function(err) {
					expect(err).to.be.undefined;
				});
		});
	})
});