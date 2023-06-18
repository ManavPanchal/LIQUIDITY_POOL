import { ethers } from 'ethers';

const walletInstance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  return { provider, networkId, signerAddress, signer };
}

export default walletInstance;
