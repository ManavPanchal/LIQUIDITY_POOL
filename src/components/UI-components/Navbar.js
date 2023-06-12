import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { dots, uniLogo, ethLogo} from '../../images/images'
import { AppContext } from '../../App'

const Navbar = () => {

  const [dropdownToogle, setDropdownToggle] = useState(false);
  const walletAddress = "0x1234...432"
  const {setSliderToggle, isWalletConnected} = useContext(AppContext);

  const style = {
    navigation_li : "hover:bg-gray-600 hover:bg-opacity-5 px-3 py-2 cursor-pointer rounded-md"
  }

  return (
    <section className='navbar_div h-22 w-full p-2 grid grid-cols-3'>
        <section className="navigation flex gap-5 items-center">
            <Link to="/#">
             <img src={uniLogo} alt="logo" className="h-9 cursor-pointer"/>
            </Link>
            <u className="list-none no-underline text-slate-400 flex">
              <li className={style.navigation_li}>
                <Link to="/swap/#" >Swap</Link>
              </li>
              <li className={style.navigation_li}>
                <Link to="/swap" >Tokens</Link>
              </li>
              <li className={style.navigation_li}>
                <Link to="/swap">NFTs</Link>
              </li>
              <li className={style.navigation_li}>
                <Link to="/swap">Pools</Link>
              </li>
              <li className={style.navigation_li}>
                <img src={dots} alt="..." width="20px" height="20px" className='hover:cursor-pointer opacity-50'/>
              </li>
            </u>
        </section>
        <section className="searchbar justify-self-center w-fit bg-white bg-opacity-40 backdrop-blur-3xl text-gray-600">
          <div className="input_field flex items-center gap-3 justify-evenly  px-5 py-2 bg-opacity-40 rounded-xl border hover:border-violet-700 border-violet-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 15L11.2439 11.2439M12.3821 6.69106C12.3821 9.83414 9.83414 12.3821 6.69106 12.3821C3.54797 12.3821 1 9.83414 1 6.69106C1 3.54797 3.54797 1 6.69106 1C9.83414 1 12.3821 3.54797 12.3821 6.69106Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <input type="text" className='h-7 w-120 outline-none bg-transparent text-black font-Inter-c p-3 font-medium' placeholder='Search tokens'/>
            <div className='px-2 py-1 bg-gray-800 bg-opacity-5 inline text-xs rounded-md'>/</div>
          </div>
          <section className="list_section"></section>
        </section>
        <section className='connectors flex gap-1 items-center justify-self-end'>
          <section className="chain_selector">
            <div className="currentchain cursor-pointer hover:bg-gray-600 hover:bg-opacity-5 px-3 py-2 rounded-md flex gap-1 items-center" onClick={()=>setDropdownToggle(!dropdownToogle)}>
              <img src={ethLogo} alt="" className='w-6'/>
              {(!dropdownToogle) ?
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m283-345-43-43 240-240 240 239-43 43-197-197-197 198Z"/></svg>}
            </div>
          </section>
          <section
            className="user_profile rounded-3xl flex justify-evenly items-center gap-3 cursor-pointer"
            onClick={()=>setSliderToggle(true)}
            >
              {
                isWalletConnected ?
                <>
                  <img src="" alt="" className='rounded-full w-7 h-7 '/>
                  <p className="wallet_address">{walletAddress}</p>
                </> :
                <p className='px-4 py-1 text-uni-dark-pink bg-uni-dark-pink bg-opacity-10 font-semibold text-xl w-full  h-full rounded-3xl'>Connect</p>
              }
          </section>
        </section>
    </section>
  )
}

export default Navbar
