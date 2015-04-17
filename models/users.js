"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password_digest: DataTypes.STRING,
    organization_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.methods, {through: 'knowledges', foreignKey: 'user_id'});
      }
    }
  });
  return users;
};