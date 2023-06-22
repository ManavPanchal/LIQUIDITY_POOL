const { sequelize } = require('../models');
const Activities = sequelize.models.Activities;
const getActivities = async (req, res) => {
  try {
    const { userAddress, networkId } = req.body;
    const allActivities = await Activities.findAll({
      where: {
        useraddress: userAddress,
        networkid: networkId,
      },
    });
    res.status(201).json({ allActivities });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = getActivities;
