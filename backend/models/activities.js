'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Activities.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      useraddress: {
        type: DataTypes.STRING,
      },
      poolid: {
        type: DataTypes.INTEGER,
      },
      activity: {
        type: DataTypes.STRING,
      },
      tokenpair: {
        type: DataTypes.STRING,
      },
      amount1: {
        type: DataTypes.DECIMAL,
      },
      amount2: {
        type: DataTypes.DECIMAL,
      },
      networkid: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Activities',
    },
  );
  return Activities;
};
