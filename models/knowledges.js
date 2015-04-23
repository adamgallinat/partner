"use strict";
module.exports = function(sequelize, DataTypes) {
  var knowledges = sequelize.define("knowledges", {
    method_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isUniquePair: function(value) {
          // console.log('hello');
          return knowledges.findAll({where: {user_id: value}})
            .then(function(allKnowledges) {
              // console.log(allKnowledges);
              allKnowledges.forEach(function(knowledge) {
                if (knowledge.method_id == this.method_id) {
                  throw new Error('knowledge already exists!');
                }
              }.bind(this));
            }.bind(this));
        }
      }
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