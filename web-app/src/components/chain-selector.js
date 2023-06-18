import React, { useEffect, useState, useRef } from 'react';
import { useAccount } from 'wagmi';
// import Image from 'next/image';
import { getNetwork } from '@wagmi/core';
import { switchNetwork } from '@wagmi/core';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { ethLogo } from '../images/images';
import { blockchains } from '../utils/blockchains';
function ChainSelector() {
  const { isConnected } = useAccount();
  const [dropdownToogle, setDropdownToggle] = useState(false);
  const [currentChain, setCurrentChain] = useState({
    name: '',
    logo: '',
  });

  useEffect(() => {
    let chainId = getNetwork().chain?.id || 1;
    setChain(chainId);
  }, [isConnected]);

  const setChain = (chainId) => {
    const tempBlockchain = blockchains.filter((blockchain) => {
      return blockchain.id == chainId;
    });
    setCurrentChain({
      name: tempBlockchain[0].name,
      logo: tempBlockchain[0].logo,
    });
  };

  const toggleDropdown = () => {
    setDropdownToggle(!dropdownToogle);
  };

  const changeChain = async (chainId) => {
    try {
      const network = await switchNetwork({ chainId });
      setChain(network.id);
    } catch (error) {
      notify(chainId);
      console.log('chain not found', error);
    }
  };
  const notify = (chainId) => {
    const tempBlockchain = blockchains.filter((blockchain) => {
      return blockchain.id == chainId;
    });
    console.log(tempBlockchain);

    // toast.error(
    //   `${tempBlockchain[0].name} is not configured in your wallet, please add it to your metamask or any wallet you are using.`,
    //   {
    //     position: toast.POSITION.BOTTOM_LEFT,
    //   },
    // );
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!dropdownToogle) return;
    function handleClick(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownToggle(false);
      }
    }
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [dropdownToogle]);
  return (
    <>
      {isConnected && (
        <div className="relative inline-block">
        <div
            className="currentchain cursor-pointer hover:bg-gray-600 hover:bg-opacity-5 px-3 py-2 rounded-md flex gap-1 items-center"
            onClick={() => setDropdownToggle(!dropdownToogle)}
          >
            <img src={ethLogo} alt="" className="w-6" />
            {!dropdownToogle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
              >
                <path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                width="20"
              >
                <path d="m283-345-43-43 240-240 240 239-43 43-197-197-197 198Z" />
              </svg>
            )}
          </div>
          <div className={` ${dropdownToogle ? 'h-64' : ''} max-2xl md:h-auto`}>
            {dropdownToogle && (
              <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg shadow-gray-200 py-1">
                {blockchains.map((blockchain) => {
                  return (
                    <>
                      <button
                        onClick={async () => {
                          await changeChain(blockchain.id);
                        }}
                        className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-3 "
                      >
                        {/* <Image
                          src={blockchain.logo}
                          alt={`${blockchain.name} Logo`}
                          className="w-6 h-6 text-center"
                        /> */}
                        {blockchain.name}
                        {/* <ToastContainer /> */}
                      </button>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ChainSelector;