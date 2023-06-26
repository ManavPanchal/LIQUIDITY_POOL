require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.18',
  // networks: {
  //   mumbai:{
  //     url: "https://polygon-mumbai.g.alchemy.com/v2/ey1xNY1tJfEF4sBMGDEIJd63y5BwLQ_w",
  //     accounts: [process.env.PRIVATE_KEY_1]
  //   },
  //   sepolia:{
  //     url:process.env.ALCHEMY_URL,
  //     accounts:[process.env.PRIVATE_KEY_1]
  //   }
  // },
  // etherscan: {
  //   apiKey: {
  //     polygonMumbai: 'ZCZDR9SAJSG56ERACAUW86UNPPGG3X4NFU'
  //   }
  // }
};
