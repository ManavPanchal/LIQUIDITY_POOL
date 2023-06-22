import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { dots, uniLogo, ethLogo } from '../images/images';
import { AppContext } from '../App';
import { useAccount } from 'wagmi';
import ChainSelector from './chain-selector';

const Navbar = () => {
  const [dropdownToogle, setDropdownToggle] = useState(false);
  const { setSliderToggle } = useContext(AppContext);

  const { isConnected, address } = useAccount();

  const style = {
    navigation_li:
      'hover:bg-gray-600 hover:bg-opacity-5 px-3 py-2 cursor-pointer rounded-md',
  };

  return (
    <section className="navbar_div h-22 w-full p-3 lg:grid lg:grid-cols-3">
      <section className="navigation flex gap-5 items-center">
        <Link to="/#">
          <img src={uniLogo} alt="logo" className="h-9 cursor-pointer" />
        </Link>
        <u className="list-none no-underline text-slate-400 flex items-center">
          <li >
            <Link to="/swap/#" className={style.navigation_li}>Swap</Link>
          </li>
          <li >
            <Link to="/tokens" className={style.navigation_li}>Tokens</Link>
          </li>
          <li>
            <Link to="/swap" className={style.navigation_li}>NFTs</Link>
          </li>
          <li>
            <Link to="/pools" className={style.navigation_li}>Pools</Link>
          </li>
          <li className={style.navigation_li}>
            <img
              src={dots}
              alt="..."
              width="20px"
              height="20px"
              className="hover:cursor-pointer opacity-50"
            />
          </li>
        </u>
      </section>
      <section className="searchbar justify-self-center w-fit bg-opacity-40 rounded-xl border hover:border-violet-700 border-violet-200 backdrop-blur-3xl text-gray-600 md:hidden lg:block">
        <div className="input_field flex items-center gap-3 justify-evenly  px-5 py-2 bg-opacity-40 ">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 15L11.2439 11.2439M12.3821 6.69106C12.3821 9.83414 9.83414 12.3821 6.69106 12.3821C3.54797 12.3821 1 9.83414 1 6.69106C1 3.54797 3.54797 1 6.69106 1C9.83414 1 12.3821 3.54797 12.3821 6.69106Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <input
            type="text"
            className="h-7 w-120 outline-none bg-transparent text-black font-Inter-c p-3 font-medium"
            placeholder="Search tokens"
          />
          <div className="px-2 py-1 bg-gray-800 bg-opacity-5 inline text-xs rounded-md">
            /
          </div>
        </div>
        <section className="list_section"></section>
      </section>
      <section className="connectors flex gap-1 items-center justify-self-end px-2">
        <section className="chain_selector">
          <ChainSelector/>
        </section>
        <section
          className="user_profile rounded-3xl cursor-pointer overflow-hidden"
          onClick={() => setSliderToggle(true)}
        >
          {isConnected ? (
            <div className="flex items-center gap-3 rounded-3xl font-medium px-2 py-1 hover:border-violet-300 border border-transparent">
              <svg x="0" y="0" width="24" height="24" className="rounded-full">
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  transform="translate(0.7865506155529516 -0.6225804798458897) rotate(412.8 12 12)"
                  fill="#F29E02"
                ></rect>
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  transform="translate(-7.190959125771529 6.1319622881810965) rotate(268.6 12 12)"
                  fill="#C8144D"
                ></rect>
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  transform="translate(-18.76614179150707 14.796157445697116) rotate(161.6 12 12)"
                  fill="#2366E1"
                ></rect>
              </svg>
              <p className="wallet_address">
                {address.slice(0, 6) + '...' + address.slice(-4)}
              </p>
            </div>
          ) : (
            <p className="px-3 py-2 text-uni-dark-pink bg-uni-dark-pink bg-opacity-10 text-base font-medium w-full  h-full rounded-3xl">
              Connect
            </p>
          )}
        </section>
      </section>
    </section>
  );
};

export default Navbar;
