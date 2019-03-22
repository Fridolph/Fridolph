'use strict';
module.exports = (sequelize, Sequelize) => {
  const Likes = sequelize.define('Likes', {
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
    tableName: 'likes',
    timestamps: true
  });
  Likes.associate = function(models) {
    // associations can be defined here

    Likes.belongsTo(models.Contents, {
      foreignKey: 'content_id'
    });

    Likes.belongsTo(models.Users, {
      foreignKey: 'user_id'
    });
  };
  return Likes;
};