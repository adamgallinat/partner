"use strict";
module.exports = function(sequelize, DataTypes) {
  var methods = sequelize.define("methods", {
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
    }
  }, {
    classMethods: {
      associate: function(models) {
        // methods.belongsToMany(models.users, {through: 'knowledges', foreignKey: 'method_id'});
      },
      getAllOfType: function(type) {
        methods.findAll({where: {technology: type}})
          .then(function(responses) {
            return responses;
          });
      },
    }
  });
  return methods;
};