"use strict";
module.exports = function(sequelize, DataTypes) {
  var methods = sequelize.define("methods", {
    technology: DataTypes.STRING,
    name: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        methods.belongsToMany(models.users, {through: 'knowledges', foreignKey: 'method_id'});
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