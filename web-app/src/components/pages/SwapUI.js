import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ethLogo } from '../../images/images';
import { AppContext } from '../../App';
import TradeCalculations from '../trade-calculation';
import { useAccount } from 'wagmi';
import TokenSelector from '../token-selector';
import { initialTokens, LiquidityPoolABI, pools } from '../../utils/constants';
import { readContract, watchAccount, watchNetwork } from '@wagmi/core';
import ConfirmSwap from '../confirm-transaction';
import { toast } from 'react-toastify';
import { fetchUserTokenBalance } from '../../utils/tokensInstance';
import useTokens from '../../customHooks/useTokens';

const SwapUI = () => {

  const { token1, token2, setPoolId, resetTokens, swapPair, pool} = useTokens(initialTokens);
  const { isConnected, address} = useAccount();
  const { setSliderToggle, confirmTransactionFlag, setConfirmTransactionFlag } = useContext(AppContext);
  const [tokenSelectorToggle, setTokenSelectorToggle] = useState(false);
  const [isWaitingForCalculation, setCalculationLoading] = useState(false);
  const [confirmswapToggle, setConfirmTransactionToggle] = useState(false);

  useEffect(()=>{
    token1.setAmount('');
    token2.setAmount('');
    confirmTransactionFlag && setConfirmTransactionFlag(false);
    if(token2.name && token1.name){
      getTokenBalances(address)
    }
  },[confirmTransactionFlag])

  const numberRegex = /^\d*\.?\d*$/

  const getTokenBalances = async (address)=>{
    const token1Balance = await fetchUserTokenBalance(token1?.address, address)
    const token2Balance = await fetchUserTokenBalance(token2?.address, address)
    token1.setBalance(token1Balance);
    token2.setBalance(token2Balance)
    token1.setAmount("")
    token2.setAmount("")
  }

  watchNetwork( () => {
    if(token2.name && token1.name){
      getTokenBalances(address)
    }
  })
  watchAccount( (accountData) => {
    if(!accountData.isConnected){
      resetTokens();
      token1.setAmount('');
      token2.setAmount('')
    }
    else if(token2.name && token1.name){
      getTokenBalances(accountData.address)
    }
  })

  useEffect(() => {
    async function calculateSwappingToken() {
      try {
        if (token1.name && (token1.amount || token2.amount)) {
          const pool = pools.filter((pool) => {
            if (token1?.address && token2?.address)
              return (
                (pool.token1Address === token1?.address &&
                  pool.token2Address === token2?.address) ||
                (pool.token1Address === token2?.address &&
                  pool.token2Address === token1?.address)
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
                  Number(token1.amount) * 10 ** 18,
                  token1?.address,
                ],
              }))
            : (data = null);

          pool
            ? setPoolId(pool[0].id)
            : (data = null);

          if (data) {
            setCalculationLoading(false);
            token2.setAmount((Number(data[0]) / 10 ** 18).toFixed(4).toString());
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

    if(token2.name && token1.name && token1.amount)
      calculateSwappingToken();

  }, [token2.name, token1.amount, token1.name]);

  return (
    <div className={`flex justify-center pt-[68px] p-2`}>
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
                onChange={(e) => numberRegex.test(e.target.value) && token1.setAmount(e.target.value)}
                value={token1.amount}
              />
              <button
                className={`token_selector flex justify-between items-center gap-1 font-semibold text-lg font-Inter-c ${
                  token1.name
                    ? 'bg-slate-500 bg-opacity-10'
                    : 'bg-uni-dark-pink text-white'
                } px-3 rounded-3xl box-border`}
                onClick={() => {
                  setTokenSelectorToggle(true);
                  token1.select()
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
            <div className="amount_calculator font-mono text-sm">
              <p>{token1.balance && token1.balance}</p>
            </div>
            <div className="bg-white absolute -bottom-1/4 p-1 right-1/2 rounded-lg ">
              <button
                className="p-2 bg-blue-50 rounded-lg overflow-hidden"
                onClick={() => {
                  if (token1.name && token2.name)
                    swapPair()
                  token1.setAmount(token2.amount);
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
                onChange={(e) => (numberRegex.test(e.target.value) && token2.setAmount(e.target.value))}
                value={token2.amount}
              />
              <button
                className={`token_selector flex justify-between items-center gap-1 font-semibold text-lg font-Inter-c ${
                  token2.name
                    ? 'bg-slate-500 bg-opacity-10'
                    : 'bg-uni-dark-pink text-white'
                } px-3 rounded-3xl box-border`}
                onClick={() => {
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
            <div className="amount_calculator font-mono text-sm">
              {token2.balance && token2.balance}
            </div>
          </div>
        </div>
        {token1.name && token2.name && (
          <TradeCalculations
            token1={{ name: token1.name, amount: token1.amount }}
            token2={{ name: token2.name, amount: token2.amount }}
          />
        )}
        <button
          className={`action_btn mt-[2px] ${
            !isConnected
              ? 'text-uni-dark-pink bg-uni-dark-pink bg-opacity-10'
              : (token1.amount >= token1.balance || !token2.name ) ? "text-gray-400 bg-gray-100 " : 'text-uni-dim-white bg-uni-dark-pink'
          } ${
            isWaitingForCalculation && 'animate-pulse'
          }  rounded-2xl text-center text-xl font-semibold w-full`}
        >
          {isConnected ? (
            <p
              className="w-full p-3"
              onClick={() => (token1.amount && token1.name && token2.name && token1.amount <= token1.balance ) && setConfirmTransactionToggle(true)}
            >
              {(token1.name && token1.name) ? (token1.amount ? (token1.amount > token1.balance ? "Insufficient Balance":  "Swap") : "Enter Amount")  : "Select token"  }
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
          tokens={{token1, token2}}
        />
      )}
      {confirmswapToggle && pool && (
        <ConfirmSwap
          setConfirmTransactionToggle={setConfirmTransactionToggle}
          tokens={{ token1, token2, pool}}
          from={'SwapUI'}
        />
      )}
    </div>
  );
};

export default SwapUI;
