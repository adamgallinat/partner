"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("knowledges", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      method_id: {
        type: DataTypes.INTEGER,
        unique: 'myComposite',
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        unique: 'myComposite',
        allowNull: false
      },
      comfort: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    migration.dropTable("knowledges").done(done);
  }
};