import React from 'react';
import { useNavigate } from 'react-router';

const userTokenPairs = [
  {
    poolId: 1,
    tokenPair: 'ETH/USDT',
    token1Amount: '200',
    token2Amount: '100',
  },
  {
    poolId: 2,
    tokenPair: 'BTC/DAI',
    token1Amount: '55',
    token2Amount: '110',
  },
  {
    poolId: 3,
    tokenPair: 'ETH/BAT',
    token1Amount: '120',
    token2Amount: '80',
  },
  {
    poolId: 4,
    tokenPair: 'DAI/USDT',
    token1Amount: '75',
    token2Amount: '140',
  },
];

const Tokenpairprovider = () => {
  const navigateTo = useNavigate();
  return (
    <div className="flex flex-col gap-1 items-center w-full font-roboto">
      <span className="text-lg font-bold ">Your Positions</span>
      {userTokenPairs.map((tokenPairs) => {
        const tokens = tokenPairs.tokenPair.split('/');
        return (
          <div className="flex justify-between items-center text-gray-700 font-medium text-lg px-5 py-2 w-full mx-5 border-t border-violet-200">
            <div className="flex gap-3">
              <div className="text-lg">{tokenPairs.poolId}.</div>
              <div className="flex flex-col">
                <div className="text-lg font-bold">{tokenPairs.tokenPair}</div>
                <div className="text-sm">
                  {tokenPairs.token1Amount}
                  {tokens[0]} ⇆ {tokenPairs.token2Amount}
                  {tokens[1]}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.setItem('TokenPair', tokenPairs.tokenPair);
                navigateTo('/pools/removeliquidity');
              }}
            >
              <div className="bg-uni-dark-pink rounded-lg px-3 text-md text-uni-dim-white font-bold">
                Show Details
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Tokenpairprovider;
