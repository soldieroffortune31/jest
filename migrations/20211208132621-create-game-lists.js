'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('GameLists', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      game_name: {
        type: Sequelize.STRING
      },
      description_game: {
        type: Sequelize.TEXT
      },
      image_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('GameLists');
  }
};