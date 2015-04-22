var expect = require('chai').expect;
var User = require('../models').users;

describe('User', function() {
	var nullUser,
			invalidUser,
			validUser;

	context('null user', function() {
		beforeEach('build a null user', function() {
			nullUser = User.build();
		});

		it('should validate the presence of first_name', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_fields).to.include('first_name');
					done();
				});
		});

		it('should validate the presence of last_name', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_fields).to.include('last_name');
					done();
				});
		});

		it('should validate the presence of email', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_fields).to.include('email');
					done();
				});
		});

		it('should validate the presence of password', function(done) {
			nullUser
				.validate()
				.then(function(err) {
					var error_fields = err.errors.map(function(error) {
						return error.path;
					});
					expect(error_fields).to.include('password_digest');
					done();
				});
		});
	});

	context('invalid user', function() {
		beforeEach('build an invalid user', function() {
			invalidUser = User.build({
				first_name: '',
				last_name: '',
				email: 'foo',
				password_digest: ''
			});
		});
			
		it('should not allow empty first_name', function(done) {
			invalidUser
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('First Name cannot be blank');
					done();
				});
		});

		it('should not allow non-alpha first_name', function(done) {
			var invalidUser2 = User.build({
				first_name: '123'
			});

			invalidUser2
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('First Name must be letters only');
					done();
				});
		});

		it('should not allow empty last_name', function(done) {
			invalidUser
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Last name cannot be blank');
					done();
				});
		});

		it('should not allow non-alpha last_name', function(done) {
			var invalidUser2 = User.build({
				last_name: '456'
			});

			invalidUser2
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Last name must be letters only');
					done();
				});
		});

		it('should not allow non-email addresses', function(done) {
			invalidUser
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Not a valid email address');
					done();
				});
		});

		it('should not allow empty passwords', function(done) {
			invalidUser
				.validate()
				.then(function(err) {
					var error_messages = err.errors.map(function(error) {
						return error.message;
					});
					expect(error_messages).to.include('Password cannot be empty');
					done();
				});
		});
	});

	context('valid user', function() {
		beforeEach(function() {
			validUser = User.build({
				first_name: 'Adam',
				last_name: 'Gallinat',
				email: 'adam@gallin.at',
				password_digest: '12345678'
			});
		});

		it('should not have errors', function(done) {
			validUser
				.validate()
				.then(function(err) {
					expect(err).to.be.undefined;
					done();
				});
		});

	});
});