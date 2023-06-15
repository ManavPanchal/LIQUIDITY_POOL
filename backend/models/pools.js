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
      poolid: DataTypes.INTEGER,
      tokenpair: DataTypes.STRING,
      token1: DataTypes.STRING,
      token2: DataTypes.STRING,
      lptoken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'pools',
      timestamps: false,
    },
  );
  return pools;
};
