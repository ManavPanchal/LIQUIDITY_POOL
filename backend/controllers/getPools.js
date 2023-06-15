const { sequelize } = require('../models');
const Pools = sequelize.models.pools;

const getPool = async (req, res) => {
  try {
    const allPools = await Pools.findAll();
    console.log(allPools, '..............');
    res.status(201).json({ allPools });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = getPool;
