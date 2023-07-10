import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import tokensInstance from '../../utils/tokensInstance';
import { Link } from 'react-router-dom';
import { Tokens } from '../../utils/constants';
import { useNavigate } from 'react-router';
import { useAccount, useNetwork } from 'wagmi';



const TokensUI = () => {
  const [tokenData, setTokenData] = useState([]);
  const [networkUrl,setNetworkUrl] = useState('')
  const [networkID,setNetworkID] = useState('')
  const { chain, chains } = useNetwork()
  const {isConnected} = useAccount()
  const NavigateTo = useNavigate();
  let totalSupply;


  useEffect(() => {
   
      const fetchTokenData = async () => {
        const tokenDataPromises = Tokens.map(async (token) => {
          if(isConnected){
            const { contract,networkId } = await tokensInstance(token.tokenAddress);
            setNetworkID(networkId)
            console.log(networkId)
            totalSupply = ethers.utils.formatEther(await contract.totalSupply());
          }
          return {
            tokenImage: token.tokenImage,
            tokenName: token.tokenName,
            tokenSymbol: token.tokenSymbol,
            tokenAddress: token.tokenAddress,
            totalSupply: totalSupply?totalSupply:0,
          };
        },[]);
  
        const resolvedTokenData = await Promise.all(tokenDataPromises);
        setTokenData(resolvedTokenData);

  
      };
      fetchTokenData();
  }, [chain]);

  function blockExplorer(tokenAddress){
    if(networkID==80001){
     setNetworkUrl(`https://mumbai.polygonscan.com/address/${tokenAddress}`)
    }
    else if(networkID==11155111){
      setNetworkUrl(`https://sepolia.etherscan.io/address/${tokenAddress}`)
    }
  }

  return (
    <div className='flex font-roboto h-full'>
      <div className='flex flex-col m-auto w-3/5 h-full mt-10 gap-5 max-xl:w-3/4 max-lg:w-full max-lg:mx-5 max-md:w-full'>
        <h1 className='text-4xl text-left mt-5 mb-5 text-gray-700  max-lg:text-3xl max-sm:text-2xl max-xsm:text-xl'>Top tokens on Uniswap</h1>
        <div className='flex-col flex-wrap w-full h-3/4 bg-white rounded-xl border-[1px] border-gray-300 shadow-lg shadow-gray-200'>
          <div className='flex justify-between text-gray-400 border-b-[1px] py-3 border-gray-300'>
            <div className='flex gap-2 ml-8'>
            <span className='mr-5'>#</span>
            <span className='max-xsm:text-sm'>Token</span>
            </div>
            <span className='max-md:hidden'>Token address</span>
        <span className='mr-14 max-xsm:text-sm max-xsm:mr-5'>Total supply</span>
          </div>
          <div className='flex flex-col w-full h-max justify-around items-center '> 
            {tokenData.map((token, index) => (
              <Link className="w-full" to = {networkUrl} target="_blank" >
              <div className={`flex flex-wrap w-full py-5 items-center justify-between hover:bg-slate-50`} onClick={()=>{blockExplorer(token.tokenAddress)} } key={index}>
                <div className='flex'>
                <span className='mx-7'>{index + 1}</span>
                <div className='flex gap-2 items-center'>
                  <div><img className = "w-6 h-6 max-xsm:w-3 max-xsm:h-3"src ={token.tokenImage} alt="Img not found"></img></div>
                  <div className = "max-xsm:text-sm">{token.tokenSymbol}</div>
                </div>
                </div>
                <Link className="text-gray-600 hover:text-blue-400" to = {networkUrl} target="_blank">
                <div onClick={()=>{blockExplorer(token.tokenAddress)} } className="max-md:hidden">{token.tokenAddress}</div>
                </Link>

              <div className={`flex ${isConnected?"pr-16":"pr-24"} text-gray-600 max-xsm:text-sm max-xsm:pr-5 `}>{isConnected?token.totalSupply:"---"}</div>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokensUI;
