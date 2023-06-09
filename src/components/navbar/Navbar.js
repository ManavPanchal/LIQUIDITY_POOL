import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { dots, uniLogo, ethLogo} from '../../images/images'

const Navbar = () => {

  const [dropdownToogle, setDropdownToggle] = useState(false);

  const style = {
    navigation_li : "hover:bg-gray-600 hover:bg-opacity-5 px-3 py-2 cursor-pointer rounded-md"
  }

  return (
    <section className='navbar_div h-22 w-full p-2 flex justify-evenly items-center'>
        <section className="navigation flex gap-5 items-center">
            <img src={uniLogo} alt="logo" className="h-9"/>
            <u className="list-none no-underline text-slate-400 flex">
              <li className={style.navigation_li}>
                <Link to="/swap" >Swap</Link>
              </li >
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
        <section className="searchbar">
          <div className="input_field relative flex items-center gap-3 justify-evenly bg-light-purple px-5 py-2 bg-opacity-40 rounded-xl border hover:border-violet-700">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 15L11.2439 11.2439M12.3821 6.69106C12.3821 9.83414 9.83414 12.3821 6.69106 12.3821C3.54797 12.3821 1 9.83414 1 6.69106C1 3.54797 3.54797 1 6.69106 1C9.83414 1 12.3821 3.54797 12.3821 6.69106Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <input type="text" className='h-7 w-80 outline-none bg-transparent' />
            <div className='p-2 bg-gray-600 bg-opacity-5 inline text-xs rounded-md'>/</div>
          </div>
          <section className="list_section"></section>
        </section>
        <section className='wallet connector'>
          <section className="chain_selector">
            <div className="currentchain cursor-pointer hover:bg-gray-600 hover:bg-opacity-5 px-3 py-2 rounded-md flex gap-1 items-center" onClick={()=>setDropdownToggle(!dropdownToogle)}>
              <img src={ethLogo} alt="" className='w-6'/>
              {(!dropdownToogle) ?
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="m283-345-43-43 240-240 240 239-43 43-197-197-197 198Z"/></svg>}
            </div>
          </section>
          <section className="user_profile">
            
          </section>
        </section>
    </section>
  )
}

export default Navbar
