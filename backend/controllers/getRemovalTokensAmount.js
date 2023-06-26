const { ethers } = require('ethers');
const { LiquidityPoolABI } = require('../constants/poolAbi');
require('dotenv').config();
const calculateRemovableTokens = async (req, res) => {
  try {
    let provider;
    const { poolId, providedLPT, networkId } = req.body;
    if (networkId === 11155111) {
      provider = new ethers.providers.JsonRpcProvider(
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_SEPOLIA_API}`,
      );
    } else {
      provider = new ethers.providers.JsonRpcProvider(
        `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_API}`,
      );
    }

    const contract = new ethers.Contract(
      process.env.POOL_CONTRACT,
      LiquidityPoolABI,
      provider,
    );
    const pool = await contract.pool(poolId);
    const LPTSupplyOfPool = ethers.utils.formatEther(pool.LPTsupply);
    const reserve1 = ethers.utils.formatEther(pool.balance1);
    const reserve2 = ethers.utils.formatEther(pool.balance2);
    const LPTSupplied = ethers.utils.formatEther(providedLPT);
    const withdrawableToken1 =
      (parseFloat(LPTSupplied) * parseFloat(reserve1)) /
      parseFloat(LPTSupplyOfPool);
    const withdrawableToken2 =
      (parseFloat(LPTSupplied) * parseFloat(reserve2)) /
      parseFloat(LPTSupplyOfPool);

    console.log(withdrawableToken1);
    res.status(200).json({ withdrawableToken1, withdrawableToken2 });
  } catch (error) {
    console.log('Err at calculation of withdrwable tokens', error);
  }
};
module.exports = calculateRemovableTokens;
