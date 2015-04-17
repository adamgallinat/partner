"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
        validate: {
          isAlpha: {msg: 'First Name must be letters only'},
          notEmpty: {msg: 'First Name cannot be blank'}
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
        validate: {
          isAlpha: {msg: 'Last name must be letters only'},
          notEmpty: {msg: 'Last name must be letters only'}
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {msg: 'Not a valid email address'}
        }
      },
      password_digest: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Password cannot be empty'}
        }
      },
      organization_id: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("users").done(done);
  }
};