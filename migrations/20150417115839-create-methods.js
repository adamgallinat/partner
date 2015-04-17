"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("methods", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      technology: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Technology field cannot be blank'}
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'Name cannot be blank'}
        }
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {msg: 'Not a valid URL'}
        }
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
    migration.dropTable("methods").done(done);
  }
};