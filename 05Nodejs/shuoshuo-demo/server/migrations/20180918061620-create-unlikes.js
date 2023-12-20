'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Unlikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
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
      tableName: 'Unlikes',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {
      queryInterface.addIndex('Unlikes', {
        name: 'content_id',
        fields: ['content_id']
      });
    }).then(() => {
      queryInterface.addIndex('Unlikes', {
        name: 'user_id',
        fields: ['user_id']
      });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Unlikes');
  }
};
