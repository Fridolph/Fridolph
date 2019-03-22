'use strict';
module.exports = (sequelize, Sequelize) => {
  const Unlinkes = sequelize.define('Unlikes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    content_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Contents",
        key: 'id'
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    tableName: 'Unlikes',
    timestamps: true
  });
  Unlinkes.associate = function(models) {
    // associations can be defined here

    Unlinkes.belongsTo(models.Contents, {
      foreignKey: 'content_id'
    });

    Unlinkes.belongsTo(models.Users, {
      foreignKey: 'user_id'
    });
  };
  return Unlinkes;
};
