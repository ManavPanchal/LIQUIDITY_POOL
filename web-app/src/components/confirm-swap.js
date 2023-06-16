import { writeContract } from '@wagmi/core';
import {LiquidityPoolABI, tokenABI} from '../utils/constants';

const ConfirmSwap = ({setConfirmSwapToggle, tokens}) => {

    console.log(tokens);

    const Swap = async()=>{
        const allowance = await writeContract(
            {
                address:tokens.token1?.address,
                abi:tokenABI,
                functionName:"approve",
                args:[process.env.REACT_APP_LIQUIDITY_CONTRACT,tokens.token1Amount]
            }
            )

        console.log(allowance);
        console.log(tokens.pool?.poolId,tokens.token1Amount, tokens.token1?.address);
        const data = await writeContract(
            {
                address: process.env.REACT_APP_LIQUIDITY_CONTRACT,
                abi: LiquidityPoolABI,
                functionName: 'swapTokens',
                args: [tokens.pool?.poolId,(tokens.token1Amount * (10**18)), tokens.token1?.address],
            }
        )
    }

  return (
    <div className='token_selector_container h-screen w-screen bg-slate-600 bg-opacity-50 absolute top-0' onClick={()=>setConfirmSwapToggle(false)}>
        <div className="main absolute pb-5 p-4 md:p-3 sm:top-1/2 left-1/2 bottom-0 -translate-x-1/2 sm:-translate-y-1/2 bg-uni-dim-white w-[400px] sm:rounded-3xl rounded-t-3xl max-h-fit overflow-hidden " onClick={(e)=>{e.stopPropagation()}}>
            <div className="heading flex justify-between p-3">
                <span className='font-medium'>Review a Swap</span>
                <button onClick={()=>setConfirmSwapToggle(false)}>
                    <span class="material-symbols-outlined">
                        close
                    </span>
                </button>
            </div>
            <div className="confirm_btn w-full" onClick={Swap}>
                <button className="bg-uni-dark-pink text-uni-dim-white text-xl w-full text-center p-3 font-medium rounded-2xl">Confirm Swap</button>
            </div>
        </div>
    </div>
  )
}
export default ConfirmSwap