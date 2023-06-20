const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');
const hre = require('hardhat');

describe('Liquidity Pool Testing', function () {
  async function deployFixture() {
    const [owner, liquidityProvider, swapUser] = await ethers.getSigners();
    const PoolContract = await hre.ethers.getContractFactory('LiquidityPool');
    const poolInstance = await PoolContract.deploy();

    return {
      owner,
      poolInstance,
      liquidityProvider,
      swapUser,
    };
  }
  describe('checking if is pool owner matches with deployer', function () {
    it('Should be owner Only', async () => {
      const [owner] = await ethers.getSigners();
      console.log('HIIIIIIIIIIIIIIIIIIIIIIIII');
      const { poolInstance } = await deployFixture();
      let poolOwner = owner.address;
      expect(await poolInstance.owner()).to.equal(poolOwner);
    });
  });
  describe('checking if the pool is created by the owner', function () {
    it('User cannot create pool', async () => {
      const { poolInstance, swapUser, liquidityProvider } =
        await deployFixture();
      const token1 = await ethers.deployContract('ERC20TestToken');
      const token2 = await ethers.deployContract('ERC20TestToken');
      const lpt = await ethers.deployContract('ERC20Token', [
        poolInstance.target,
      ]);
      token1.approve(poolInstance.target, 100);
      token2.approve(poolInstance.target, 200);
      await expect(
        poolInstance
          .connect(swapUser)
          .createPool(token1.target, token2.target, 100, 200, lpt.target),
      ).to.be.revertedWith('Only Owner Allowed');
    });
    it('provider cannot create pool', async () => {
      const { poolInstance, liquidityProvider } = await deployFixture();

      const token1 = await ethers.deployContract('ERC20TestToken');
      const token2 = await ethers.deployContract('ERC20TestToken');
      const lpt = await ethers.deployContract('ERC20Token', [
        poolInstance.target,
      ]);
      token1.approve(poolInstance.target, 100);
      token2.approve(poolInstance.target, 200);
      await expect(
        poolInstance
          .connect(liquidityProvider)
          .createPool(token1.target, token2.target, 100, 200, lpt.target),
      ).to.be.revertedWith('Only Owner Allowed');
    });
    it('owner creating pool', async () => {
      const { poolInstance, liquidityProvider } = await deployFixture();

      const token1 = await ethers.deployContract('ERC20TestToken');
      const token2 = await ethers.deployContract('ERC20TestToken');
      const lpt = await ethers.deployContract('ERC20Token', [
        poolInstance.target,
      ]);
      token1.approve(poolInstance.target, 100);
      token2.approve(poolInstance.target, 200);
      await expect(
        poolInstance.createPool(
          token1.target,
          token2.target,
          100,
          200,
          lpt.target,
        ),
      ).to.not.be.reverted;
    });
  });
});
