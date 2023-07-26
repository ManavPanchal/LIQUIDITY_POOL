import React, { useEffect, useState } from "react";
import { getNetwork, watchNetwork } from "@wagmi/core";
import { switchNetwork } from "@wagmi/core";
import { blockchains } from "../utils/blockchains";
function ChainSelector() {
  const [dropdownToogle, setDropdownToggle] = useState(false);
  const [currentChain, setCurrentChain] = useState({
    name: "",
    logo: "",
  });

  const setChain = (chainId) => {
    const tempBlockchain = blockchains.filter((blockchain) => {
      return blockchain.id == chainId;
    });
    setCurrentChain({
      name: tempBlockchain[0]?.name,
      logo: tempBlockchain[0]?.logo,
    });
  };

  useEffect(() => {
    let chainId = getNetwork().chain?.id || 1;
    setChain(chainId);
  }, []);

  watchNetwork(()=>{
    let chainId = getNetwork().chain?.id || 1;
    setChain(chainId);
    setDropdownToggle(false);
  })

  const changeChain = async (chainId) => {
    try {
      const network = await switchNetwork({ chainId });
      setChain(network.id);
    } catch (error) {
      console.log("chain not found", error);
    }
  };

  return (
    <>
        <div className="relative inline-block min-w-fit">
          <div
            className="currentchain cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 px-3 py-2 rounded-md flex gap-1 items-center"
            onClick={() => setDropdownToggle(!dropdownToogle)}
          >
            <img src={currentChain.logo} alt="" className="w-5 lg:w-6" />
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
          {dropdownToogle && (
            <div className="absolute right-0 mt-2 w-fit p-2 bg-uni-dim-white rounded-xl shadow-md shadow-slate-300 z-10">
              {blockchains.map((blockchain) => {
                return (
                  <>
                    <button
                      onClick={async () => {
                        await changeChain(blockchain.id);
                      }}
                      className="w-60 px-4 py-3 text-sm text-gray-700 hover:bg-blue-500 hover:bg-opacity-10 rounded-lg flex gap-3 items-center "
                    >
                      <img
                        src={blockchain.logo}
                        alt={`${blockchain.name} Logo`}
                        className="w-6 h-6 text-center"
                      />
                      <span>{blockchain.name}</span>
                    </button>
                  </>
                );
              })}
            </div>
          )}
        </div>
    </>
  );
}

export default ChainSelector;
