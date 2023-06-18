import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ethLogo } from '../../images/images';
import { AppContext } from '../../App';
import TradeCalculations from '../trade-calculation';
import { useAccount } from 'wagmi';
import TokenSelector from '../token-selector';
import { LiquidityPoolABI, pools } from '../../utils/constants';
import { readContract } from '@wagmi/core';
import ConfirmSwap from '../confirm-swap';

const SwapUI = () => {
  const [tokens, setTokens] = useState({
    token1: {
      isSelected: false,
    },
    token2: {
      isSelected: false,
    },
  });
  const { isConnected } = useAccount();
  const { setSliderToggle } = useContext(AppContext);
  const [tokenSelectorToggle, setTokenSelectorToggle] = useState(false);
  const [token1Amount, setToken1Amount] = useState("");
  const [token2Amount, setToken2Amount] = useState("");
  const [isWaitingForCalculation, setCalculationLoading] = useState(false);
  const [confirmswapToggle, setConfirmSwapToggle] = useState(false);

  useEffect(()=>{
      async function callPool(){
        try {
          if(tokens.token1?.name && (token1Amount || token2Amount)){
            const pool = pools.filter((pool) => {
              if(tokens.token1?.address && tokens.token2?.address)
                return ((pool.token1Address === tokens.token1?.address && pool.token2Address === tokens.token2?.address) || (pool.token1Address === tokens.token2?.address && pool.token2Address === tokens.token1?.address))
              return null;
            })
            let data
            setCalculationLoading(true)
            pool ? data = await readContract({
              address: process.env.REACT_APP_LIQUIDITY_CONTRACT,
              abi: LiquidityPoolABI,
              functionName: 'calculateTokenAmount',
              args:[pool[0].id,token1Amount,tokens.token1?.address]
            }) : data = null;

          pool
            ? setTokens({ ...tokens, pool: { poolId: pool[0].id } })
            : (data = null);

          if (data) {
            setCalculationLoading(false);
            setToken2Amount((Number(data)/(10**18)).toFixed(4).toString());
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    callPool();
  }, [tokens.token2?.name && (token1Amount || token2Amount)]);

  return (
    <div className={`flex justify-center pt-[68px]`}>
      <div className="swap_container max-w-6xl h-fit px-2 py-1 rounded-xl bg-uni-dim-white border border-violet-200 w-120">
        <div className="conatainer_header flex justify-between items-center p-3 mb-1">
          <div className="container_navigator flex gap-3 text-center font-medium text-gray-500">
            <span className='text-black font-medium'>Swap</span>
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
                onChange={(e) => setToken1Amount(e.target.value)}
                value={token1Amount}
              />
              <button
                className={`token_selector flex grow items-center gap-1 font-medium text-xl ${
                  tokens.token1?.name
                    ? 'bg-slate-500 bg-opacity-10'
                    : 'bg-uni-dark-pink text-white'
                } p-1 px-2 rounded-3xl max-w-fit`}
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                className={`bg-transparent outline-none basis-1/2 text-4xl w-0 flex-1 ${
                  isWaitingForCalculation && 'animate-pulse'
                }`}
                placeholder="0"
                onChange={(e) => setToken2Amount(e.target.value)}
                value={token2Amount}
              />
              <button
                className={`token_selector flex grow items-center gap-1 font-medium text-xl ${
                  tokens.token2?.name
                    ? 'bg-slate-500 bg-opacity-10'
                    : 'bg-uni-dark-pink text-white'
                } p-1 px-2 rounded-3xl max-w-fit`}
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
              ? 'text-uni-dark-pink bg-opacity-10'
              : 'text-uni-dim-white'
          } ${
            isWaitingForCalculation && 'animate-pulse'
          } bg-uni-dark-pink rounded-2xl text-center p-3 text-xl font-semibold w-full`}
        >
          {isConnected ? (
            <>
              {token1Amount ? (
                <p
                  className="w-full"
                  onClick={() => setConfirmSwapToggle(true)}
                >
                  {' '}
                  Swap{' '}
                </p>
              ) : (
                <p> Enter Amount </p>
              )}
            </>
          ) : (
            <p className="w-full" onClick={() => setSliderToggle(true)}>
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
          setConfirmSwapToggle={setConfirmSwapToggle}
          tokens={{ ...tokens, token1Amount, token2Amount }}
        />
      )}
    </div>
  );
};

export default SwapUI;
