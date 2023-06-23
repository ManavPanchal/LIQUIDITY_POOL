import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ethLogo } from '../../images/images';
import { AppContext } from '../../App';
import TradeCalculations from '../trade-calculation';
import { useAccount } from 'wagmi';
import TokenSelector from '../token-selector';
import { LiquidityPoolABI, pools, tokenABI } from '../../utils/constants';
import { readContract, watchAccount, watchNetwork } from '@wagmi/core';
import ConfirmSwap from '../confirm-transaction';
import { toast } from 'react-toastify';
import { fetchUserTokenBalance } from '../../utils/tokensInstance';

const SwapUI = () => {
  const [tokens, setTokens] = useState({
    token1: {
      isSelected: false,
      balance:0
    },
    token2: {
      isSelected: false,
      balance:0
    },
  });
  const { isConnected, address} = useAccount();
  const { setSliderToggle } = useContext(AppContext);
  const [tokenSelectorToggle, setTokenSelectorToggle] = useState(false);
  const [token1Amount, setToken1Amount] = useState('');
  const [token2Amount, setToken2Amount] = useState('');
  const [isWaitingForCalculation, setCalculationLoading] = useState(false);
  const [confirmswapToggle, setConfirmTransactionToggle] = useState(false);

  const numberRegex = /^\d*\.?\d*$/

  const getTokenBalances = async (address)=>{
    const token1Balance = await fetchUserTokenBalance(tokens.token1?.address, address)
    const token2Balance = await fetchUserTokenBalance(tokens.token2?.address, address)
    setTokens({token1:{...tokens.token1,balance:token1Balance}, token2:{...tokens.token2,balance:token2Balance}})
    setToken1Amount("")
    setToken2Amount("")
  }

  watchNetwork( () => {
    if(tokens.token2?.name && tokens.token1?.name){
      getTokenBalances(address)
    }
  })
  watchAccount( (accountData) => {
    if(tokens.token2?.name && tokens.token1?.name){
      getTokenBalances(accountData.address)
    }
  })

  useEffect(() => {
    async function calculateSwappingToken() {
      try {
        if (tokens.token1?.name && (token1Amount || token2Amount)) {
          const pool = pools.filter((pool) => {
            if (tokens.token1?.address && tokens.token2?.address)
              return (
                (pool.token1Address === tokens.token1?.address &&
                  pool.token2Address === tokens.token2?.address) ||
                (pool.token1Address === tokens.token2?.address &&
                  pool.token2Address === tokens.token1?.address)
              );
            return null;
          });
          let data;
          setCalculationLoading(true);
          pool
            ? (data = await readContract({
                address: process.env.REACT_APP_LIQUIDITY_CONTRACT,
                abi: LiquidityPoolABI,
                functionName: 'calculateSwappingAmount',
                args: [
                  pool[0].id,
                  Number(token1Amount) * 10 ** 18,
                  tokens.token1?.address,
                ],
              }))
            : (data = null);

          pool
            ? setTokens({ ...tokens, pool: { poolId: pool[0].id } })
            : (data = null);

          if (data) {
            setCalculationLoading(false);
            setToken2Amount((Number(data[0]) / 10 ** 18).toFixed(4).toString());
          }
        }
      } catch (error) {
        if(error.toString().includes("Exceeds Min Balance"))
        toast.info('Sorry! Swapping is not possible with entered amount you can try again on less amount', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        console.error(error);
      }
    }
    calculateSwappingToken();
  }, [tokens.token2?.name && tokens.token1?.name && token1Amount]);

  return (
    <div className={`flex justify-center pt-[68px]`}>
      <div className="swap_container max-w-6xl h-fit p-2 rounded-xl bg-uni-dim-white border border-violet-200 w-120">
        <div className="conatainer_header flex justify-between items-center p-3 mb-1">
          <div className="container_navigator flex gap-3 text-center font-medium text-gray-500">
            <span className="text-black font-medium">Swap</span>
            <span>Buy</span>
          </div>
          <button className="setting hover:opacity-70 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sc-1x8ot1t-0 bcMbuY"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
        <div className="mb-1">
          <div className="token_select_section bg-blue-50 p-4 rounded-2xl relative mb-1 flex flex-col gap-2">
            <div className="amount_input_field text-2xl flex gap-2">
              <input
                type="text"
                id="token1"
                className="bg-transparent outline-none text-4xl w-0 flex-1"
                placeholder="0"
                onChange={(e) => numberRegex.test(e.target.value) && setToken1Amount(e.target.value)}
                value={token1Amount}
              />
              <button
                className={`token_selector flex justify-between items-center gap-1 font-semibold text-lg font-Inter-c ${
                  tokens.token1?.name
                    ? 'bg-slate-500 bg-opacity-10'
                    : 'bg-uni-dark-pink text-white'
                } px-3 rounded-3xl box-border`}
                onClick={() => {
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
            <div className="amount_calculator font-mono text-sm">
              <p>{tokens.token1?.balance && tokens.token1?.balance}</p>
            </div>
            <div className="bg-white absolute -bottom-1/4 p-1 right-1/2 rounded-lg ">
              <button
                className="p-2 bg-blue-50 rounded-lg overflow-hidden"
                onClick={() => {
                  if (tokens.token1?.name && tokens.token2?.name)
                    setTokens({
                      token1: { ...tokens.token2 },
                      token2: { ...tokens.token1 },
                    });
                  setToken1Amount(token2Amount);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#98A1C0"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <div className="token_select_section bg-blue-50 p-4 rounded-2xl flex flex-col gap-2">
            <div className="amount_input_field text-2xl flex gap-2">
              <input
                type="text"
                className={`bg-transparent outline-none text-4xl w-0 flex-1 ${
                  isWaitingForCalculation && 'animate-pulse'
                }`}
                placeholder="0"
                onChange={(e) => (numberRegex.test(e.target.value) && setToken2Amount(e.target.value))}
                value={token2Amount}
              />
              <button
                className={`token_selector flex justify-between items-center gap-1 font-semibold text-lg font-Inter-c ${
                  tokens.token2?.name
                    ? 'bg-slate-500 bg-opacity-10'
                    : 'bg-uni-dark-pink text-white'
                } px-3 rounded-3xl box-border`}
                onClick={() => {
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
            <div className="amount_calculator font-mono text-sm">
              {tokens.token2?.balance && tokens.token2?.balance}
            </div>
          </div>
        </div>
        {tokens.token1?.name && tokens.token2?.name && (
          <TradeCalculations
            token1={{ name: tokens.token1?.name, amount: token1Amount }}
            token2={{ name: tokens.token2?.name, amount: token2Amount }}
          />
        )}
        <button
          className={`action_btn mt-[2px] ${
            !isConnected
              ? 'text-uni-dark-pink bg-uni-dark-pink bg-opacity-10'
              : (token1Amount >= tokens.token1?.balance ) ? "text-gray-400 bg-gray-100 " : 'text-uni-dim-white bg-uni-dark-pink'
          } ${
            isWaitingForCalculation && 'animate-pulse'
          }  rounded-2xl text-center text-xl font-semibold w-full`}
        >
          {isConnected ? (
            <p
              className="w-full p-3"
              onClick={() => (token1Amount && tokens.token1?.name && tokens.token2?.name && token1Amount <= tokens.token1?.balance ) && setConfirmTransactionToggle(true)}
            >
              {(tokens.token1?.name && tokens.token2?.name) ? (token1Amount ? (token1Amount > tokens.token1?.balance ? "Insufficient Balance":  "Swap") : "Enter Amount")  : "Select token"  }
            </p>

          ) : (
            <p className="w-full p-3" onClick={() => setSliderToggle(true)}>
              Connect Wallet
            </p>
          )}
        </button>
      </div>
      {tokenSelectorToggle && (
        <TokenSelector
          setTokenSelectorToggle={setTokenSelectorToggle}
          setTokens={setTokens}
          tokens={tokens}
        />
      )}
      {confirmswapToggle && tokens?.pool && (
        <ConfirmSwap
          setConfirmTransactionToggle={setConfirmTransactionToggle}
          tokens={{ ...tokens, token1Amount, token2Amount }}
          from={'SwapUI'}
        />
      )}
    </div>
  );
};

export default SwapUI;
