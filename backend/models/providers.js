'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Providers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Providers.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      provideraddress: {
        type: DataTypes.STRING,
      },
      poolid: {
        type: DataTypes.INTEGER,
      },
      tokenpair: {
        type: DataTypes.STRING,
      },
      providedamount1: {
        type: DataTypes.DECIMAL,
      },
      providedamount2: {
        type: DataTypes.DECIMAL,
      },
      claimedamount1: {
        type: DataTypes.DECIMAL,
      },
      claimedamount2: {
        type: DataTypes.DECIMAL,
      },
      networkid: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Providers',
      timestamps: false,
    },
  );
  return Providers;
};
