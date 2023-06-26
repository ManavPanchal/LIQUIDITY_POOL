'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pools extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pools.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      poolid: {
        type: DataTypes.INTEGER,
      },
      tokenpair: {
        type: DataTypes.STRING,
      },
      token1: {
        type: DataTypes.STRING,
      },
      token2: {
        type: DataTypes.STRING,
      },
      lptoken: {
        type: DataTypes.STRING,
      },
      lptsupply: {
        type: DataTypes.DECIMAL,
      },
      networkid: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'pools',
      timestamps: false,
    },
  );
  return pools;
};
