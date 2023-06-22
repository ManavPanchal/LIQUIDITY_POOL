import { pools } from './constants';
import { ethers } from 'ethers';
import lptInstance from './lptInstance';
import poolInstance from './poolInstance';
import SwappingInstance from './swappingInstance';
import tokensInstance from './tokensInstance';
import { toast } from 'react-toastify';
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
          const tx = await poolContract.addLiquidity(
            tokens.pool?.poolId,
            tokens.token1?.address,
            tokens.token2?.address,
            ethers.utils.parseEther(tokens?.token1Amount),
            ethers.utils.parseEther(tokens?.token2Amount),
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
            amount1: Number(tokens?.token1Amount),
            amount2: Number(tokens?.token2Amount),
            networkId,
          };
          console.log(requestBody, '.............');
          const response = await fetch(
            'http://localhost:5000/api/addLiquidity',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            },
          );

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
      const { contract: LPTContract, signerAddress } = await lptInstance(
        pools[tokens.pool?.poolId].LPTAddress,
      );
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
        const tx = await poolContract.removeLiquidity(
          tokens.pool?.poolId,
          ethers.utils.parseEther(tokens?.LPTAmount),
        );
        await tx.wait();

        setConfirmTransactionToggle(false);
      } else {
        alert('please give sufficient Allowance');
        confirmProccess();
      }
    }
  } catch (error) {
    if (!error?.message.includes('user rejected transaction'))
      console.log('inner' + error);
    setConfirmTransactionToggle(false);
  }
};
