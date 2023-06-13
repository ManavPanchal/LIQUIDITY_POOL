import React from 'react'
import { useContext } from 'react';
import { ethLogo } from '../../images/images';
import {AppContext} from '../../App';
import TradeCalculations from '../trade-calculation';

const SwapUI = () => {

  const tokenName = "Ether";
  const {isWalletConnected, setSliderToggle, setTokenSelectorToggle} = useContext(AppContext);

  return (
    <div className='flex justify-center pt-[68px]'>
        <div className="swap_container max-w-6xl h-fit px-2 py-1 rounded-xl bg-uni-dim-white border border-violet-200 w-120">
            <div className="conatainer_header flex justify-between items-center p-3 mb-1">
              <div className="container_navigator flex gap-3 text-center font-medium text-gray-500">
                  <span>Swap</span>
                  <span>Buy</span>
              </div>
              <button className="setting hover:opacity-70 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="sc-1x8ot1t-0 bcMbuY"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              </button>
            </div>
            <div className="token_selector mb-1">
              <div className="token_select_section bg-blue-50 p-3 rounded-2xl relative mb-1 flex flex-col gap-2">
                <div  className="amount_input_field text-2xl flex gap-2" >
                  <input type="text" id='token1' className='bg-transparent outline-none text-4xl w-0 flex-1' placeholder='0'/>
                  <button
                      className="token_selector flex grow items-center gap-1 font-medium text-xl bg-slate-500 bg-opacity-10 p-1 px-2 rounded-3xl max-w-fit"
                      onClick={()=>setTokenSelectorToggle(true)}>
                    <img src={ethLogo} alt="" className='w-6'/>
                    <span>{tokenName}</span>
                    <span><svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg></span>
                  </button>
                </div>
                <div className="amount_calculator font-mono text-sm">
                  <p>$1.02</p>
                </div>
                <div className='bg-white absolute -bottom-1/4 p-1 right-1/2 rounded-lg '>
                  <button className='p-2 bg-blue-50 rounded-lg overflow-hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#98A1C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                  </button>
                </div>
              </div>
              <div className="token_select_section bg-blue-50 p-3 rounded-2xl flex flex-col gap-2">
                  <div className="amount_input_field text-2xl flex gap-2">
                    <input type="text" className='bg-transparent outline-none basis-1/2 text-4xl w-0 flex-1' placeholder='0'/>
                    <button
                      className="token_selector flex grow items-center gap-1 font-medium text-xl bg-slate-500 bg-opacity-10 p-1 px-2 rounded-3xl max-w-fit"
                      onClick={()=>setTokenSelectorToggle(true)}>
                      <img src={ethLogo} alt="" className='w-6'/>
                      <span>{tokenName}</span>
                      <span><svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg></span>
                    </button>
                  </div>
                  <div className="amount_calculator font-mono text-sm">
                    <p>$1.02</p>
                  </div>
              </div>
            </div>
            <TradeCalculations token1Price={"1"} token2Price="0.2323"/>
            <button className="action_btn text-uni-dim-white bg-uni-dark-pink rounded-xl text-center p-3 text-xl font-semibold w-full">
              {isWalletConnected ?
                <>
                  { (document.getElementById("token1")?.value === "") ?
                        <p> Enter Amount</p>:
                        <p> Swap </p>
                  }
                </> :
                <p className='w-full' onClick={()=>setSliderToggle(true)}>
                  Connect Wallet
                </p>
              }
            </button>
        </div>
    </div>
  )
}

export default SwapUI