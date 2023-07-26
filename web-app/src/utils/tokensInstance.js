import { readContract } from '@wagmi/core';
import { ethers } from 'ethers';
import { tokenABI } from './constants';

async function tokensInstance(tokenAddress) {
  const ABI = tokenABI;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = tokenAddress;
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  localStorage.setItem('nid', networkId);
  return { contract, networkId, signerAddress };
}

export const fetchUserTokenBalance = async(tokenAddress, accountAddress)=>{
  try {
        const balance = await readContract({
          address:tokenAddress,
          abi:tokenABI,
          functionName:"balanceOf",
          args:[accountAddress]
        });
        return Number(balance)/(10**18);
  } catch (error) {
    console.log(error);
  }
}


export default tokensInstance;
