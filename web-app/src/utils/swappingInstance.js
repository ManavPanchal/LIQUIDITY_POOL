import { ethers } from "ethers";
import walletInstance from "./walletInstance";
import { LiquidityPoolABI, tokenABI } from "./constants";

async function SwappingInstance(tokens) {
  try {
    const { signer } = await walletInstance();
    const contract  = new ethers.Contract(process.env.REACT_APP_LIQUIDITY_CONTRACT, LiquidityPoolABI, signer);
    console.log(tokens.pool?.poolId,(tokens.token1Amount * (10**18)), tokens.token1?.address);
    const tx = await contract.swapTokens(tokens.pool?.poolId,`${(tokens.token1Amount * (10**18))}`, tokens.token1?.address)
    await tx.wait();

  } catch (error) {
    console.log(error);
  }
}

export default SwappingInstance;
