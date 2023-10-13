import { getNetwork } from "@wagmi/core";
import { LiquidityPoolABI } from "./constants";
import {contract} from "../contract-interaction/ethers"

async function SwappingInstance(tokens, signerAddress) {
    const {id: networkId} = getNetwork()?.chain
    const swappingContract = contract(process.env.REACT_APP_LIQUIDITY_CONTRACT, LiquidityPoolABI)
    await swappingContract.write("swapTokens",[tokens.pool?.poolId,`${(tokens.token1.amount * (10**18))}`, tokens.token1?.address])
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
