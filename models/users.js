"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {msg: 'First Name must be letters only'},
        notEmpty: {msg: 'First Name cannot be blank'}
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {msg: 'Last name must be letters only'},
        notEmpty: {msg: 'Last name cannot be blank'}
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
    }
  }, {
    classMethods: {
      associate: function(models) {
        // users.belongsToMany(models.methods, {through: 'knowledges', foreignKey: 'user_id'});
      }
    }
  });
  return users;
};