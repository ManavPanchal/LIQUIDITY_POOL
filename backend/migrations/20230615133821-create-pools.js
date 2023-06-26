'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pools', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      poolid: {
        type: Sequelize.INTEGER,
      },
      tokenpair: {
        type: Sequelize.STRING,
      },
      token1: {
        type: Sequelize.STRING,
      },
      token2: {
        type: Sequelize.STRING,
      },
      lptoken: {
        type: Sequelize.STRING,
      },
      lptsupply: {
        type: Sequelize.DECIMAL,
      },
      networkid: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pools');
  },
};
