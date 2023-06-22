'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Activities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      useraddress: {
        type: Sequelize.STRING,
      },
      poolid: {
        type: Sequelize.INTEGER,
      },
      activity: {
        type: Sequelize.STRING,
      },
      tokenpair: {
        type: Sequelize.STRING,
      },
      amount1: {
        type: Sequelize.DECIMAL,
      },
      amount2: {
        type: Sequelize.DECIMAL,
      },
      networkid: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Activities');
  },
};
