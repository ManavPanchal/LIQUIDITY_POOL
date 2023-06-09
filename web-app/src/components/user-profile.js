import React, { useState } from 'react';
import UserActivity from './user-profile-activity';
import UserPools from './user-profile-pools';
import UserTokens from './user-profile-tokens';
import { useDisconnect } from 'wagmi';
import clipBoardPic from '../images/clipboard.png';
import { Tooltip } from '@mui/material';
const UserProfile = ({ address, data, isError, isLoading }) => {
  const [currentNavigation, setCurrentNavigation] = useState('Tokens');
  const [disconnectAlert, setDisconnectAlert] = useState(false);
  const [clipboardTitle, setClipboardTitle] = useState('copy to clipboard');
  const { disconnect } = useDisconnect();

  return (
    <>
      <div className="header flex justify-between items-center py-2">
        <div className="flex items-center gap-2">
          <svg x="0" y="0" width="40" height="40" className="rounded-full">
            <rect
              x="0"
              y="0"
              width="40"
              height="40"
              transform="translate(1.3109176925882526 -1.037634133076483) rotate(412.8 20 20)"
              fill="#F29E02"
            ></rect>
            <rect
              x="0"
              y="0"
              width="40"
              height="40"
              transform="translate(-11.98493187628588 10.219937146968494) rotate(268.6 20 20)"
              fill="#C8144D"
            ></rect>
            <rect
              x="0"
              y="0"
              width="40"
              height="40"
              transform="translate(-31.27690298584512 24.660262409495196) rotate(161.6 20 20)"
              fill="#2366E1"
            ></rect>
          </svg>
          <Tooltip title={clipboardTitle} placement="bottom" arrow>
            <span
              className="text-md font-medium text-black flex py-2 px-3 rounded-md cursor-pointer hover:bg-slate-400 hover:bg-opacity-10"
              onClick={() => {
                navigator.clipboard.writeText(address);
                setClipboardTitle('copied');
                setTimeout(() => {
                  setClipboardTitle('copy to clipboard');
                }, 2000);
              }}
            >
              {address?.slice(0, 6) + '...' + address.slice(-4)}

              <img
                src={clipBoardPic}
                alt="copy to clipboard"
                className="h-4 mt-1"
              />
            </span>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined bg-gray-600 bg-opacity-5 rounded-xl px-2 py-1 text-gray-600 text-xl text-center font-light cursor-pointer">
            settings
          </span>
          <span
            className="bg-gray-600 bg-opacity-5 rounded-xl px-2 py-1 flex items-center gap-1 cursor-pointer"
            onClick={() => {
              disconnectAlert ? disconnect() : setDisconnectAlert(true);
            }}
          >
            <span class="material-symbols-outlined text-gray-600 text-xl text-center">
              power_settings_new
            </span>
            {disconnectAlert && (
              <span className="text-sm text-medium">Disconnect</span>
            )}
          </span>
        </div>
      </div>

      <div
        className={`py-2 px-1 flex gap-2 ${
          (isLoading || isError) && 'animate-pulse'
        } items-end`}
      >
        <span className="text-black text-3xl font-semibold ">
          {data?.formatted.slice(0, 6)}
        </span>
        <span className="text-black text-2xl font-bold">{data?.symbol}</span>
      </div>
      <div className="profile_navigations p-3 px-1">
        <div className="navigators flex gap-5">
          <span
            className={`cursor-pointer font-medium ${
              currentNavigation === 'Tokens' && 'text-black'
            }`}
            onClick={() => setCurrentNavigation('Tokens')}
          >
            Tokens
          </span>
          <span
            className={`cursor-pointer font-medium ${
              currentNavigation === 'Pools' && 'text-black'
            }`}
            onClick={() => setCurrentNavigation('Pools')}
          >
            Pools
          </span>
          <span
            className={`cursor-pointer font-medium ${
              currentNavigation === 'Activity' && 'text-black'
            }`}
            onClick={() => setCurrentNavigation('Activity')}
          >
            Activity
          </span>
        </div>
      </div>
      <div className="navigation_containt max-h-full h-3/4 xl:h-4/5 min-h-[50%]:">
        {currentNavigation === 'Tokens' && <UserTokens />}
        {currentNavigation === 'Pools' && <UserPools />}
        {currentNavigation === 'Activity' && <UserActivity />}
      </div>
    </>
  );
};

export default UserProfile;
