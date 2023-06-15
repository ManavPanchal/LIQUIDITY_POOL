const { sequelize } = require('../models');
const Pools = sequelize.models.pools;

const createPool = async (req, res) => {
  try {
    const { poolid, tokenpair, token1, token2, lptoken } = req.body;

    const newPool = await Pools.create({
      poolid,
      tokenpair,
      token1,
      token2,
      lptoken,
    });
    console.log(newPool, '..............');
    res.status(201).json({ message: 'New pool created successfully' });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = createPool;
