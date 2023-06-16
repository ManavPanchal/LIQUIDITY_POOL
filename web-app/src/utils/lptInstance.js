import { ethers } from 'ethers';
import { LPTABI } from './constants';

async function lptInstance(lpttokenAddress) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = lpttokenAddress;
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  const contract = new ethers.Contract(contractAddress, LPTABI, signer);
  let balance = await contract.balanceOf(signerAddress);
  balance = ethers.utils.formatEther(balance);
  localStorage.setItem('nid', networkId);
  return { contract, networkId, signerAddress, balance };
}

export default lptInstance;
