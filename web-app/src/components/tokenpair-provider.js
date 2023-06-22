import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router';
import poolInstance from '../utils/poolInstance';
import { useState } from 'react';
import { pools } from '../utils/constants';

const Tokenpairprovider = () => {
  const navigateTo = useNavigate();
  const [poolInfo, setpoolInfo] = useState([]);
  let poolcount = 0;
  let addedEvents;
  useEffect(() => {
    async function addevents() {
      let poolsInfo;
      const { contract, signerAddress } = await poolInstance();
      let liquidityAdded = await contract.queryFilter('liquidityAdded');

      addedEvents = liquidityAdded
        .filter((pool) => {
          return signerAddress === pool.args[0];
        })
        .map((pool) => {
          return pool.args[1];
        });

      const userTokens = Array.from(new Set(addedEvents));
      console.log('userTokens', userTokens);
      const pool = userTokens.map((tokenPair) => {
        return pools.filter((pool) => {
          return pool.tokenPair == tokenPair;
        });
      });
      console.log('pool......................', pool);
      const Pools = pool;
      console.log(Pools);
      poolsInfo = await Promise.all(
        Pools.map(async (Poollist) => {
          return Promise.all(
            Poollist.map(async (pooldata) => {
              const provider = await contract.providerDetails(
                pooldata.id,
                signerAddress,
              );
              pooldata['providedBalance1'] = ethers.utils.formatEther(
                provider.providedBalance1,
              );
              pooldata['providedBalance2'] = ethers.utils.formatEther(
                provider.providedBalance2,
              );
              console.log('final pool............', pooldata);
              return pooldata;
            }),
          );
        }),
      );
      poolsInfo = poolsInfo.flat();
      setpoolInfo([...poolsInfo]);
    }
    addevents();
  }, []);

  console.log('poolInfo', poolInfo);

  return (
    <div
      className={`flex flex-col gap-1 items-center w-full font-roboto ${
        poolInfo.length ? 'py-0' : 'py-8'
      }`}
    >
      <span className="text-lg font-bold ">Your Positions</span>
      {/* {console.log(tokenPairs)} */}
      {poolInfo.length &&
        poolInfo.map((positions) => {
          console.log('positions.........', positions);
          const tokens = positions.tokenPair.split('-');
          poolcount += 1;
          return (
            <div className="flex justify-between items-center text-gray-700 font-medium text-lg px-5 py-2 w-full mx-5 border-t border-violet-200">
              <div className="flex gap-3">
                <div className="text-lg">{poolcount}</div>
                <div className="flex flex-col">
                  <div className="text-lg font-bold">{positions.tokenPair}</div>
                  <div className="text-sm">
                    {positions.providedBalance1}
                    {tokens[0]} ⇆ {positions.providedBalance2}
                    {tokens[1]}
                  </div>
                </div>
              </div>
              {/* {console.log(tokenPairs)} */}
              <button
                onClick={() => {
                  localStorage.setItem('TokenPair', positions.tokenPair);

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
      {!poolInfo.length && (
        <>
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="sc-sqfwcm-9 jXaTwV"
          >
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
          </svg>
          <span className=" text-opacity-50 mt-2 text-lg">
            Open a new position to get started.
          </span>
        </>
      )}
    </div>
  );
};

export default Tokenpairprovider;
