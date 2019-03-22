'use strict';
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    password: {
      type: Sequelize.CHAR(32),
      allowNull: false
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
    tableName: 'users'
  });
  Users.associate = function(models) {
    // associations can be defined here
    // hasMany : 一对多的关系，一个user对应多个content
    Users.hasMany(models.Contents, {
      foreignKey: 'user_id'
    });

    Users.hasMany(models.Comments, {
      foreignKey: 'user_id'
    });
  };
  return Users;
};