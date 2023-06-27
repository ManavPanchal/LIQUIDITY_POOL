import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethLogo } from '../../images/images';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { useAccount } from 'wagmi';
import TokenSelector from '../token-selector';
import { pools, Tokens } from '../../utils/constants';
import { ethers } from 'ethers';
import poolInstance from '../../utils/poolInstance';
import ConfirmInvestment from '../confirm-transaction';
import { fetchUserTokenBalance } from '../../utils/tokensInstance';
import { watchAccount, watchNetwork } from '@wagmi/core';

function AddToPool() {
  const { isConnected, address } = useAccount();
  const [tokens, setTokens] = useState({
    token1: {
      isSelected: false,
    },
    token2: {
      isSelected: false,
    },
  });
  const [tokenSelectorToggle, setTokenSelectorToggle] = useState(false);
  const { setSliderToggle, confirmTransactionFlag, setConfirmTransactionFlag } = useContext(AppContext);
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [ConfirmTransactionToggle, setConfirmTransactionToggle] =  useState(false);
  const numberRegex = /^\d*\.?\d*$/;

  useEffect(()=>{
    setAmount1('');
    setAmount2('');
    setConfirmTransactionFlag(false)
  },[confirmTransactionFlag])


  const getTokenBalances = async (address) => {
    const token1Balance = await fetchUserTokenBalance(
      tokens.token1?.address,
      address,
    );
    const token2Balance = await fetchUserTokenBalance(
      tokens.token2?.address,
      address,
    );
    setTokens({
      token1: { ...tokens.token1, balance: token1Balance },
      token2: { ...tokens.token2, balance: token2Balance },
    });
    setAmount1('');
    setAmount2('');
  };

  watchNetwork((network) => {
    if (tokens.token2?.name && tokens.token1?.name) {
      network.chain && getTokenBalances(address);
    }
  });
  watchAccount( (accountData) => {
    if(!accountData.isConnected){
      setTokens({token1: {isSelected: false,},token2: {isSelected: false,},});
      setAmount1('');
      setAmount2('')
    }
    else if(tokens.token2?.name && tokens.token1?.name){
      getTokenBalances(accountData.address)
    }
  })

  async function tokenPair() {
    const token1Address = Tokens.filter(
      (token) => token.tokenName === tokens?.token1.name,
    ).map((token) => token.tokenAddress);

    const token2Address = Tokens.filter(
      (token) => token.tokenName === tokens?.token2.name,
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
      !tokens.pool && setTokens({ ...tokens, pool: { poolId: poolId[0] } });
      const { contract: poolContract } = await poolInstance();
      console.log(poolId, 'pid');
      console.log(await poolContract.pool(0));
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
      console.log(amount1);
      if (token === 'token1') {
        const amountSent = ethers.utils.parseEther(event.target.value);
        const amountToDisplay = await poolContract.calculateTokenAmount(
          poolId,
          amountSent,
          token1Address[0],
        );

        const formatAmount = ethers.utils.formatEther(amountToDisplay);
        setAmount2(amountToDisplay === '0' ? '' : formatAmount);
      } else {
        const amountSent = ethers.utils.parseEther(event.target.value);
        const amountToDisplay = await poolContract.calculateTokenAmount(
          poolId,
          amountSent,
          token2Address[0],
        );

        const formatAmount = ethers.utils.formatEther(amountToDisplay);

        setAmount1(amountToDisplay === '0' ? '' : formatAmount);
      }
    } catch (error) {}
  }

  return (
    <>
      <div className="flex flex-col  gap-5 bg-white max-w-[420px] rounded-xl m-auto mt-16 p-5 ">
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
                  setAmount1(e.target.value === '0' ? '' : e.target.value);
                calculateTokenAmount('token1', e);
              }}
              value={amount1}
              inputmode="decimal"
              autocomplete="off"
              autocorrect="off"
              type="text"
              pattern="^[0-9]*[.,]?[0-9]*$"
            />
            <button
              className={`token_selector flex grow items-center gap-1 font-medium text-xl ${
                tokens.token1?.name
                  ? 'bg-slate-500 bg-opacity-10'
                  : 'bg-uni-dark-pink text-white'
              } p-1 px-2 rounded-3xl max-w-fit`}
              onClick={async () => {
                setTokenSelectorToggle(true);
                setTokens({
                  ...tokens,
                  token1: { ...tokens.token1, isSelected: true },
                });
              }}
            >
              {tokens.token1?.logo && (
                <img src={ethLogo} alt="" className="w-6" />
              )}
              <span>
                {tokens.token1?.name ? tokens.token1.name : 'Select tokens'}
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
            {tokens.token1?.name ? tokens.token1?.balance : ''}
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
                  setAmount2(e.target.value === '0' ? '' : e.target.value);
                calculateTokenAmount('token2', e);
              }}
              value={amount2}
              inputmode="decimal"
              autocomplete="off"
              autocorrect="off"
              type="text"
              pattern="^[0-9]*[.,]?[0-9]*$"
            />
            <button
              className={`token_selector flex grow items-center gap-1 font-medium text-xl ${
                tokens.token2?.name
                  ? 'bg-slate-500 bg-opacity-10'
                  : 'bg-uni-dark-pink text-white'
              } p-1 px-2 rounded-3xl max-w-fit`}
              onClick={async () => {
                setTokenSelectorToggle(true);
                setTokens({
                  ...tokens,
                  token2: { ...tokens.token2, isSelected: true },
                });
              }}
            >
              {tokens.token2?.logo && (
                <img src={ethLogo} alt="" className="w-6" />
              )}
              <span>
                {tokens.token2?.name ? tokens.token2.name : 'Select tokens'}
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
            {tokens.token2?.name ? tokens.token2?.balance : ''}
          </div>
        </div>
        <button
          disabled={
            isConnected
              ? amount1 &&
                amount2 &&
                amount1 <= tokens.token1.balance &&
                amount2 <= tokens.token2.balance
                ? false
                : true
              : false
          }
          onClick={() => {
            !isConnected && setSliderToggle(true);
            isConnected && setConfirmTransactionToggle(true)
;
          }}
          className={`${
            isConnected
              ? amount1 &&
                amount2 &&
                amount1 <= tokens.token1.balance &&
                amount2 <= tokens.token2.balance
                ? 'text-uni-dark-pink bg-uni-dark-pink bg-opacity-10'
                : 'text-gray-400 bg-gray-100 '
              : 'text-uni-dark-pink bg-uni-dark-pink bg-opacity-10'
          } text-center px-8 py-4 text-xl rounded-2xl font-bold`}
        >
          {isConnected
            ? amount1 > tokens.token1.balance ||
              amount2 > tokens.token2.balance
              ? `Insufficient Balance`
              : `Add Funds`
            : `Connect Wallet`}
        </button>
      </div>
      {tokenSelectorToggle && (
        <TokenSelector
          setTokenSelectorToggle={setTokenSelectorToggle}
          setTokens={setTokens}
          tokens={tokens}
        />
      )}
      {ConfirmTransactionToggle && tokens?.pool && (
        <ConfirmInvestment
          setConfirmTransactionToggle={setConfirmTransactionToggle}
          tokens={{ ...tokens, token1Amount: amount1, token2Amount: amount2 }}
          from={'AddLiquidity'}
        />
      )}
    </>
  );
}

export default AddToPool;
