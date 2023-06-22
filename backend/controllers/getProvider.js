const { sequelize } = require('../models');
const Providers = sequelize.models.Providers;
const getProvider = async (req, res) => {
  try {
    const { userAddress, networkId } = req.params;
    const allProviderPools = await Providers.findAll({
      where: {
        provideraddress: userAddress,
        networkid: networkId,
      },
    });
    res.status(201).json({ allProviderPools });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = getProvider;
