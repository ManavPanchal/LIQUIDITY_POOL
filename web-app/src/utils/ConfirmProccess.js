import { pools, Tokens } from './constants';
import { ethers } from 'ethers';
import lptInstance from './lptInstance';
import poolInstance from './poolInstance';
import SwappingInstance from './swappingInstance';
import tokensInstance from './tokensInstance';
import { toast } from 'react-toastify';

const headers = {
  'Content-Type': 'application/json',
};

export const confirmProccess = async (
  tokens,
  from,
  setAllowanceWaiting,
  setTransactionFlag,
  setConfirmTransactionToggle,
) => {
  try {
    const { contract: poolContract } = await poolInstance();
    if (!(from === 'RemoveLiquidity')) {
      let { contract: token1Contract, signerAddress } = await tokensInstance(
        tokens.token1?.address,
      );
      let token1Allowance = await token1Contract.allowance(
        signerAddress,
        process.env.REACT_APP_LIQUIDITY_CONTRACT,
      );
      if (Number(token1Allowance) / 10 ** 18 < tokens?.token1Amount) {
        const tx = await token1Contract.approve(
          process.env.REACT_APP_LIQUIDITY_CONTRACT,
          ethers.utils.parseEther(tokens?.token1Amount),
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
        if (Number(token2Allowance) / 10 ** 18 < tokens?.token2Amount) {
          const tx = await tokenContract.approve(
            process.env.REACT_APP_LIQUIDITY_CONTRACT,
            ethers.utils.parseEther(tokens?.token2Amount),
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
          Number(token1Allowance) / 10 ** 18 >= tokens?.token1Amount &&
          Number(token2Allowance) / 10 ** 18 >= tokens?.token2Amount
        ) {
          setTransactionFlag(true);
          console.log('...', tokens.pool?.poolId);
          const tx = await poolContract.addLiquidity(
            tokens.pool?.poolId,
            tokens.token1?.address,
            tokens.token2?.address,
            ethers.utils.parseEther(tokens?.token1Amount),
            ethers.utils.parseEther(tokens?.token2Amount),
          );
          await tx.wait();
          const requestBody = {
            userAddress: signerAddress,
            poolId: tokens.pool?.poolId,
            activity: 'Added',
            tokenPair: `${tokens.token1?.name}-${tokens.token2?.name}`,
            amount1: Number(tokens?.token1Amount),
            amount2: Number(tokens?.token2Amount),
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
          setConfirmTransactionToggle(false);
        } else {
          alert('please give sufficient Allowance');
          confirmProccess();
        }
      } else {
        if (Number(token1Allowance) / 10 ** 18 >= tokens?.token1Amount) {
          setTransactionFlag(true);
          await SwappingInstance(tokens);
          setConfirmTransactionToggle(false);
        } else {
          alert('please give sufficient Allowance');
          confirmProccess();
        }
      }
    } else {
      const {
        contract: LPTContract,
        signerAddress,
        networkId,
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
        const reqBody = {
          poolId: tokens.pool?.poolId,
          providedLPT: ethers.utils.parseEther(tokens?.LPTAmount),
          networkId,
        };
        const removableTokensresponse = await fetch('/api/getRemovableTokens', {
          method: 'POST',
          headers,
          body: JSON.stringify(reqBody),
        });
        const removableTokens = await removableTokensresponse.json();
        console.log(removableTokens);
        console.log(removableTokens.withdrawableToken1, 'from apiiiiiiii8');
        console.log(removableTokens.withdrawableToken2, 'from apiiiiiiii8');
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
        setConfirmTransactionToggle(false);
      } else {
        alert('please give sufficient Allowance');
        confirmProccess();
      }
    }
  } catch (error) {
    const errorMessage =
      'cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="execution reverted: Invalid Ratio", method="estimateGas", transaction={...})';
    const regex = /reverted: (.*?)\",/;
    const match = errorMessage.match(regex);

    if (match && match.length > 1) {
      const revertedMessage = match[1];
      toast.error(revertedMessage, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else {
      console.log(error);
    }
    setConfirmTransactionToggle(false);
  }
};
