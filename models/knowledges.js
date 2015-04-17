"use strict";
module.exports = function(sequelize, DataTypes) {
  var knowledges = sequelize.define("knowledges", {
    method_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    comfort: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return knowledges;
};