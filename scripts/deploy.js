const hre = require('hardhat');

async function main() {
  // Deploying the Liquidity Pool contract
  const poolContract = await ethers.getContractFactory('LiquidityPool');
  const poolContractInstance = await poolContract.deploy();

  // Getting the deployed contract's address
  const poolContractAddress = poolContractInstance.address;

  // Deploying the Lock contract with the other contract's address as an argument
  const LPToken = await ethers.getContractFactory('ERC20Token');
  const lpToken = await LPToken.deploy(poolContractAddress);

  // Waiting for the contract to be mined
  await lpToken.deployed();

  console.log('Lock contract deployed at address:', lpToken.address);
  console.log('Other contract address:', poolContractAddress);
}

// Run the deployment script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
