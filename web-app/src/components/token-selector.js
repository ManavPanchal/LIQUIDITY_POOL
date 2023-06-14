import React from 'react'
import { useContext } from 'react'
import {AppContext} from '../App';
import {ethLogo} from '../images/images';

const TokenSelector = () => {

  // document.getElementById("App").style.filter = "blur(2px)"
  const {setTokenSelectorToggle} = useContext(AppContext);

  const tokens = [
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    },
    {
      tokenImage: ethLogo,
      tokenName:"Ether",
      tokenSymbol:"ETH"
    }
  ]

  return (
    <div className='token_selector_container h-full w-full bg-slate-600 bg-opacity-50 absolute top-0' onClick={()=>setTokenSelectorToggle(false)}>
      <div className="main absolute py sm:top-1/2 left-1/2 bottom-0 -translate-x-1/2 sm:-translate-y-1/2 bg-uni-dim-white w-[400px] sm:rounded-3xl rounded-t-3xl max-h-fit overflow-hidden " onClick={(e)=>{e.stopPropagation()}}>
          <div className="container_header p-5 border-b border-violet-100">
            <div className="heading flex justify-between py-2 px-1">
              <span className='font-medium'>Select a token</span>
              <button onClick={()=>setTokenSelectorToggle(false)}>
                <span class="material-symbols-outlined">
                  close
                </span>
              </button>
            </div>
            <div className="search_bar relative flex items-center gap-1 border border-violet-100 rounded-xl p-1 focus-within:bg-transparent bg-violet-200 bg-opacity-30 w-full ">
              <span className="material-symbols-outlined w-1/12 text-center">
                search
              </span>
              <input type="text" className='w-11/12 outline-none bg-transparent text-lg' placeholder='Search name or paste address'/>
            </div>
          </div>
          <div className="token_container pb-1 overflow-y-scroll max-h-[520px]">
              {
                tokens.map((token)=>{
                  return(<>
                      <div className="token flex p-2 pl-5 hover:bg-slate-600 hover:bg-opacity-5 cursor-pointer gap-2 items-center">
                        <span className='token_image'>
                          <img src={token.tokenImage} alt="" className='w-8'/>
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
      </div>
    </div>
  )
}

export default TokenSelector