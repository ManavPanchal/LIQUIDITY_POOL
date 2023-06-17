import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
import { pools, Tokens } from '../../utils/constants';
import lptInstance from '../../utils/lptInstance';
import poolInstance from '../../utils/poolInstance';

const RemoveLiquidity = () => {
  const { isConnected } = useAccount();
  const [providerInfo, setProviderInfo] = useState([]);
  const [LPTamount, setLPTAmount] = useState('');
  const [lptbalance, setBalance] = useState(0);
  const [tokenSelectorToggle, setTokenSelectorToggle] = useState(false);
  const { sliderToggle, setSliderToggle } = useContext(AppContext);
  const Tokenpair = localStorage.getItem('TokenPair');
  const tokens = Tokenpair.split('/');
  let balance;

  async function tokenPair() {
    const pool = pools
      .filter((pool) => pool.tokenPair === Tokenpair)
      .map((pool) => pool);

    return pool;
  }
  useEffect(() => {
    async function checkbalance() {
      const pool = await tokenPair();
      console.log('LPTAddress', pool[0]);
      const { contract, signerAddress, balance } = await lptInstance(
        pool[0].LPTAddress,
      );

      setBalance(balance);
      const { contract: poolContract } = await poolInstance();
      const provider = await poolContract.providerDetails(
        pool[0].id,
        signerAddress,
      );
      const providerdata = [
        ethers.utils.formatEther(provider.currentBalance1),
        ethers.utils.formatEther(provider.currentBalance2),
        ethers.utils.formatEther(provider.claimedBalance1),
        ethers.utils.formatEther(provider.claimedBalance2),
      ];
      setProviderInfo(providerdata);
    }
    checkbalance();
  }, [setBalance]);

  async function removeFunds() {
    const pool = await tokenPair();
    console.log(pool, 'dsjfhkjasdpollllllllllllllllllllllllllllll');
    const { contract, signerAddress, balance } = await lptInstance(
      pool[0].LPTAddress,
    );

    const LPTAmount = ethers.utils.parseUnits(LPTamount, '18'); // Adjust the amount and decimals as per your requirement

    await contract.approve(
      '0x644ee3a7780593C480E4c072A415Dd4034544A95',
      LPTAmount,
    );
    const { contract: poolContract } = await poolInstance();
    await poolContract.removeLiquidity(pool[0].id, LPTAmount);
    window.location.reload();
  }
  return (
    <div className="flex flex-col  gap-2 bg-white max-w-[420px] rounded-xl m-auto mt-6 p-5 font-roboto">
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
          Remove Liquidity
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
      <div className="bg-white flex flex-col p-3 rounded-xl mt-5">
        <span className="text-md font-semibold mb-2 ">Provided Liquidity</span>
        <div className="bg-uni-slate outline-none p-3 flex flex-col opacity-60  rounded-xl">
          <div className="flex justify-between">
            <span className="">{tokens[0]}↗</span>
            <span className="">{providerInfo[0]}</span>
          </div>
          <div className="flex justify-between">
            <span>{tokens[1]}</span>
            <span>{providerInfo[1]}</span>
          </div>
        </div>
      </div>
      <div className="bg-white flex flex-col p-3 rounded-xl">
        <span className="text-md font-semibold mb-2 ">Claimed Liquidity</span>
        <div className="bg-uni-slate outline-none p-3 flex flex-col opacity-60  rounded-xl">
          <div className="flex justify-between">
            <span className="">{tokens[0]}</span>
            <span className="">{providerInfo[2]}</span>
          </div>
          <div className="flex justify-between">
            <span>{tokens[1]}</span>
            <span>{providerInfo[3]}</span>
          </div>
        </div>
      </div>

      <div className="bg-white flex flex-col rounded-xl">
        <span className="text-md font-semibold mb-2 mx-3 ">
          Enter LPT Amount:
        </span>
        <div className=" bg-blue-50 p-3 rounded-2xl flex gap-3 flex-col mx-3">
          <div className="amount_input_field text-lg text-gray-700 flex gap-2">
            <input
              type="text"
              className="bg-transparent outline-none basis-1/2 text-4xl w-0 flex-1"
              placeholder="0"
              value={LPTamount}
              inputmode="decimal"
              autocomplete="off"
              autocorrect="off"
              pattern="^[0-9]*[.,]?[0-9]*$"
              onChange={(e) => {
                setLPTAmount(e.target.value === '0' ? '' : e.target.value);
              }}
            />
          </div>
          <div className="amount_calculator font-mono text-sm text-opacity-70">
            <p>Balance:{lptbalance}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          sliderToggle ? setSliderToggle(false) : setSliderToggle(true);
          if (isConnected) {
            removeFunds();
          }
        }}
      >
        <div
          className=" text-uni-dark-pink bg-uni-dark-pink bg-opacity-10
        text-center px-8 py-4 text-xl rounded-2xl font-bold mt-4"
        >
          Withdraw Funds
        </div>
      </button>
    </div>
  );
};

export default RemoveLiquidity;
