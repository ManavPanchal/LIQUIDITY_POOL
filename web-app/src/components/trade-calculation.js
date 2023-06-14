import React from 'react'
import { useState } from 'react';

const TradeCalculations = ({token1Price, token2Price}) => {

    const [dropdownToogle, setDropdownToggle] = useState(false);
    const priceImpact = "-0.20%"
    const minimumOutput = "0.00456604 WETH"
    const expectedOutput = "0.00457061 WETH"
    const orderRouting = "Uniswap API"

    const style = {
        trade_span : "p-1 flex justify-between text-gray-500 text-sm"
    }

  return (
    <div className="trade_calculations border border-violet-200 p-1 px-2 rounded-xl mb-1">
        <div className="price_comparision py-2 px-1 flex justify-between cursor-pointer text-base items-center" onClick={()=>setDropdownToggle(!dropdownToogle)}>
            <span className='text-base'>{`${token1Price} WETH = ${token2Price} MATIC`}</span>
            <span>
                {(!dropdownToogle) ?
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m283-345-43-43 240-240 240 239-43 43-197-197-197 198Z"/></svg>}
            </span>
        </div>
        {dropdownToogle &&
            <div className="trade_majors border-t border-violet-200">
                <div className={style.trade_span}>
                    <span>Price Impact</span>
                    <span>{priceImpact}</span>
                </div>
                <div className={style.trade_span}>
                    <span>Minimmum Output</span>
                    <span>{minimumOutput}</span>
                </div>
                <div className={style.trade_span}>
                    <span>Expected Output</span>
                    <span>{expectedOutput}</span>
                </div>
                <div className={style.trade_span + " border-t border-violet-100"}>
                    <span>Order Routing</span>
                    <span>{orderRouting}</span>
                </div>
            </div>
        }
    </div>
  )
}

export default TradeCalculations