import React from 'react';
import { Link } from 'react-router-dom';
import { ethLogo } from '../../images/images';
import { useContext } from 'react';
import { AppContext } from '../../App';

function AddToPool() {
  const tokenName = 'ETH';
  const {
    sliderToggle,
    isWalletConnected,
    setSliderToggle,
    setTokenSelectorToggle,
  } = useContext(AppContext);
  return (
    <div className="flex flex-col  gap-5 bg-white w-[420px] rounded-xl m-auto mt-6 p-5 font-roboto">
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
      <div className="bg-uni-slate flex flex-col p-5 rounded-xl">
        <div className="amount_input_field text-2xl flex gap-2">
          <input
            type="text"
            id="token1"
            className="bg-transparent outline-none text-4xl w-0 flex-1"
            placeholder="0"
          />
          <button
            onClick={() => setTokenSelectorToggle(true)}
            className="token_selector flex grow items-center gap-1 font-medium text-xl bg-slate-500 bg-opacity-10 p-1 px-2 rounded-3xl max-w-fit"
          >
            <img src={ethLogo} alt="" className="w-6" />
            <span>{tokenName}</span>
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
        <div className="w-fit h-5"></div>
      </div>
      <div className="text-center text-xl opacity-60">+</div>
      <div className="bg-uni-slate flex flex-col p-5 rounded-xl">
        <div className="amount_input_field text-2xl flex gap-2">
          <input
            type="text"
            id="token1"
            className="bg-transparent outline-none text-4xl w-0 flex-1"
            placeholder="0"
          />
          <button
            onClick={() => setTokenSelectorToggle(true)}
            className="token_selector flex grow items-center gap-1  py-0.5 px-3 text-md  font-medium text-xl bg-uni-dark-pink  rounded-2xl max-w-fit"
          >
            {/* <img src={ethLogo} alt="" className="w-6" />
            <span>{tokenName}</span> */}
            <div className="text-white font-medium text-xl">Select a token</div>
            <svg
              width="15"
              height="8"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="sc-33m4yg-8 jsUfgJ"
            >
              <path d="M0.97168 1L6.20532 6L11.439 1" stroke="#ffffff"></path>
            </svg>
          </button>
        </div>
        <div className="w-fit h-5"></div>
      </div>
      <button
        onClick={() => {
          sliderToggle ? setSliderToggle(false) : setSliderToggle(true);
        }}
        className=" text-uni-dark-pink bg-uni-dark-pink bg-opacity-10 text-center px-8 py-4 text-xl rounded-2xl font-bold"
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default AddToPool;
