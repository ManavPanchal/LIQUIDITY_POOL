import { ethers } from "ethers";
import walletInstance from "./walletInstance";
import { LiquidityPoolABI, tokenABI } from "./constants";
import { toast } from "react-toastify";

async function SwappingInstance(tokens) {
  try {
    const { signer } = await walletInstance();
    const contract  = new ethers.Contract(process.env.REACT_APP_LIQUIDITY_CONTRACT, LiquidityPoolABI, signer);
    const tx = await contract.swapTokens(tokens.pool?.poolId,`${(tokens.token1Amount * (10**18))}`, tokens.token1?.address)
    await tx.wait();

  } catch (error) {
    if(error.toString().includes("reverted: Exceeds Min Balance"))
    toast.info('Sorry! Swapping is not possible at this much amount you can try again on less amount', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    else console.log(error);
  }
}

export default SwappingInstance;
