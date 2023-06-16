import { ethers } from 'ethers';
import { LiquidityPoolABI } from './constants';
async function poolInstance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contractAddress = '0xf5d033542c7192e923937C3e0CB7d4Ef8612863F';
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  const contract = new ethers.Contract(
    contractAddress,
    LiquidityPoolABI,
    signer,
  );
  localStorage.setItem('nid', networkId);
  return { contract, networkId, signerAddress };
}

export default poolInstance;
