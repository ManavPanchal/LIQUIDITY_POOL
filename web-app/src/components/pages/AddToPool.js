import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethLogo } from '../../images/images';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { useAccount } from 'wagmi';
import TokenSelector from '../token-selector';
import { initialTokens, pools, Tokens } from '../../utils/constants';
import { ethers } from 'ethers';
import poolInstance from '../../utils/poolInstance';
import ConfirmInvestment from '../confirm-transaction';
import { fetchUserTokenBalance } from '../../utils/tokensInstance';
import { watchAccount, watchNetwork } from '@wagmi/core';
import useTokens from '../../customHooks/useTokens';

function AddToPool() {
  const { isConnected, address } = useAccount();
  const { token1, token2, setPoolId, resetTokens, pool} = useTokens(initialTokens);
  const [tokenSelectorToggle, setTokenSelectorToggle] = useState(false);
  const { setSliderToggle, confirmTransactionFlag, setConfirmTransactionFlag } =
    useContext(AppContext);
  const [ConfirmTransactionToggle, setConfirmTransactionToggle] =
    useState(false);
  const numberRegex = /^\d*\.?\d*$/;

  useEffect(() => {
    token1.setAmount('');
    token2.setAmount('');
    setConfirmTransactionFlag(false);
    if(token2.name && token1.name){
      getTokenBalances(address)
    }
  }, [confirmTransactionFlag]);

  const getTokenBalances = async (address) => {
    const token1Balance = await fetchUserTokenBalance(
      token1.address,
      address,
    );
    const token2Balance = await fetchUserTokenBalance(
      token2.address,
      address,
    );
    token1.setBalance(token1Balance);
    token2.setBalance(token2Balance);
    token1.setAmount('');
    token2.setAmount('');
  };

  watchNetwork((network) => {
    if (token2.name && token1.name) {
      network.chain && getTokenBalances(address);
    }
  });
  watchAccount((accountData) => {
    if (!accountData.isConnected) {
      resetTokens();
      token1.setAmount('');
      token2.setAmount('');
    } else if (token2.name && token1.name) {
      getTokenBalances(accountData.address);
    }
  });

  async function tokenPair() {
    const token1Address = Tokens.filter(
      (token) => token.tokenName === token1.name,
    ).map((token) => token.tokenAddress);

    const token2Address = Tokens.filter(
      (token) => token.tokenName === token2.name,
    ).map((token) => token.tokenAddress);

    const poolId = pools
      .filter(
        (pool) =>
          (pool.token1Address === token1Address[0] ||
            pool.token2Address === token1Address[0]) &&
          (pool.token2Address === token2Address[0] ||
            pool.token1Address === token2Address[0]),
      )
      .map((pool) => pool.id);

    return { token1Address, token2Address, poolId };
  }

  async function calculateTokenAmount(token, event) {
    try {
      const { poolId, token1Address, token2Address } = await tokenPair();
      !pool && setPoolId(poolId[0]);
      const { contract: poolContract } = await poolInstance();
      let bal1;
      let bal2;
      const poolData = await poolContract.pool(poolId[0]);
      if (
        poolData.token1 === token2Address[0] &&
        poolData.token2 === token1Address[0]
      ) {
        bal1 = poolData.balance2;
        bal2 = poolData.balance1;
      } else {
        bal1 = poolData.balance1;
        bal2 = poolData.balance2;
      }

      const reserve1 = ethers.utils.formatEther(bal1);
      const reserve2 = ethers.utils.formatEther(bal2);
      console.log(reserve1, '.....', reserve2);
      console.log(token1.amount);
      if (token === 'token1') {
        const amountSent = ethers.utils.parseEther(event.target.value);
        const amountToDisplay = await poolContract.calculateTokenAmount(
          poolId,
          amountSent,
          token1Address[0],
        );

        const formatAmount = ethers.utils.formatEther(amountToDisplay);
        token2.setAmount(amountToDisplay === '0' ? '' : formatAmount);
      } else {
        const amountSent = ethers.utils.parseEther(event.target.value);
        const amountToDisplay = await poolContract.calculateTokenAmount(
          poolId,
          amountSent,
          token2Address[0],
        );

        const formatAmount = ethers.utils.formatEther(amountToDisplay);

        token1.setAmount(amountToDisplay === '0' ? '' : formatAmount);
      }
    } catch (error) {}
  }

  return (
    <>
      <div className="flex flex-col  gap-5 bg-white max-w-[420px] rounded-xl m-auto mt-16 p-5 max-xmd:mx-5">
        <div className="flex justify-between items-center">
          <Link className="flex " to="/pools">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7780A0"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="sc-iwajx4-3 ilaylC"
              opacity="0.8"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </Link>
          <div className="m-auto text-xl font-roboto font-medium">
            Add Liquidity
          </div>
          <div className="flex ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="sc-1x8ot1t-0 bcMbuY"
              opacity="0.6"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </div>
        </div>
        <div className="bg-blue-50 flex flex-col p-5 rounded-xl gap-2">
          <div className="amount_input_field text-2xl flex gap-2">
            <input
              id="token1"
              className="bg-transparent outline-none text-4xl w-0 flex-1"
              placeholder="0"
              onChange={(e) => {
                numberRegex.test(e.target.value) &&
                  token1.setAmount(e.target.value === '0' ? '' : e.target.value);
                calculateTokenAmount('token1', e);
              }}
              value={token1.amount}
              inputmode="decimal"
              autocomplete="off"
              autocorrect="off"
              type="text"
              pattern="^[0-9]*[.,]?[0-9]*$"
            />
            <button
              className={`token_selector flex grow items-center gap-1 font-semibold text-lg font-Inter-c ${
                token1.name
                  ? 'bg-slate-500 bg-opacity-10'
                  : 'bg-uni-dark-pink text-white'
              } p-1 px-2 rounded-3xl max-w-fit`}
              onClick={async () => {
                setTokenSelectorToggle(true);
                token1.select();
              }}
            >
              {token1?.logo && (
                <img src={ethLogo} alt="" className="w-6" />
              )}
              <span>
                {token1.name ? token1.name : 'Select tokens'}
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  viewBox="0 -960 960 960"
                  width="18"
                >
                  <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
                </svg>
              </span>
            </button>
          </div>
          <div className="w-fit h-5 text-slate-500">
            {token1.name ? token1.balance : ''}
          </div>
        </div>
        <div className="text-center text-xl font-bold opacity-60">+</div>
        <div className="bg-blue-50 flex flex-col p-5 rounded-xl">
          <div className="amount_input_field text-2xl flex gap-2">
            <input
              id="token2"
              className="bg-transparent outline-none text-4xl w-0 flex-1"
              placeholder="0"
              onChange={(e) => {
                numberRegex.test(e.target.value) &&
                  token2.setAmount(e.target.value === '0' ? '' : e.target.value);
                calculateTokenAmount('token2', e);
              }}
              value={token2.amount}
              inputmode="decimal"
              autocomplete="off"
              autocorrect="off"
              type="text"
              pattern="^[0-9]*[.,]?[0-9]*$"
            />
            <button
              className={`token_selector flex grow items-center gap-1 font-semibold text-lg font-Inter-c ${
                token2.name
                  ? 'bg-slate-500 bg-opacity-10'
                  : 'bg-uni-dark-pink text-white'
              } p-1 px-2 rounded-3xl max-w-fit`}
              onClick={async () => {
                setTokenSelectorToggle(true);
                token2.select();
              }}
            >
              {token2?.logo && (
                <img src={ethLogo} alt="" className="w-6" />
              )}
              <span>
                {token2.name ? token2.name : 'Select tokens'}
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18"
                  viewBox="0 -960 960 960"
                  width="18"
                >
                  <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
                </svg>
              </span>
            </button>
          </div>
          <div className="w-fit h-5 text-slate-500 ">
            {token2.name ? token2.balance : ''}
          </div>
        </div>
        <button
          disabled={
            isConnected
              ? token1.amount &&
                token2.amount &&
                token1.amount <= token1.balance &&
                token2.amount <= token2.balance
                ? false
                : true
              : false
          }
          onClick={() => {
            !isConnected && setSliderToggle(true);
            isConnected && setConfirmTransactionToggle(true);
          }}
          className={`${
            isConnected
              ? token1.amount &&
                token2.amount &&
                token1.amount <= token1.balance &&
                token2.amount <= token2.balance
                ? 'text-uni-dark-pink bg-uni-dark-pink bg-opacity-10'
                : 'text-gray-400 bg-gray-100 '
              : 'text-uni-dark-pink bg-uni-dark-pink bg-opacity-10'
          } text-center px-8 py-4 text-xl rounded-2xl font-bold`}
        >
          {isConnected
            ? token1.amount > token1.balance || token2.amount > token2.balance
              ? `Insufficient Balance`
              : `Add Funds`
            : `Connect Wallet`}
        </button>
      </div>
      {tokenSelectorToggle && (
        <TokenSelector
          setTokenSelectorToggle={setTokenSelectorToggle}
          tokens={{token1, token2}}
        />
      )}
      {ConfirmTransactionToggle && pool && (
        <ConfirmInvestment
          setConfirmTransactionToggle={setConfirmTransactionToggle}
          tokens={{token1, token2, pool}}
          from={'AddLiquidity'}
        />
      )}
    </>
  );
}

export default AddToPool;
