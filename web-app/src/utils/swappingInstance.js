import { ethers } from "ethers";
import walletInstance from "./walletInstance";
import { LiquidityPoolABI } from "./constants";
import { toast } from "react-toastify";

async function SwappingInstance(tokens) {
    const { signer, signerAddress, networkId } = await walletInstance();
    const contract  = new ethers.Contract(process.env.REACT_APP_LIQUIDITY_CONTRACT, LiquidityPoolABI, signer);
    const tx = await contract.swapTokens(tokens.pool?.poolId,`${(tokens.token1.amount * (10**18))}`, tokens.token1?.address)
    await tx.wait();
    await fetch('/api/swapTokens', {
      method: 'POST',
      body: JSON.stringify({
        userAddress: signerAddress,
        poolId: tokens.pool?.poolId,
        activity: 'Swapped',
        tokenPair: `${tokens.token1?.name}-${tokens.token2?.name}`,
        amount1: tokens.token1?.amount,
        amount2: tokens.token2?.amount,
        networkId,
      }),
      headers : {
        'Content-Type': 'application/json',
      }
    })

}

export default SwappingInstance;
