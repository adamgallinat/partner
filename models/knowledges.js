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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg: 'Comfort level must be an integer'},
        min: {
          args: [0],
          msg: 'Comfort level must be >= 0'
        },
        max: {
          args: [2],
          msg: 'Comfort level must be <= 2'
        }
      }
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