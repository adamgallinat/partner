"use strict";
module.exports = function(sequelize, DataTypes) {
  var knowledges = sequelize.define("knowledges", {
    method_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'myComposite'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'myComposite'
    },
    comfort: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return knowledges;
};