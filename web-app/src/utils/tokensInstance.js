import { ethers } from 'ethers';

async function tokensInstance(tokenAddress) {
  const ABI = ['function approve(address,uint256)returns (bool)'];
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

export default tokensInstance;
