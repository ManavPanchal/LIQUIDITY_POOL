import { pools } from "./constants";
import { ethers } from "ethers";
import lptInstance from "./lptInstance";
import poolInstance from "./poolInstance";
import SwappingInstance from "./swappingInstance";
import tokensInstance from "./tokensInstance";
import { toast } from "react-toastify";

const headers = {
  'Content-Type': 'application/json',
};

const generateToast = (message)=>{
  toast.info(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

const generateConfirmationToast = (message)=>{
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}

const generateErrorToast = (message) =>{
  toast.error(message ,{
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })
}

export const confirmProccess = async (
  tokens,
  from,
  setAllowanceWaiting,
  setTransactionFlag,
  setConfirmTransactionToggle,
  setConfirmTransactionFlag
) => {
  try {
    console.log(tokens);
    console.log(ethers.utils.formatEther(ethers.utils.parseEther(tokens?.token1.amount)));
    const { contract: poolContract } = await poolInstance();
    if (!(from === 'RemoveLiquidity')) {
      let { contract: token1Contract, signerAddress } = await tokensInstance(
        tokens.token1?.address,
      );
      let token1Allowance = await token1Contract.allowance(
        signerAddress,
        process.env.REACT_APP_LIQUIDITY_CONTRACT,
      );
      if (Number(token1Allowance) / 10 ** 18 < tokens?.token1.amount) {
        const tx = await token1Contract.approve(
          process.env.REACT_APP_LIQUIDITY_CONTRACT,
          ethers.utils.parseEther(tokens?.token1.amount),
        );
        setAllowanceWaiting(true);
        await tx.wait();
        setAllowanceWaiting(false);
        token1Allowance = await token1Contract.allowance(
          signerAddress,
          process.env.REACT_APP_LIQUIDITY_CONTRACT,
        );
      }
      if (from === 'AddLiquidity') {
        const {
          contract: tokenContract,
          signerAddress,
          networkId,
        } = await tokensInstance(tokens.token2?.address);
        console.log();
        let token2Allowance = await tokenContract.allowance(
          signerAddress,
          process.env.REACT_APP_LIQUIDITY_CONTRACT,
        );
        if (Number(token2Allowance) / 10 ** 18 < tokens?.token2.amount) {
          const tx = await tokenContract.approve(
            process.env.REACT_APP_LIQUIDITY_CONTRACT,
            ethers.utils.parseEther(tokens?.token2.amount),
          );
          setAllowanceWaiting(true);
          await tx.wait();
          setAllowanceWaiting(false);
          token2Allowance = await tokenContract.allowance(
            signerAddress,
            process.env.REACT_APP_LIQUIDITY_CONTRACT,
          );
        }
        if (
          Number(token1Allowance) / 10 ** 18 >= tokens?.token1.amount &&
          Number(token2Allowance) / 10 ** 18 >= tokens?.token2.amount
        ) {
          setTransactionFlag(true);
          console.log('...', tokens.pool?.poolId);
          const tx = await poolContract.addLiquidity(
            tokens.pool?.poolId,
            tokens.token1?.address,
            tokens.token2?.address,
            ethers.utils.parseEther(tokens?.token1.amount),
            ethers.utils.parseEther(tokens?.token2.amount),
          );
          await tx.wait();
          const currentTokenPair = pools.filter(
            (pool) => pool.id === tokens.pool?.poolId,
          );
          const requestBody = {
            userAddress: signerAddress,
            poolId: tokens.pool?.poolId,
            activity: 'Added',
            tokenPair: currentTokenPair[0].tokenPair,
            amount1: Number(tokens?.token1.amount),
            amount2: Number(tokens?.token2.amount),
            networkId,
          };
          console.log(requestBody, '.............');
          const response = await fetch('/api/addLiquidity', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers,
          });

          if (response.status === 200) {
            console.log('success');
          }
          setConfirmTransactionFlag(true);
          generateConfirmationToast("Liquidity Added")
        } else {
          generateToast('please give sufficient Allowance')
        }
      } else {
        if (Number(token1Allowance) / 10 ** 18 >= tokens?.token1.amount) {
          setTransactionFlag(true);
          await SwappingInstance(tokens);
          generateConfirmationToast("Swapped succesfully")
          setConfirmTransactionFlag(true);
        } else {
          generateToast('please give sufficient Allowance')
        }
      }
      setConfirmTransactionToggle(false);
    } else {
      const {
        contract: LPTContract,
        signerAddress,
        networkId
      } = await lptInstance(pools[tokens.pool?.poolId].LPTAddress);
      let LPTAllowance = await LPTContract.allowance(
        signerAddress,
        process.env.REACT_APP_LIQUIDITY_CONTRACT,
      );
      if (Number(LPTAllowance) / 10 ** 18 < tokens?.LPTAmount) {
        const tx = await LPTContract.approve(
          process.env.REACT_APP_LIQUIDITY_CONTRACT,
          ethers.utils.parseEther(tokens?.LPTAmount),
        );
        setAllowanceWaiting(true);
        await tx.wait();
        setAllowanceWaiting(false);
        LPTAllowance = await LPTContract.allowance(
          signerAddress,
          process.env.REACT_APP_LIQUIDITY_CONTRACT,
        );
      }
      if (Number(LPTAllowance) / 10 ** 18 >= tokens?.LPTAmount) {
        setTransactionFlag(true);
        async function checkClaimedAmount() {
          const providerDetails = await poolContract.providerDetails(
            tokens.pool?.poolId,
            signerAddress,
          );
          const currentClaimed1 = ethers.utils.formatUnits(
            providerDetails.claimedBalance1,
          );
          const currentClaimed2 = ethers.utils.formatUnits(
            providerDetails.claimedBalance2,
          );
          console.log(currentClaimed1, '....1', currentClaimed2, '.....2');
          return { currentClaimed1, currentClaimed2 };
        }
        const { currentClaimed1, currentClaimed2 } = await checkClaimedAmount();
        const tx = await poolContract.removeLiquidity(
          tokens.pool?.poolId,
          ethers.utils.parseEther(tokens?.LPTAmount),
        );
        await tx.wait();
        const {
          currentClaimed1: updatedClaimed1,
          currentClaimed2: updatedClaimed2,
        } = await checkClaimedAmount();
        console.log(updatedClaimed1, '....1', updatedClaimed2, '.....2');
        const currentTokenPair = pools.filter(
          (pool) => pool.id === tokens.pool?.poolId,
        );
        const requestBody = {
          userAddress: signerAddress,
          poolId: tokens.pool?.poolId,
          activity: 'Removed',
          tokenPair: currentTokenPair[0].tokenPair,
          amount1: Number((updatedClaimed1 - currentClaimed1).toFixed(18)),
          amount2: Number((updatedClaimed2 - currentClaimed2).toFixed(18)),
          networkId,
        };
        console.log(requestBody, '.............');
        const response = await fetch('/api/removeLiquidity', {
          method: 'POST',
          headers,
          body: JSON.stringify(requestBody),
        });
        if (response.status === 200) {
          console.log('success');
        }
        generateConfirmationToast("Liquidity Removed")
        setConfirmTransactionFlag(true);
      } else {
        generateToast('please give sufficient Allowance')
      }
      setConfirmTransactionToggle(false);
    }
  } catch (error) {
    const regex = /reverted: (.*?)\",/;
    const match = error.message.match(regex);
    if (match && match.length > 1) {
      const revertedMessage = match[1];
      generateErrorToast(revertedMessage);
    }
    else if(error.message.includes("user rejected transaction"))
      generateErrorToast("user rejected the transaction")
    else
      console.log(error);
    setConfirmTransactionToggle(false);
  }
};
