import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Tokenpairprovider from '../tokenpair-provider';
import { useAccount } from 'wagmi';

const PoolsUI = () => {
  const { setSliderToggle, sliderToggle } = useContext(AppContext);
  const { isConnected } = useAccount();
  const navigateTo = useNavigate();
  return (
    <div className="flex justify-center w-full max-xl:px-5">
      <div className="pools_container flex flex-col justify-center m-auto mt-60 w-[850px] rounded-xl h-64 font-roboto">
        <div className="flex justify-between mb-7">
          <div className="flex justify-start gap-3 text-left text-black text-4xl ">
            Pools
          </div>
          <div className="flex justify-end gap-3">
            <button>
              <div className="flex items-center bg-white px-2 py-1 rounded-xl text-md text-black hover:bg-uni-slate">
                V2 liquidity{' '}
              </div>
            </button>

            <button
              onClick={() => {
                navigateTo('/pools/addliquidity');
              }}
            >
              <div className="flex items-center bg-uni-dark-pink px-2 py-1 font-bold rounded-xl  text-white">
                + New Position
              </div>
            </button>
          </div>
        </div>
        <div
          className={`flex flex-col items-center h-fit bg-uni-dim-white border border-violet-200  shadow-gray-200 shadow-lg rounded-2xl ${
            isConnected ? 'py-3' : 'py-8'
          }`}
        >
          {!isConnected && (
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
                Your active V2 liquidity positions will{' '}
                <span className="block text-center">appear here</span>
              </span>
              <div className="bg-uni-dark-pink px-[72px] py-2 mb-1  text-white w-fit text-xl font-bold rounded-full mt-10">
                <button
                  onClick={() => {
                    sliderToggle
                      ? setSliderToggle(false)
                      : setSliderToggle(true);
                  }}
                >
                  Connect a wallet
                </button>
              </div>
            </>
          )}
          {isConnected && <Tokenpairprovider />}
        </div>
        <div className="flex mt-5">
          <Link
            className="flex-1 gap-2  mr-2 rounded-3xl "
            target="_blank"
            to="https://support.uniswap.org/hc/en-us/categories/8122334631437-Providing-Liquidity-"
          >
            <div className="flex-col p-4 border-[1px] border-violet-200 rounded-3xl hover:opacity-70 ">
              <div className="font-bold opacity-70">
                Learn about providing liquidity ↗{' '}
              </div>
              <div className="text-gray-700 pr-2">
                Check out our v2 LP walkthrough and migration guides.
              </div>
            </div>
          </Link>
          <Link
            className="flex-1 gap-2 rounded-3xl "
            target="_blank"
            to="https://info.uniswap.org/#/pools"
          >
            <div className="flex-col p-4 border-[1px] border-violet-200 rounded-3xl hover:opacity-70 h-full">
              <div className="font-bold opacity-70">Top Pools ↗</div>
              <div className="text-gray-700">Explore Uniswap Analytics.</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PoolsUI;
