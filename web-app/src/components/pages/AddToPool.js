import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ethLogo } from '../../images/images';
import { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { useAccount } from 'wagmi';
import TokenSelector from '../token-selector';
import { pools, Tokens } from '../../utils/constants';
import tokensInstance from '../../utils/tokensInstance';
import { ethers } from 'ethers';
import poolInstance from '../../utils/poolInstance';
function AddToPool() {
  const { isConnected } = useAccount();
  const [tokens, setTokens] = useState({
    token1: {
      isSelected: false,
    },
    token2: {
      isSelected: false,
    },
  });
  const [tokenSelectorToggle, setTokenSelectorToggle] = useState(false);
  const { sliderToggle, setSliderToggle } = useContext(AppContext);
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');

  async function tokenPair() {
    const token1Address = Tokens.filter(
      (token) => token.tokenName === tokens.token1.name,
    ).map((token) => token.tokenAddress);

    const token2Address = Tokens.filter(
      (token) => token.tokenName === tokens.token2.name,
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
    const { poolId, token1Address, token2Address } = await tokenPair();
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
      const amountToDisplay =
        (Number(event.target.value) * reserve2) / reserve1;
      console.log('AMT DIS', amountToDisplay);

      setAmount2(amountToDisplay === '0' ? '' : amountToDisplay.toString());
    } else {
      const amountToDisplay =
        (Number(event.target.value) * reserve1) / reserve2;

      setAmount1(amountToDisplay === '0' ? '' : amountToDisplay.toString());
    }
  }
  async function addFunds() {
    const { token1Address, token2Address, poolId } = await tokenPair();
    const { contract: poolContract } = await poolInstance();
    let fundAmount1;
    let fundAmount2;
    const poolData = await poolContract.pool(poolId[0]);
    const token1 = poolData.token1;
    const token2 = poolData.token2;

    if (
      token1.toLowerCase() === token2Address[0].toLowerCase() &&
      token2.toLowerCase() === token1Address[0].toLowerCase()
    ) {
      console.log('Failed.....');
      fundAmount1 = ethers.utils.parseEther(amount2.toString());
      fundAmount2 = ethers.utils.parseEther(amount1.toString());
    } else {
      fundAmount1 = ethers.utils.parseEther(amount1.toString());
      fundAmount2 = ethers.utils.parseEther(amount2.toString());
    }
    const { contract, signerAddress } = await tokensInstance(token1Address[0]);
    await contract.approve(
      '0x644ee3a7780593C480E4c072A415Dd4034544A95',
      fundAmount1,
    );
    console.log(signerAddress, 'SAAAA', contract);
    const { contract: contract2 } = await tokensInstance(token2Address[0]);
    await contract2.approve(
      '0x644ee3a7780593C480E4c072A415Dd4034544A95',
      fundAmount2,
    );
    console.log('RCCC', 'FA1', fundAmount1, 'FA2', fundAmount2);
    await poolContract.addLiquidity(poolId[0], fundAmount1, fundAmount2);
  }

  return (
    <>
      <div className="flex flex-col  gap-5 bg-white max-w-[420px] rounded-xl m-auto mt-6 p-5 ">
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
          <div className="w-fit h-5"></div>
        </div>
        <div className="text-center text-xl font-bold opacity-60">+</div>
        <div className="bg-blue-50 flex flex-col p-5 rounded-xl">
          <div className="amount_input_field text-2xl flex gap-2">
            <input
              id="token2"
              className="bg-transparent outline-none text-4xl w-0 flex-1"
              placeholder="0"
              onChange={(e) => {
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
          <div className="w-fit h-5"></div>
        </div>
        <button
          onClick={() => {
            sliderToggle ? setSliderToggle(false) : setSliderToggle(true);
            if (isConnected) {
              addFunds();
            }
          }}
          className=" text-uni-dark-pink bg-uni-dark-pink bg-opacity-10 text-center px-8 py-4 text-xl rounded-2xl font-bold"
        >
          {isConnected ? 'Add Funds' : 'Connect Wallet'}
        </button>
      </div>
      {tokenSelectorToggle && (
        <TokenSelector
          setTokenSelectorToggle={setTokenSelectorToggle}
          setTokens={setTokens}
          tokens={tokens}
        />
      )}
    </>
  );
}

export default AddToPool;
