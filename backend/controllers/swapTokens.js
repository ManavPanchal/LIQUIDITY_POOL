const { sequelize } = require('../models');
const Activities = sequelize.models.Activities;
const swappedTokens = async (req, res) => {
  try {
    const {
      userAddress,
      poolId,
      activity,
      tokenPair,
      amount1,
      amount2,
      networkId,
    } = req.body;
    const addedLiquidity = await Activities.create({
      useraddress: userAddress,
      poolid: poolId,
      activity,
      tokenpair: tokenPair,
      amount1,
      amount2,
      networkid: networkId,
    });
    res.status(200).json({
      message: 'Tokens swapped successfully',
    });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = swappedTokens;
