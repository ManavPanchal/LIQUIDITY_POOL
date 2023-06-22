const { sequelize } = require('../models');
const Activities = sequelize.models.Activities;
const Providers = sequelize.models.Providers;

const removeLiquidity = async (req, res) => {
  try {
    const {
      userAddress,
      poolId,
      activity,
      tokenPair,
      amount1,
      amount2,
      newtworkId,
    } = req.body;
    const removedLiquidity = await Activities.create({
      useraddress: userAddress,
      poolid: poolId,
      activity,
      tokenpair: tokenPair,
      amount1,
      amount2,
      networkid: newtworkId,
    });
    const provider = await Providers.findOne({
      where: {
        provideraddress: userAddress,
        networkid: newtworkId,
        poolid: poolId,
      },
    });
    if (provider) {
      provider.update({
        claimedamount1: Number(provider.claimedamount1) + Number(amount1),
        claimedamount2: Number(provider.claimedamount2) + Number(amount2),
      });
    } else {
      res.status(422).json({ message: 'You have not added funds' });
    }
    res.status(200).json({
      message: 'Liquidity removed successfully',
    });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = removeLiquidity;
