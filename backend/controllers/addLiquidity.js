const { sequelize } = require('../models');
const Activities = sequelize.models.Activities;
const Providers = sequelize.models.Providers;
const addLiquidity = async (req, res) => {
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
    console.log(req.body);
    const addedLiquidity = await Activities.create({
      useraddress: userAddress,
      poolid: poolId,
      activity,
      tokenpair: tokenPair,
      amount1,
      amount2,
      networkid: networkId,
    });
    const provider = await Providers.findOne({
      where: {
        provideraddress: userAddress,
        networkid: networkId,
        poolid: poolId,
      },
    });
    if (!provider) {
      const providedLiquidity = await Providers.create({
        provideraddress: userAddress,
        poolid: poolId,
        tokenpair: tokenPair,
        providedamount1: amount1,
        providedamount2: amount2,
        claimedamount1: 0,
        claimedamount2: 0,
        networkid: networkId,
      });
    } else {
      provider.update({
        providedamount1: Number(provider.providedamount1) + Number(amount1),
        providedamount2: Number(provider.providedamount2) + Number(amount2),
      });
    }
    res.status(200).json({
      message: 'Liquidity added successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ error });
  }
};
module.exports = addLiquidity;
