'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      content: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      like_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      unlike_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      comment_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      tableName: 'contents',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {
      queryInterface.addIndex('contents', {
        name: 'user_id',
        fields: ['user_id']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contents');
  }
};
