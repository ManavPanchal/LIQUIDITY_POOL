import { readContract } from '@wagmi/core';
import React, { useState} from 'react';
import { useAccount } from 'wagmi';
import { tokenABI, Tokens } from "../utils/constants"

const TokenSelector = ({ setTokenSelectorToggle, tokens }) => {

  const { address } = useAccount();
  const [balanceFetchingLoader, setBalanceLoader] =  useState(false)

  const fetchUserTokenBalance = async (tokenAddress) => {
    try {
      const balance = await readContract({
        address: tokenAddress,
        abi: tokenABI,
        functionName: "balanceOf",
        args: [address]
      });
      return Number(balance) / (10 ** 18);
    } catch (error) {
      console.log(error);
    }
  }

  const onTokenSelect = async (token) => {
    if (tokens.token1.name === token.tokenName || tokens.token2.name === token.tokenName) return;
    setBalanceLoader(true);
    const balance = await fetchUserTokenBalance(token.tokenAddress)
    if (tokens.token1.isSelected){
      tokens.token1.setName(token.tokenSymbol);
      tokens.token1.setBalance(balance);
      tokens.token1.setAddress(token.tokenAddress)
      tokens.token1.setLogo(token.tokenImage)
    }
    else if (tokens.token2.isSelected){
      tokens.token2.setName(token.tokenSymbol);
      tokens.token2.setBalance(balance);
      tokens.token2.setAddress(token.tokenAddress);
      tokens.token2.setLogo(token.tokenImage)
    }
    setTokenSelectorToggle(false);
  }

  return (
    <div className='token_selector_container h-screen w-screen bg-slate-600 bg-opacity-50 absolute top-0' onClick={() => setTokenSelectorToggle(false)}>
      <div className="main absolute py sm:top-1/2 left-1/2 bottom-0 -translate-x-1/2 sm:-translate-y-1/2 bg-uni-dim-white w-[400px] max-w-full sm:rounded-3xl rounded-t-3xl max-h-fit overflow-hidden " onClick={(e) => { e.stopPropagation() }}>
        <div className="container_header p-5 border-b border-violet-100">
          <div className="heading flex justify-between py-2 px-1">
            <span className='font-medium'>Select a token</span>
            <button onClick={() => setTokenSelectorToggle(false)}>
              <span className="material-symbols-outlined">
                close
              </span>
            </button>
          </div>
          <div className="search_bar relative flex items-center gap-1 border border-violet-100 rounded-xl p-1 focus-within:bg-transparent bg-violet-200 bg-opacity-30 w-full ">
            <span className="material-symbols-outlined w-1/12 text-center">
              search
            </span>
            <input type="text" className='w-11/12 outline-none bg-transparent text-lg' placeholder='Search name or paste address' />
          </div>
        </div>
        <div className="token_container pb-1 overflow-y-scroll max-h-[520px]">
          {
            Tokens.map((token) => {
              return (<>
                <div
                  className={`token flex p-2 pl-5 hover:bg-slate-600 hover:bg-opacity-5 cursor-pointer gap-2 items-center ${(tokens.token1.name === token.tokenName || tokens.token2.name === token.tokenName) && "opacity-20"}`}
                  onClick={()=>{onTokenSelect(token)}}>
                  <span className='token_image'>
                    <img src={token.tokenImage} alt="" className='w-8' />
                  </span>
                  <span className="token_name flex flex-col content-center">
                    <span className='text-sm font-medium'>{token.tokenName}</span>
                    <span className='text-xs'>{token.tokenSymbol}</span>
                  </span>
                </div>
              </>)
            })
          }
        </div>
        { balanceFetchingLoader &&
          <div className=       "absolute bg-slate-500 bg-opacity-10 top-0 w-full h-full flex justify-center items-center ">
             fetching Balance...
          </div>
        }
      </div>
    </div>
  )
}

export default TokenSelector
