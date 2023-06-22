'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Providers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      provideraddress: {
        type: Sequelize.STRING,
      },
      poolid: {
        type: Sequelize.INTEGER,
      },
      tokenpair: {
        type: Sequelize.STRING,
      },
      providedamount1: {
        type: Sequelize.DECIMAL,
      },
      providedamount2: {
        type: Sequelize.DECIMAL,
      },
      claimedamount1: {
        type: Sequelize.DECIMAL,
      },
      claimedamount2: {
        type: Sequelize.DECIMAL,
      },
      networkid: {
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Providers');
  },
};
