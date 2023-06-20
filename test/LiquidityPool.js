const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("Liquidity Pool Testing", function () {
  async function deployFixture() {
    const [owner, liquidityProvider, swapUser] = await ethers.getSigners();
    const PoolContract = await hre.ethers.getContractFactory("LiquidityPool");
    const poolInstance = await PoolContract.deploy();

    return {
      owner,
      poolInstance,
      liquidityProvider,
      swapUser,
    };
  }
  describe("checking if is pool owner matches with deployer", function () {
    it("Should be owner Only", async () => {
      const [owner] = await ethers.getSigners();
      const { poolInstance } = await deployFixture();
      let poolOwner = owner.address;
      expect(await poolInstance.owner()).to.equal(poolOwner);
    });
  });

  let token1, token2, lpt;
  let owner, poolInstance, liquidityProvider, swapUser;
  beforeEach(async () => {
    ({ owner, poolInstance, liquidityProvider, swapUser } = await deployFixture());
    token1 = await ethers.deployContract("ERC20TestToken");
    token2 = await ethers.deployContract("ERC20TestToken");
    lpt = await ethers.deployContract("ERC20Token", [
      poolInstance.target,
    ]);
    await token1.approve(poolInstance.target, ethers.parseEther("1000"));
    await token2.approve(poolInstance.target, ethers.parseEther("1000"));
  });

  describe("checking if the pool is created by the owner", function () {

    it("User cannot create pool", async () => {
      await expect(
        poolInstance
          .connect(swapUser)
          .createPool(token1.target, token2.target, ethers.parseEther("100"), ethers.parseEther("200"), lpt.target)
      ).to.be.revertedWith("Only Owner Allowed");
    });
    it("provider cannot create pool", async () => {
      await expect(
        poolInstance
          .connect(liquidityProvider)
          .createPool(token1.target, token2.target, ethers.parseEther("100"), ethers.parseEther("200"), lpt.target)
      ).to.be.revertedWith("Only Owner Allowed");
    });
    it("owner creating pool", async () => {
      await expect(
        poolInstance.createPool(
          token1.target,
          token2.target,
          ethers.parseEther("100"),
          ethers.parseEther("200"),
          lpt.target
        )
      ).to.not.be.reverted;
    });
  });

  describe("testing add liquidity function",()=>{
    beforeEach(async()=>{
      await poolInstance.createPool(token1.target, token2.target, ethers.parseEther("100"), ethers.parseEther("200"), lpt.target)
    });
    it("provider should have enough amount", async () =>{
      await expect(
        poolInstance
        .connect(liquidityProvider)
        .addLiquidity(
          0,
          ethers.parseEther("100"),
          ethers.parseEther("200"),
        )
      ).to.be.revertedWith("Insufficient Balance");
    })

    it("should update the pool tokens balance", async()=>{
      let pool = await poolInstance.pool(0);
      await poolInstance.addLiquidity(0, ethers.parseEther("100"), ethers.parseEther("200"))
      const updatedPool = await poolInstance.pool(0);
      expect(updatedPool[2]).to.be.eq(pool[2]+ ethers.parseEther("100"))
      expect(updatedPool[3]).to.be.eq(pool[3]+ ethers.parseEther("200"))
    })

    it("should mint new LPT tokens for provider", async()=>{
      const totalSupply = await lpt.totalSupply();
      const balance = await lpt.balanceOf(owner.address);
      await poolInstance.addLiquidity(0, ethers.parseEther("100"), ethers.parseEther("200"))
      expect(await lpt.totalSupply()).to.be.greaterThan(totalSupply);
      expect(await lpt.balanceOf(owner.address)).to.be.greaterThan(balance);
    })
  })

  describe("testing swapping function", ()=>{

    beforeEach(async()=>{
      await poolInstance.createPool(token1.target, token2.target, ethers.parseEther("100"), ethers.parseEther("200"), lpt.target)
    });

    it("should revert on invalid pool or token", async () => {
      const token3 = await ethers.deployContract("ERC20TestToken")
      await expect( poolInstance.swapTokens(0,ethers.parseEther("10"), token3.target)).to.be.revertedWith("invalid pool id or token address");
    })

    it("should revert if pool is at it's min balance limit", async()=>{
      await expect( poolInstance.swapTokens(0,ethers.parseEther("10"), token2.target)).to.be.revertedWith("Exceeds Min Balance");
    })

    it("should transfer expected value to user", async()=>{
      await poolInstance.addLiquidity(0, ethers.parseEther("100"), ethers.parseEther("200"))
      await token1.transfer(liquidityProvider.address, ethers.parseEther("100"));
      const expectedAmount = await poolInstance.calculateSwappingAmount(0, ethers.parseEther("10"), token1.target);
      const token2Balance = await token2.balanceOf(liquidityProvider.address);
      await token1.connect(liquidityProvider).approve(poolInstance.target, ethers.parseEther("10"))
      await poolInstance.connect(liquidityProvider).swapTokens(0, ethers.parseEther("10"),token1.target);
      const updatedBalance = await token2.balanceOf(liquidityProvider.address);
      expect(ethers.formatEther(updatedBalance)).to.be.eq(ethers.formatEther(token2Balance + expectedAmount))
    })

  })

  describe("testing remove liquidity function",()=>{
    beforeEach(async()=>{
      await poolInstance.createPool(token1.target, token2.target, ethers.parseEther("100"), ethers.parseEther("200"), lpt.target)
    });

    it("should revert on insufficient amount od LPT",async()=>{
      await expect(poolInstance.connect(liquidityProvider).removeLiquidity(0,ethers.parseEther("10"))).to.be.revertedWith("Insufficient LPT")
    })

    it("should burn LPT on removing liquidity", async()=>{
      const totalSupply = await lpt.totalSupply();
      await lpt.approve(poolInstance.target, ethers.parseEther("10"))
      await poolInstance.removeLiquidity(0,ethers.parseEther("10"));
      expect(await lpt.totalSupply()).to.be.equal(totalSupply - ethers.parseEther("10"));
    })

    it("should update the balance of user on remove liquidity", async()=>{
      const userLPTbalance = await lpt.balanceOf(owner.address);
      await lpt.approve(poolInstance.target, ethers.parseEther("10"))
      await poolInstance.removeLiquidity(0,ethers.parseEther("10"));
      expect(await lpt.balanceOf(owner.address)).to.be.equal(userLPTbalance - ethers.parseEther("10"));
    })

  })
});
