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
      const { poolInstance } = await loadFixture(deployFixture);
      let poolOwner = owner.address;
      expect(await poolInstance.owner()).to.equal(poolOwner);
    });
  });
  describe('checking if the pool is created by the owner', function () {
    it('User cannot create pool', async () => {
      const { poolInstance, swapUser, liquidityProvider } = await loadFixture(
        deployFixture,
      );
      const token1 = '0x6a1149ea9Cc1812C1282D653D0103AdF9F77eD6d';
      const token2 = '0xeB82Ae2ffbc65A8dbF718C74f7d111a2E2bF193c';
      const lpt = '0xA409D4670D3dfdf78C28BEF41b290c9952B18CE0';
      await expect(
        poolInstance
          .connect(swapUser)
          .createPool(token1, token2, 100, 100, lpt),
      ).to.be.revertedWith('Only Owner Allowed');
    });
    it('provider cannot create pool', async () => {
      const { poolInstance, liquidityProvider } = await loadFixture(
        deployFixture,
      );
      const token1 = '0x6a1149ea9Cc1812C1282D653D0103AdF9F77eD6d';
      const token2 = '0xeB82Ae2ffbc65A8dbF718C74f7d111a2E2bF193c';
      const lpt = '0xA409D4670D3dfdf78C28BEF41b290c9952B18CE0';
      await expect(
        poolInstance
          .connect(liquidityProvider)
          .createPool(token1, token2, 100, 100, lpt),
      ).to.be.revertedWith('Only Owner Allowed');
    });
    it('Pool Owner Able create pool', async () => {
      const { poolInstance, liquidityProvider } = await loadFixture(
        deployFixture,
      );
      const token1 = '0x6a1149ea9Cc1812C1282D653D0103AdF9F77eD6d';
      const token2 = '0xeB82Ae2ffbc65A8dbF718C74f7d111a2E2bF193c';
      const lpt = '0xA409D4670D3dfdf78C28BEF41b290c9952B18CE0';
      await expect(
        poolInstance
          .connect(liquidityProvider)
          .createPool(token1, token2, 100, 100, lpt),
      ).to.be.revertedWith('Only Owner Allowed');
    });
  });
});
