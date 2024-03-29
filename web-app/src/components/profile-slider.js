import React, { lazy, Suspense, useContext } from 'react';
import { AppContext } from '../App';
import { useAccount, useBalance, useConnect } from 'wagmi';
import { getWalletIcons } from '../utils/constants';

const UserProfile = lazy(() => import('./user-profile'));

const ProfileSlider = () => {
  const { setSliderToggle } = useContext(AppContext);
  const { connect, connectors } = useConnect();
  const { isConnected, address } = useAccount();
  const { data, isError, isLoading } = useBalance({ address });

  const handleConnect = (connector) =>{
    if(connector?.name === "WalletConnect") setSliderToggle(false);
    try {
      connect({connector})
    } catch (error) {
      console.log("connection error......");
    }
  }

  return (
    <div
      className={`profile_slider fixed h-full sm:py-2 sm:pr-2 ease-in-out sm:right-0 z-10 duration-1000 sm:w-fit w-full sm:bg-transparent bg-slate-400 bg-opacity-20`}
      onClick={() => setSliderToggle(false)}
    >
      <div
        className={`flex absolute bottom-0 sm:relative text-slate-400 sm:h-full h-fit max-h-full bg-transparent hover:bg-gray-600 hover:bg-opacity-5 sm:rounded-xl rounded-t-xl ease-in-out
         sm:w-fit w-full`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span
          className="profile_container_closer material-symbols-outlined p-3 mt-4 text-center hidden sm:block cursor-pointer"
          onClick={() => setSliderToggle(false)}
        >
          keyboard_double_arrow_right
        </span>
        <div
          className="right-0 bg-white h-full xl:w-[390px] sm:w-80 w-full rounded-xl p-3 px-4 border border-violet-200 overflow-y-hidden"
          onMouseEnter={(e) => e.stopPropagation()}
        >
          {isConnected ? (
            <Suspense>
              <UserProfile
                address={address}
                data={data}
                isError={isError}
                isLoading={isLoading}
              />
            </Suspense>
          ) : (
            <>
              <div className="header flex justify-between items-center">
                <span className="text-md font-medium text-black font-Inter-c">
                  {' '}
                  Connect a wallet
                </span>
                <span className="material-symbols-outlined bg-gray-600 bg-opacity-5 rounded-xl px-2 py-1 text-gray-600 text-xl text-center font-light cursor-pointer">
                  settings
                </span>
              </div>
              <div className="wallets_container flex flex-col rounded-xl overflow-hidden gap-[2.5px] mt-3">
                {connectors?.map((connector) => {
                  return (
                    <div
                      className="wallet flex gap-2 p-3 pl-6 w-full items-center bg-blue-600 bg-opacity-5 cursor-pointer hover:bg-opacity-10"
                      onClick={() => handleConnect(connector)}
                    >
                      <img
                        src={getWalletIcons(connector?.name)}
                        alt=""
                        className="w-10 rounded-md"
                      />
                      <span className="text-lg font-bold text-black">
                        {connector?.name}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 p-2 font-Inter-c text-xs break-words">
                By connecting a wallet, you agree to Uniswap Labs'
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://uniswap.org/terms-of-service/"
                  className="text-slate-600 px-1 hover:opacity-50"
                >
                  Terms of Service
                </a>
                and consent to its
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://uniswap.org/privacy-policy"
                  className="text-slate-600 px-1 hover:opacity-50"
                >
                  Privacy Policy.
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSlider;
